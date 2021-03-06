import json
import os
import re
import logging
import zipfile
import botocore
import boto3
import markdown
import itertools
import semver
import hashlib
from html.parser import HTMLParser
from bs4 import BeautifulSoup

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import status

from search.utils import DocsIndexer

from home.snippets import LibraryVersion

from . import matching_s3_objects

logger = logging.getLogger('debug')

ES_INDEX_PREFIX = settings.ES_INDEX_PREFIX
ES_PORT = settings.ES_PORT
ES_HOST_URL = settings.ES_HOST_URL


def strip_tags(input_html):
    soup = BeautifulSoup(input_html, 'html.parser')
    return soup.get_text()


class UniqueDict(dict):
    def __setitem__(self, key, value):
        if key not in self:
            dict.__setitem__(self, key, value)
        else:
            raise KeyError("Key already exists")


def get_filtered_result(bucket_name, path):
    result = []
    filtered_result = set()
    # Note that get_matching_s3_keys is a very expensive operation to loop through
    # all AWS file pointers
    for item in matching_s3_objects.get_matching_s3_keys(bucket=bucket_name, prefix=path, suffix=('')):
        regex = r"({}.*?/|{}.*)".format(path, path)
        patterns = re.compile(regex)
        match = patterns.search(item)
        filtered_result.add(match.group(1))

    return filtered_result


def post(request):
    post_auth_key = request.POST.get('post_auth_key')
    docs_api_key = os.getenv('DOCS_API_KEY', '')
    es_index_prefix = settings.ES_INDEX_PREFIX
    root_path = request.POST.get('root_path', '').strip('/')
    root_path_segs = root_path.split('/')

    if (root_path is None or len(root_path_segs) != 2):
        return Response({'root_path': 'ROOT_PATH is required'}, status=400)

    obj, created = LibraryVersion.objects.get_or_create(
        name = root_path_segs[0],
        version = root_path_segs[1],
        defaults={'isActive': True}
    )

    uploaded_file = request.FILES.get('file')

    if post_auth_key is None:
        return Response({'post_auth_key': 'required. Use DOCS_API_KEY env var'}, status=400)
    elif post_auth_key != docs_api_key:
        return Response({'post_auth_key': 'DOCS_API_KEY required'}, status=401)

    if uploaded_file and uploaded_file.name.endswith('.zip'):
        zipf = zipfile.ZipFile(uploaded_file)

        index_ext_types = [
            '.json',
        ]

        index_dirs = [
            'docs',
        ]

        for zipped_file in zipf.namelist():
            path = os.path.join(*(
                'docs',
                root_path,
                zipped_file.lower()))
            content = ContentFile(zipf.read(zipped_file))
            try:
                read_contents_bytes = content.read()
                read_contents_str = read_contents_bytes.decode('utf-8')
            except Exception as e:
                print("exception: " + str(e))

            # Store file in AWS
            default_storage.save(path, content)

            # Continue parsing files to index in ES
            # Only index 'files'; based on whether
            # they have an extension, not a dir
            if "." in zipped_file:
                f, ext = os.path.splitext(zipped_file)
                indexer = DocsIndexer(
                    ES_HOST_URL,
                    ES_PORT,
                    'docs',
                    ES_INDEX_PREFIX)
                doc = {}
                path_split = path.split('/')
                dir_root = path_split[3]
                doc_slug = f.split('/', 1)[-1]

                if ext in index_ext_types and dir_root in index_dirs:
                    try:
                        content_obj = json.loads(read_contents_str)
                    except Exception as e:
                        print("error: " + str(e))
                    try:
                        # @NOTE: if you add any data to be indexed here
                        # you also need to add it in `src/app/index_s3.py`
                        doc['content'] = strip_tags(content_obj['body'])
                        if 'api' in content_obj:
                            doc['api'] = strip_tags(content_obj['api'])
                        doc['title'] = content_obj['title']
                        doc['library'] = path_split[1]
                        doc['version'] = path_split[2]
                        doc['slug'] = doc_slug
                        doc['path'] = path
                    except Exception as err:
                        print("Exception... {} on {}".format(err, path))
                        continue

                    indexer.index_doc(doc)
    else:
        return Response(
            {'file': 'ZIP file not found'},
            status=status.HTTP_400_BAD_REQUEST)

    return Response()


def get(request):
    try:
        request_path_segments = request.path_info.lower().split('/')

        # just remove '/api/docs/'
        requested_file = '/'.join(request_path_segments[3:])

        path = os.path.join(*(
            'docs',
            requested_file))

        logger.debug('Docs get on path %s', path)

        requested_file_segments = requested_file.split('/')
        library_name = requested_file_segments[0] if len(requested_file_segments) > 0 else ''
        version = requested_file_segments[1] if len(requested_file_segments) > 1 else ''
        file_path = '/'.join(requested_file_segments[2:])

        library_path = os.path.join(*(
            'docs',
            library_name))

        s3_conf = {
            'aws_access_key_id': settings.AWS_ACCESS_KEY_ID,
            'aws_secret_access_key': settings.AWS_SECRET_ACCESS_KEY
        }

        s3_resource = boto3.resource('s3', **s3_conf)
        bucket_name = settings.AWS_STORAGE_BUCKET_NAME

        logger.debug('Docs get version %s', version)

        if version == 'latest':
            active_lib_versions = LibraryVersion.objects.all().filter(
                name=library_name,
                isActive=True
            )

            logger.debug('Active library versions %s', active_lib_versions)

            if not active_lib_versions:
                return Response({
                    'error': {
                        'code': 404,
                        'message': 'Error! 0 libraries documented.'
                    }
                }, status=status.HTTP_400_BAD_REQUEST)

            active_lib_semvers = [v.version for v in active_lib_versions]
            latest_version = semver.rsort(active_lib_semvers, True)[0]

            latest_file_pointer = os.path.join(*(
                library_path,
                latest_version,
                file_path))
            path = latest_file_pointer

            logger.debug('Docs get latest on path %s', path)

        if re.match(r'[\w,\s\S]+\.[A-Za-z]{2,6}$', path):
            obj = s3_resource.Object(settings.AWS_STORAGE_BUCKET_NAME, path)

            # load() does a HEAD request for a single key,
            # which is fast, even if the object in question
            # is large or you have many objects in the bucket.
            obj.load()

            content = obj.get()['Body'].read()

            if request.GET.get('download') == "true":
                response = HttpResponse(content=content, content_type="application/octet-stream")
                response['Content-Disposition'] = 'attachment; filename=%s' % requested_file_segments[-1]
                return response
            else:
                if path.endswith('.json'):
                    try:
                        content = json.loads(content.decode('utf-8'))

                        return Response(content)
                    except ValueError:
                        return Response(
                            {'error': 'JSON file cannot be decoded'},
                            status=status.HTTP_400_BAD_REQUEST)
                elif path.endswith('.md'):
                    content = markdown.markdown(
                        content.decode('utf-8'), output_format='html5')

                    return HttpResponse(content=content)
                elif path.endswith('.png'):
                    return HttpResponse(content=content, content_type="image/png")
                elif path.endswith('.jpeg'):
                    return HttpResponse(content=content, content_type="image/jpeg")
                elif path.endswith('.css') or path.endswith('.css.map'):
                    return HttpResponse(content=content, content_type="text/css")
                elif path.endswith('.rss'):
                    return HttpResponse(content=content, content_type="application/rss+xml")
                elif path.endswith('.sketch'):
                    return HttpResponse(content=content, content_type="application/octet-stream")
                else:
                    return HttpResponse(content=content)
        else:
            filtered_result = get_filtered_result(bucket_name, path)
            return Response({'files': filtered_result})

    except botocore.exceptions.ClientError as exc:
        resp = exc.response

        return Response({
            'error': {
                'code': resp['Error']['Code'],
                'message': resp['Error']['Message']
            }}, status=status.HTTP_400_BAD_REQUEST)


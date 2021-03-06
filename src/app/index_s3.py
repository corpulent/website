#!/usr/bin/python3

from html.parser import HTMLParser
from sys import argv
import html
import json
import os
import boto3
import magic
import re
from markdown import markdown
from bs4 import BeautifulSoup

from search.utils import DocsIndexer


def strip_tags(input_html):
    soup = BeautifulSoup(input_html, 'html.parser')

    return soup.get_text()

def file_path_mime_from_buffer(file_obj):
	mime = magic.from_buffer(file_obj, mime=True)

	return mime

def file_path_mime_from_file(file_path):
	mime = magic.from_file(file_path, mime=True)

	return mime

def s3_sync(**kwargs):
    """
    Given a bucket name and access keys, this function
    will loop through the S3 tree and re-index the
    data into ES.
    """
    src_conf = {
        'aws_access_key_id': kwargs.get('aws_access_key_id'),
        'aws_secret_access_key': kwargs.get('aws_secret_access_key')
    }
    es_host = kwargs.get('es_host')
    es_port = kwargs.get('es_port')
    es_index_prefix = kwargs.get('es_index_prefix')
    src_bucket = kwargs.get('bucket_name')
    src_client = boto3.client('s3', **src_conf)
    root_path = os.path.dirname(os.path.realpath(__file__))
    tmp_dir = "{}/tmp".format(root_path)

    for s3_obj, i in paginate_and_yield(src_client, tmp_dir, src_bucket, download=True):
        print("Reading file: {}".format(i))

        f, ext = os.path.splitext(i)

        mime_type = file_path_mime_from_file(i)
        index_mime_types = [
            'text/plain'
        ]

        index_ext_types = [
            '.json',
        ]

        print("{} : {}".format(i, mime_type))

        if ext in index_ext_types:
            read_contents = open(i, 'rt', encoding='utf8').read()
            read_contents_bytes = bytes(read_contents.strip(), 'utf8')
            read_contents_str = read_contents_bytes.decode('utf-8')
            indexer = DocsIndexer(es_host, es_port, 'docs', es_index_prefix)
            s3_path = i.replace(tmp_dir, '')
            s3_path = s3_path[1:]
            s3_path_split = s3_path.split('/')
            fname = s3_path_split[-1]
            doc_slug = fname.split('.', 1)[0]
            doc = {
                'path': s3_path
            }

            try:
                # @NOTE: if you add any data to be indexed here
                # you also need to add it in `src/app/docs/aws.py`
                content_obj = json.loads(read_contents_str)
                doc['content'] = strip_tags(content_obj['body'])
                if 'api' in content_obj:
                    doc['api'] = strip_tags(content_obj['api'])
                doc['title'] = content_obj['title']
                doc['library'] = s3_path_split[1]
                doc['version'] = s3_path_split[2]
                doc['slug'] = doc_slug
            except ValueError as err:
                print("ValueError exception... {}".format(err))
                continue
            except KeyError as err:
                print("KeyError exception... {}".format(err))
                continue

            indexer.index_doc(doc)

            print("Content for {} indexed.".format(i))

        os.remove(i)

def paginate_and_yield(client, local='/tmp/', bucket='tmp', download=False):
    """Paginate over an S3 resource and yield the results."""
    # Create a paginator to pull 1000 objects at a time.
    paginator = client.get_paginator('list_objects')

    operation_parameters = {
        'Bucket': bucket,
        'Prefix': 'docs/'
    }

    # PageResponse Holds 1000 objects at a time and
    # will continue to repeat in chunks of 1000.
    pageresponse = paginator.paginate(**operation_parameters)

    # Process 1000 at a time.
    for pageobject in pageresponse:
        for obj in pageobject['Contents']:
            s3_obj = obj['Key']
            local_root = local + os.sep
            local_obj_path = local_root + s3_obj

            if not s3_obj.endswith('/'):
                if download:
                    client.download_file(bucket, s3_obj, local_obj_path)
                    yield s3_obj, local_obj_path
                else:
                    yield obj
            else:
                if not os.path.exists(local_obj_path):
                    os.makedirs(local_obj_path)

def getopts(argv):
    opts = {}

    while argv:
        if argv[0][0] == '-':
            opts[argv[0]] = argv[1]

        argv = argv[1:]

    return opts


if __name__ == '__main__':
    try:
        args = getopts(argv)

        kwargs = {
            'bucket_name': args['-bucket_name'],
            'aws_access_key_id': args['-aws_access_key_id'],
            'aws_secret_access_key': args['-aws_secret_access_key'],
            'es_index_prefix': args['-es_index_prefix'],
            'es_host': args['-es_host'],
            'es_port': args['-es_port']
        }

        s3_sync(**kwargs)
    except KeyError as err:
        print("You are missing a required parameter: {}".format(err))
    except IndexError as err:
        print("Missing required parameters: {}".format(err))
    except FileNotFoundError as err:
        print("A file could not be found: {}".format(err))

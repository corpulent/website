# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-04 14:23
from __future__ import unicode_literals

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_elementspage_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='corecontentpage',
            name='content',
        ),
        migrations.AddField(
            model_name='corecontentpage',
            name='body',
            field=wagtail.core.fields.StreamField((('heading', wagtail.core.blocks.CharBlock(classname='full title')), ('paragraph', wagtail.core.blocks.RichTextBlock(features=['h2', 'h3', 'bold', 'italic', 'link', 'document-link'])), ('image', wagtail.images.blocks.ImageChooserBlock())), blank=True, null=True),
        ),
    ]

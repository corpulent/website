# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-02 21:16
from __future__ import unicode_literals

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_pagebase'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elementspage',
            name='states',
            field=wagtail.core.fields.StreamField((('states', wagtail.core.blocks.StructBlock((('state', wagtail.core.blocks.CharBlock(required=True)),))),), blank=True, null=True),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-03-21 13:53
from __future__ import unicode_literals

from django.db import migrations, models
import home.models
import wagtail.contrib.table_block.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0034_auto_20180308_1611'),
    ]

    operations = [
        migrations.AddField(
            model_name='blockspage',
            name='tokensCategory',
            field=models.CharField(blank=True, max_length=255, verbose_name='Tokens Category'),
        ),
        migrations.AddField(
            model_name='elementspage',
            name='tokensCategory',
            field=models.CharField(blank=True, max_length=255, verbose_name='Tokens Category'),
        ),
        migrations.AlterField(
            model_name='blockspage',
            name='modifiers',
            field=wagtail.core.fields.StreamField((('options', wagtail.core.blocks.StructBlock((('name', wagtail.core.blocks.CharBlock(required=True)), ('detail', wagtail.core.blocks.CharBlock(required=True)), ('token', wagtail.core.blocks.CharBlock(required=False))))),), blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='corecontentpage',
            name='body',
            field=wagtail.core.fields.StreamField((('heading', wagtail.core.blocks.CharBlock(classname='full title')), ('image', home.models.APIImageChooserBlock()), ('table', wagtail.contrib.table_block.blocks.TableBlock()), ('markdown', home.models.APIMarkDownBlock()), ('tokensCategory', wagtail.core.blocks.CharBlock())), blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='elementspage',
            name='modifiers',
            field=wagtail.core.fields.StreamField((('options', wagtail.core.blocks.StructBlock((('name', wagtail.core.blocks.CharBlock(required=True)), ('detail', wagtail.core.blocks.CharBlock(required=True)), ('token', wagtail.core.blocks.CharBlock(required=False))))),), blank=True, null=True),
        ),
    ]

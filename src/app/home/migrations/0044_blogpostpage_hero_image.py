# Generated by Django 2.1.7 on 2019-05-02 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0001_squashed_0021'),
        ('home', '0043_auto_20190502_1447'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpostpage',
            name='hero_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image'),
        ),
    ]

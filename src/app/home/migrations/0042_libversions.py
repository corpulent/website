# Generated by Django 2.1.5 on 2019-03-05 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0041_auto_20190206_1857'),
    ]

    operations = [
        migrations.CreateModel(
            name='LibraryVersion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('version', models.CharField(max_length=255)),
                ('isActive', models.BooleanField()),
            ],
        ),
    ]

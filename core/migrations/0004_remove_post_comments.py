# Generated by Django 2.2.3 on 2020-02-08 14:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_post_comments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='comments',
        ),
    ]

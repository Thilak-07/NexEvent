# Generated by Django 5.1 on 2024-08-31 08:48

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_rename_user_id_appuser_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="appuser",
            name="date_joined",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="appuser",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="appuser",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]

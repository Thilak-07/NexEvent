# Generated by Django 5.1 on 2024-08-27 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Event",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("date_time", models.DateTimeField()),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("conference", "Conference"),
                            ("workshop", "Workshop"),
                            ("webinar", "Webinar"),
                            ("meetup", "Meetup"),
                            ("seminar", "Seminar"),
                        ],
                        max_length=50,
                    ),
                ),
                ("location", models.CharField(max_length=200)),
                ("terms_and_conditions", models.TextField()),
            ],
        ),
    ]

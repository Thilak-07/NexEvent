from django.db import models

class Event(models.Model):
    CATEGORY_CHOICES = [
        ('conference', 'Conference'),
        ('workshop', 'Workshop'),
        ('webinar', 'Webinar'),
        ('meetup', 'Meetup'),
        ('seminar', 'Seminar'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    date_time = models.DateTimeField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=200)
    terms_and_conditions = models.TextField()
    # feature_image = models.ImageField(upload_to='event_images/')

    def __str__(self):
        return self.title

from django.db import models
from django.conf import settings
from events.models import Event


class Registration(models.Model):
    RSVP_CHOICES = [
        ('ATTENDING', 'Attending'),
        ('NOT_ATTENDING', 'Not Attending'),
        ('MAYBE', 'Maybe'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    rsvp_status = models.CharField(max_length=15, choices=RSVP_CHOICES, default='ATTENDING')
    registration_date = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'event')

    def __str__(self):
        return f"{self.user.username} - {self.event.title} ({self.rsvp_status})"

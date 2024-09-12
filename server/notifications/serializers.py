from rest_framework import serializers
from .models import Notification
from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date_time', 'location']


class NotificationSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = Notification
        fields = ['id', 'user', 'subject', 'event',
                  'status', 'seen', 'created_at']

from rest_framework import serializers
from .models import Registration
from accounts.serializers import UserSerializer


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
        read_only_fields = ['id', 'user', 'registration_date', 'last_updated']


class GuestsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Registration
        fields = ['id', 'user', 'event', 'rsvp_status',
                  'registration_date', 'last_updated']

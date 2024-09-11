from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication

from events.models import Event
from events.serializers import EventSerializer
from events.permissions import RoleBasedPermission


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [RoleBasedPermission]

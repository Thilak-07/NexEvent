from django.db import IntegrityError
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated

from .models import Registration
from .serializers import RegistrationSerializer


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            raise APIException("You have already registered for this event.")

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except APIException as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        event_id = request.data.get('event')
        if not event_id:
            return Response({'detail': 'Event ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            registration = Registration.objects.get(
                user=self.request.user, event_id=event_id)
        except Registration.DoesNotExist:
            return Response({'detail': 'Registration not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(
            registration, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        event_id = kwargs.get('pk')

        try:
            event_id = int(event_id)
        except (ValueError, TypeError):
            return Response({'detail': 'Invalid event ID. Must be a valid integer.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            registration = Registration.objects.get(
                user=request.user, event_id=event_id)
        except Registration.DoesNotExist:
            return Response({'detail': 'Registration not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(registration)
        return Response(serializer.data)

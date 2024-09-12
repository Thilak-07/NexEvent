from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class UnseenNotificationCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        unseen_count = Notification.objects.filter(
            user=request.user, seen=False).count()

        if unseen_count > 0:
            return Response({"unseen_count": unseen_count}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No unseen notifications."}, status=status.HTTP_404_NOT_FOUND)


class MarkAllNotificationsAsSeenView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        unseen_notifications = Notification.objects.filter(
            user=request.user, seen=False)

        updated_count = unseen_notifications.update(seen=True)

        if updated_count > 0:
            return Response({"detail": f"{updated_count} notifications marked as seen."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No unseen notifications found."}, status=status.HTTP_200_OK)

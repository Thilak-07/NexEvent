from django.urls import path
from .views import (
    NotificationListView,
    MarkAllNotificationsAsSeenView,
    UnseenNotificationCountView
)

urlpatterns = [
    path('notifications/', NotificationListView.as_view(),
         name='notification-list'),
    path('notifications/seen/', MarkAllNotificationsAsSeenView.as_view(),
         name='mark-all-notifications-seen'),
    path('notifications/unseen/count/', UnseenNotificationCountView.as_view(),
         name='unseen-notification-count'),
]

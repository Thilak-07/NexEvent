from django.urls import path
from .views import EventCreateAPIView, EventUpdateAPIView, EventDeleteAPIView

urlpatterns = [
    path('create/', EventCreateAPIView.as_view(), name='event-create'),
    path('update/<int:pk>/',
         EventUpdateAPIView.as_view(), name='event-update'),
    path('delete/<int:pk>/',
         EventDeleteAPIView.as_view(), name='event-delete'),
]

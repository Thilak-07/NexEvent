from django.contrib import admin
from .models import Notification


class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'status', 'sent_at', 'created_at', 'seen')
    list_filter = ('status', 'sent_at', 'created_at')


admin.site.register(Notification, NotificationAdmin)

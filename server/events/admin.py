from django.contrib import admin
from .models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_time', 'category', 'location')
    list_filter = ('category', 'date_time')
    search_fields = ('title', 'description', 'location')
    fields = ('title', 'description', 'date_time', 'category',
              'location', 'terms_and_conditions', 'feature_image')
    ordering = ('-date_time',)


admin.site.register(Event, EventAdmin)

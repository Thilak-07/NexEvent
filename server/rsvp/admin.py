from django.contrib import admin
from .models import Registration


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'rsvp_status',
                    'registration_date', 'last_updated')
    list_filter = ('rsvp_status', 'event')
    search_fields = ('user__username', 'event__name')
    readonly_fields = ('registration_date', 'last_updated')

    def get_readonly_fields(self, request, obj=None):
        # Make the 'user' field read-only in the admin interface
        if obj:  # Editing an existing object
            return self.readonly_fields + ('user',)
        return self.readonly_fields


admin.site.register(Registration, RegistrationAdmin)

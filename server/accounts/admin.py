from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import AppUser, PasswordReset


class AppUserAdmin(BaseUserAdmin):
    model = AppUser
    ordering = ('date_joined',)
    list_display = ('email', 'username', 'role',
                    'is_superuser', 'is_staff', 'date_joined')
    search_fields = ('email', 'username')
    readonly_fields = ('date_joined',)
    filter_horizontal = ()
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff',
         'is_superuser', 'user_permissions', 'groups')}),
        ('Important dates', {'fields': ('date_joined',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'role', 'password1', 'password2'),
        }),
    )

    def save_model(self, request, obj, form, change):
        if not change:
            obj.set_password(obj.password)
        super().save_model(request, obj, form, change)


# Register the custom admin class
admin.site.register(AppUser, AppUserAdmin)


# Custom Admin for PasswordReset
class PasswordResetAdmin(admin.ModelAdmin):
    list_display = ('email', 'token', 'created_at')
    search_fields = ('email', 'token')
    readonly_fields = ('created_at',)


# Register the PasswordReset model with its admin
admin.site.register(PasswordReset, PasswordResetAdmin)

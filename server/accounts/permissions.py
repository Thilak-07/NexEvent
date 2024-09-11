from rest_framework.permissions import BasePermission


class RoleBasedPermission(BasePermission):
    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        return request.user.has_permission('manage_users')

from rest_framework.permissions import BasePermission


class RoleBasedPermission(BasePermission):
    def has_permission(self, request, view):
        # Allow any user for GET requests
        if request.method == 'GET':
            return True

        user = request.user

        if not user.is_authenticated:
            return False

        if request.method == 'POST':
            return user.has_permission('create_event')
        elif request.method == 'DELETE':
            return user.has_permission('delete_event')
        elif request.method in ['PATCH', 'PUT']:
            return user.has_permission('edit_event')

        return False

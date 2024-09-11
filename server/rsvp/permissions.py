from rest_framework.permissions import BasePermission


class RoleBasedPermission(BasePermission):
    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if request.method == 'GET':
            return request.user.has_permission('list_guests')

        elif request.method == 'DELETE':
            return request.user.has_permission('delete_rsvp')

        return False

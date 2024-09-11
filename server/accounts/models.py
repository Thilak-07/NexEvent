from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, role=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if role is None:
            role = AppUser.RoleChoices.ATTENDEE

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None):
        user = self.create_user(
            email, username=username, password=password, role=AppUser.RoleChoices.ADMIN)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    class RoleChoices(models.TextChoices):
        ATTENDEE = 'ATTENDEE', 'Attendee'
        MANAGER = 'MANAGER', 'Manager'
        ADMIN = 'ADMIN', 'Admin'

    # Hashmap for role permissions
    role_permissions = {
        RoleChoices.ATTENDEE: {},
        RoleChoices.MANAGER: {'edit_event', 'list_guests', 'delete_rsvp'},
        RoleChoices.ADMIN: {'edit_event', 'list_guests', 'delete_rsvp', 'create_event', 'delete_event', 'manage_users'},
    }

    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    role = models.CharField(
        max_length=10, choices=RoleChoices.choices, default=RoleChoices.ATTENDEE)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.username

    # Method to check if a user has a specific permission
    def has_permission(self, permission):
        if self.role in self.role_permissions:
            return permission in self.role_permissions[self.role]
        return False


class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

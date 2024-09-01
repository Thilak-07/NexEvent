from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError(
            'An user account with this email already exists!')
    if not password or len(password) < 8:
        raise ValidationError(
            'Your password should have a minimum of 8 characters.')
    if not username:
        raise ValidationError('Username cannot be empty.')

    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('An email is needed')
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('A password is needed')
    if len(password) < 8:
        raise ValidationError(
            'Your password should have a minimum of 8 characters.')
    return True

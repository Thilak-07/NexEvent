from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.forms import ValidationError

from accounts.utils.email_utils import send_password_reset_email
from accounts.models import PasswordReset

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            email=clean_data['email'], username=clean_data['username'], password=clean_data['password'])
        return user_obj


class UserLoginSerializer(TokenObtainPairSerializer):

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'role')


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def handle_reset_request(self, data):
        email = data['email']
        user = UserModel.objects.filter(email__iexact=email).first()
        if user:
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            reset = PasswordReset(email=email, token=token)
            reset.save()
            reset_url = f"{settings.PASSWORD_RESET_BASE_URL}/{token}"
            send_password_reset_email(email, reset_url)
            return True
        else:
            return False


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()

    def update_password(self, reset_obj, password):
        user = UserModel.objects.filter(email=reset_obj.email).first()
        if user:
            user.set_password(password)
            user.save()
            reset_obj.delete()
            return True
        else:
            return False

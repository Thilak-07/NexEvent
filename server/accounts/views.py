from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, ResetPasswordRequestSerializer, TokenValiditySerializer, ResetPasswordSerializer
from .validations import custom_validation, validate_email, validate_password
from accounts.models import PasswordReset
from accounts.utils.email_utils import send_password_reset_email


UserModel = get_user_model()


class UserRegister(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(TokenObtainPairView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            refresh = RefreshToken.for_user(user)
            login(request, user)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        # Blacklist the refresh token (if blacklisting is enabled)
        refresh_token = request.data.get("refresh_token")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        logout(request)
        return Response(status=status.HTTP_200_OK)


class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data['email']
            user = UserModel.objects.filter(email__iexact=email).first()

            if user:
                token_generator = PasswordResetTokenGenerator()
                token = token_generator.make_token(user)
                reset = PasswordReset(email=email, token=token)
                reset.save()
                reset_url = f"{settings.PASSWORD_RESET_BASE_URL}/{token}"
                send_password_reset_email(email, reset_url)
                return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User with credentials not found"}, status=status.HTTP_404_NOT_FOUND)


class TokenValidity(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = TokenValiditySerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            token = serializer.data['token']
            reset_obj = PasswordReset.objects.filter(token=token).first()
            if not reset_obj:
                return Response({'error': 'Invalid token'}, status=status.HTTP_404_NOT_FOUND)

            return Response({'success': 'Valid token'}, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class ResetPassword(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ResetPasswordSerializer

    def post(self, request, token):
        serializer = self.serializer_class(data=request.data)
        assert validate_password(request.data)
        serializer.is_valid(raise_exception=True)

        reset_obj = PasswordReset.objects.filter(token=token).first()

        if not reset_obj:
            return Response({'error': 'Invalid token'}, status=status.HTTP_404_NOT_FOUND)

        user = UserModel.objects.filter(email=reset_obj.email).first()

        if user:
            user.set_password(serializer.data['password'])
            user.save()
            reset_obj.delete()
            return Response({'success': 'Password updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No user found'}, status=status.HTTP_404_NOT_FOUND)

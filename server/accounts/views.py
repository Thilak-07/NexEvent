from django.core.exceptions import ValidationError

from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import AppUser, PasswordReset
from accounts.permissions import RoleBasedPermission
from accounts.serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, RequestPasswordResetSerializer, ResetPasswordSerializer
from accounts.validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            clean_data = custom_validation(request.data)
            serializer = UserRegisterSerializer(data=clean_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(clean_data)
                if user:
                    filtered_data = {
                        'username': serializer.data['username'], 'email': serializer.data['email']}
                    return Response(filtered_data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': e.message}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(TokenObtainPairView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data
        try:
            validate_email(data)
            validate_password(data)

            serializer = UserLoginSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.check_user(data)
                refresh = RefreshToken.for_user(user)
                return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response({'error': e.message}, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        # Blacklist the refresh token (if blacklisting is enabled)
        refresh_token = request.data.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RequestPasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            if serializer.handle_reset_request(serializer.data):
                return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User with credentials not found"}, status=status.HTTP_404_NOT_FOUND)


class ResetPassword(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ResetPasswordSerializer

    def get(self, request, token):
        reset_obj = PasswordReset.objects.filter(token=token).first()
        if reset_obj:
            return Response({'success': 'Valid token', 'user': reset_obj.email}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid token'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, token):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            reset_obj = PasswordReset.objects.filter(token=token).first()
            if not reset_obj:
                return Response({'error': 'Invalid token or token expired'}, status=status.HTTP_404_NOT_FOUND)

            try:
                validate_password(request.data)
                if serializer.update_password(reset_obj, serializer.data['password']):
                    return Response({'success': 'Password updated'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'No user found'}, status=status.HTTP_404_NOT_FOUND)

            except ValidationError as e:
                return Response({'error': e.message}, status=status.HTTP_400_BAD_REQUEST)


class AccessControl(viewsets.ViewSet):
    permission_classes = [RoleBasedPermission]

    def list(self, request):
        role = request.query_params.get('role')

        if role:
            if role not in AppUser.RoleChoices.values:
                return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
            users = AppUser.objects.filter(role=role)
        else:
            users = AppUser.objects.all()

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['patch'])
    def update_role(self, request):
        email = request.data.get('email')
        new_role = request.data.get('role')

        if not email or not new_role:
            return Response({'error': 'Email and role are required'}, status=status.HTTP_400_BAD_REQUEST)

        if new_role not in AppUser.RoleChoices.values:
            return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = AppUser.objects.get(email=email)
            user.role = new_role
            user.save()
            return Response({'success': 'Role updated'}, status=status.HTTP_200_OK)
        except AppUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

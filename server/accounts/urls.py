from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.UserView.as_view(), name='user'),
    path('logout/', views.UserLogout.as_view(), name='logout'),

    path('request-reset/', views.RequestPasswordReset.as_view(), name='request-reset'),
    path('token-validity/', views.TokenValidity.as_view(), name='token-validity'),
    path('reset-password/<str:token>/',
         views.ResetPassword.as_view(), name='reset-password'),
]

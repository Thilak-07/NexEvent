from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'access-control', views.AccessControl,
                basename='access-control')

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('reset-request/', views.RequestPasswordReset.as_view(), name='reset-request'),
    path('reset-password/<str:token>/',
         views.ResetPassword.as_view(), name='reset-password'),
]

urlpatterns += router.urls

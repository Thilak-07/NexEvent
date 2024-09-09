from rest_framework.routers import DefaultRouter
from .views import RegistrationViewSet, GuestViewSet

router = DefaultRouter()
router.register(r'rsvp', RegistrationViewSet,  basename='rsvp')
router.register(r'guests', GuestViewSet, basename='guest')

urlpatterns = []
urlpatterns += router.urls

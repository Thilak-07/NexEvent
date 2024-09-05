from rest_framework.routers import DefaultRouter
from .views import RegistrationViewSet

router = DefaultRouter()
router.register(r'rsvp', RegistrationViewSet)

urlpatterns = []
urlpatterns += router.urls

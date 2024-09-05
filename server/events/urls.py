from rest_framework.routers import DefaultRouter
from .views import EventViewSet


router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = []
urlpatterns += router.urls

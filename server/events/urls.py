from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet


router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


# GET /books/ -> List all books
# GET /books/{id}/ -> Retrieve a specific book by ID
# POST /books/ -> Create a new book
# PUT /books/{id}/ -> Update an existing book
# PATCH /books/{id}/ -> Partially update an existing book
# DELETE /books/{id}/ -> Delete a book by ID

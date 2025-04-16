from django.urls import path
from .views.profile_picture_view import ProfilePictureUploadView


urlpatterns = [
    path('upload-profile-picture/', ProfilePictureUploadView.as_view(), name='upload-profile-picture'),
]
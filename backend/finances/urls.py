from django.urls import path
from .views.profile_picture_view import ProfilePictureUploadView
from .views.user_data_view import register_or_get_user


urlpatterns = [
    path('user/', register_or_get_user, name='register-or-get-user'),
    path('upload-profile-picture/', ProfilePictureUploadView.as_view(), name='upload-profile-picture'),
]
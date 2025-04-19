from django.urls import path
from .views.user_data_view import register_or_get_user, upload_profile_picture


urlpatterns = [
    path('user/', register_or_get_user, name='register-or-get-user'),
    path('profile-picture/', upload_profile_picture, name='upload-profile-picture'),
]

from django.urls import path
from .views.user_data_view import register_or_get_user, upload_profile_picture
from .views.account_view import AccountView


urlpatterns = [
    path('user/', register_or_get_user, name='register-or-get-user'),
    path('profile-picture/', upload_profile_picture, name='upload-profile-picture'),
    path('accounts/', AccountView.as_view(), name='account'),
    path('transactions/', name='transactions')
]

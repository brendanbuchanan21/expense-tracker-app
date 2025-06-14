from django.urls import path
from .views.user_data_view import register_or_get_user, upload_profile_picture
from .views.account_view import AccountView
from .views.transaction_view import TransactionView
from .views.transaction_range_view import TransactionRangeView
from .views.user_data_view import delete_user_data, reset_user_data


urlpatterns = [
    path('user/', register_or_get_user, name='register-or-get-user'),
    path('profile-picture/', upload_profile_picture, name='upload-profile-picture'),
    path('accounts/', AccountView.as_view(), name='account'),
    path('transactions/', TransactionView.as_view(), name='create-transaction'),
    path('transactions/<int:account_id>/', TransactionView.as_view(), name='get-transactions'),
    path('transactions/by-range/', TransactionRangeView.as_view(), name='transaction-range'),
    path('user-delete/', delete_user_data, name='delete-user-data'),
    path('user-reset/', reset_user_data, name='user-reset'),
]

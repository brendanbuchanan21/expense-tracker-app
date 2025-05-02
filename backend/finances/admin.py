from django.contrib import admin
from .models.user_model import ProfilePicture, FirebaseUser
from .models.account_model import MoneyAccount
from .models.transactionsModel import Transaction
 #from .models.accounts_model import MoneyAccount
# Register your models here.

admin.site.register(ProfilePicture)
admin.site.register(FirebaseUser)
admin.site.register(MoneyAccount)
admin.site.register(Transaction)
 # admin.site.register(MoneyAccount)

from django.db import models
from .user_model import FirebaseUser

#our class will be the new table in the database
class MoneyAccount(models.Model):
    user = models.ForeignKey(FirebaseUser, on_delete=models.CASCADE, related_name='accounts')
    account_name = models.CharField(max_length=100)
    bank_name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=15, decimal_places=2)
    type_of_account = models.CharField(max_length=50)

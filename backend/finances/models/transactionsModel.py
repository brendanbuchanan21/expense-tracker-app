from django.db import models


class Transaction(models.Model):
    description = models.CharField(max_length=40)
    date = models.DateField()
    type = models.CharField(max_length=40)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=40)
    account = models.ForeignKey('MoneyAccount', on_delete=models.CASCADE, related_name='transactions')




from rest_framework import serializers
from ..models.account_model import MoneyAccount

class AccountSerializer(serializers.ModelSerializer):
    accountName = serializers.CharField(source='account_name')
    bankName = serializers.CharField(source='bank_name')
    balance = serializers.DecimalField(max_digits=15, decimal_places=2)
    typeOfAccount = serializers.CharField(source='type_of_account')
    class Meta: 
        model = MoneyAccount
        fields = ['id','accountName', 'bankName', 'balance', 'typeOfAccount']
        read_only_fields = ['id']
        
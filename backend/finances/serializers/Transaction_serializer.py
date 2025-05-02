from rest_framework import serializers
from ..models.transactionsModel import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Transaction
        fields = ['id', 'description', 'date', 'type', 'amount', 'category', 'account']
        read_only_fields = ['id']
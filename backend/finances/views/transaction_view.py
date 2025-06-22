from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from ..serializers.Transaction_serializer import TransactionSerializer
from ..models.account_model import MoneyAccount
from ..models.user_model import FirebaseUser
from django.shortcuts import get_object_or_404



class TransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        
        
        transaction_data = request.data.get('transaction', {})
        account_id = transaction_data.get('account')



        firebase_uid = request.user.uid
        try: 
            firebase_user = FirebaseUser.objects.get(firebase_uid=firebase_uid)
        except FirebaseUser.DoesNotExist:
            return Response({"error": 'user not found'}, status=status.HTTP_404_NOT_FOUND)


        try: 
            account = MoneyAccount.objects.get(id=account_id, user=firebase_user)
        except MoneyAccount.DoesNotExist: 
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # we need to update the individual accounts total balance 
        # take the request amount and add or subtract from that specific money account
        #total balance
        serializer = TransactionSerializer(data=transaction_data)
        if serializer.is_valid():
           transaction = serializer.save(account=account)

           if transaction.type == "Deposit":
               account.balance += transaction.amount
           elif transaction.type == "Withdrawal":
               account.balance -= transaction.amount
           account.save()
           
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"invalid data sent"}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, account_id=None):
        if not account_id:
            return Response({'detail': 'Account ID is required'}, status=400)

        try: 
            account_id = int(account_id)
        except ValueError:
            return Response({'detail': 'Invalid account ID.'}, status=400)

        firebase_uid = request.user.uid
        try: 
            firebase_user = FirebaseUser.objects.get(firebase_uid=firebase_uid)
        except FirebaseUser.DoesNotExist:
            return Response({"error": 'user not found'}, status=status.HTTP_404_NOT_FOUND)

        account = get_object_or_404(MoneyAccount, id=account_id, user=firebase_user)

        transactions = account.transactions.all()

        serializer = TransactionSerializer(transactions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


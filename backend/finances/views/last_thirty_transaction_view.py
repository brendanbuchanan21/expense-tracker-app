from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from ..serializers.Transaction_serializer import TransactionSerializer
from ..models.account_model import MoneyAccount
from ..models.user_model import FirebaseUser
from datetime import timedelta
from django.utils import timezone
from ..models.transactionsModel import Transaction


class LastThirtyView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def get(self, request):

        #first get the users id
        firebase_uid = request.user.uid
        if not firebase_uid:
            return Response({'detail': 'could not find the correct user id'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try: 
            firebase_user = FirebaseUser.objects.get(firebase_uid=firebase_uid)
            print('⭐️', firebase_user)
        except FirebaseUser.DoesNotExist:
            return Response({"error": 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        
        accounts = MoneyAccount.objects.filter(user=firebase_user)
        print('💧', accounts)

        thirty_days_ago = timezone.now() - timedelta(days=30)
        transactions = Transaction.objects.filter(account__in=accounts, date__gte=thirty_days_ago)

        spendings = transactions.filter(type="Withdrawal")
        earnings = transactions.filter(type="Deposit")

        spending_serializer = TransactionSerializer(spendings, many=True)
        earnings_serializer = TransactionSerializer(earnings, many=True)

        return Response({
            "spendings": spending_serializer.data,
            "earnings": earnings_serializer.data
        }, status=status.HTTP_200_OK)
        #now we have firebase id, get firebase user to link to money accounts
        #once we find all of the money accounts,
        # get last 30 days transaction in a variable
        #  split spending and earnings
        # once split, 
        # once we have last 30, we need to serialize them 
        # once serailized, send back to the client 
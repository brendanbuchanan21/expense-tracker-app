from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from ..serializers.Transaction_serializer import TransactionSerializer
from ..models.account_model import MoneyAccount
from ..models.user_model import FirebaseUser
from datetime import timedelta, datetime
from django.utils import timezone
from ..models.transactionsModel import Transaction


class TransactionRangeView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def get(self, request):
        print('🌕');
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


        # Get the 'start' and 'end' dates from query parameters
        start_date_str = request.query_params.get('start', None)
        end_date_str = request.query_params.get('end', None)
        print('🐼 Start:', start_date_str, 'End:', end_date_str)

        if not start_date_str or not end_date_str:
            return Response({'error': 'Both start and end dates must be provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Parse the 'start' and 'end' dates into proper datetime objects
        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')  # Ensure the date format is consistent
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d') + timedelta(days=1)  # Include the full end day
        except ValueError:
            return Response({'error': 'Invalid date format, use YYYY-MM-DD'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch transactions for the given date range
        transactions = Transaction.objects.filter(account__in=accounts, date__gte=start_date, date__lt=end_date)

       
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
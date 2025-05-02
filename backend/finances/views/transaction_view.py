from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from ..serializers.Transaction_serializer import TransactionSerializer
from ..models.account_model import MoneyAccount
from ..models.user_model import FirebaseUser



class TransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        
        
        user = request.user
        transaction_data = request.data.get('transaction', {})
        account_id = transaction_data.get('account')

        print(f"Request data: {request.data}")


        firebase_uid = request.user.uid
        try: 
            firebase_user = FirebaseUser.objects.get(firebase_uid=firebase_uid)
            print('🥶', firebase_user)
        except FirebaseUser.DoesNotExist:
            return Response({"error": 'user not found'}, status=status.HTTP_404_NOT_FOUND)


        try: 
            account = MoneyAccount.objects.get(id=account_id, user=firebase_user)
            print('🥎 down under', account)
        except MoneyAccount.DoesNotExist: 
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TransactionSerializer(data=transaction_data)
        if serializer.is_valid():
            serializer.save(account=account)
            #in this response we need to attach the new id
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





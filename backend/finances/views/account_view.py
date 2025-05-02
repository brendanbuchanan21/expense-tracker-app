
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers.account_serializer import AccountSerializer
from ..models.user_model import FirebaseUser
from rest_framework.views import APIView




class AccountView(APIView):
    def get(self, request):
        user = request.user
        if not user:
            return Response({"ERROR": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            #get id from user and first validate that exists in db? 
            user_id = user.uid

            firebase_user = FirebaseUser.objects.get(firebase_uid=user_id)
            if not firebase_user:
                return Response({"Could not find user in database"}, status=status.HTTP_404_NOT_FOUND)
            
            #now that we have user, find accounts in database
            accounts = firebase_user.accounts.all()
            print (accounts, '🥺')
            serialized_accounts = AccountSerializer(accounts, many=True)

            return Response(serialized_accounts.data, status=status.HTTP_202_ACCEPTED)
        except FirebaseUser.DoesNotExist:
            return Response({"error": "User not found in the database"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        user = request.user
        if not user:
            return Response({"Error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            firebase_user = FirebaseUser.objects.get(firebase_uid=user.uid)
        except FirebaseUser.DoesNotExist:
            return Response({"could not find user in database"}, status=status.HTTP_401_UNAUTHORIZED)
            

        # serialize it with our accoutn serializer
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=firebase_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
      

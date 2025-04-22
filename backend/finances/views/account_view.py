
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers.account_serializer import AccountSerializer
from ..models.user_model import FirebaseUser


@api_view(['POST'])
def upload_account(request):
    decoded_user = request.user

    if not decoded_user: 
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    

    ##
    firebase_uid = request.data.get('userId')
    
    if not firebase_uid:
        return Response({"error": "missing id, cannot post to database"}, status=status.HTTP_401_UNAUTHORIZED)
    

    try:
        user = FirebaseUser.objects.get(firebase_uid=firebase_uid)
    except FirebaseUser.DoesNotExist:
        return Response({"error": "Firebase user not found"}, status=status.HTTP_404_NOT_FOUND)


    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



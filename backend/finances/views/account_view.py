
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def upload_account(request):
    decoded_user = request.user

    if not decoded_user: 
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    

    ##
    firebase_uid = request.data.get('firebase_uid')
    
    if not firebase_uid:
        return Response({"error": "missing id, cannot post to database"}, status=status.HTTP_401_UNAUTHORIZED)
    
    ##now we have the id, take request.data and post to model? 

    
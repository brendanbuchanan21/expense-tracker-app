

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.user_model import FirebaseUser
from ..serializers.user_serializer import FirebaseUserSerializer

@api_view(['POST'])
def register_or_get_user(request):
    decoded_user = request.user

    if not decoded_user: 
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    
    
    firebase_uid = request.data.get('firebase_uid')
    username = request.data.get('username')

    if not firebase_uid or not username:
        return Response({"error": "Missing firebase_uid or username"}, status=status.HTTP_400_BAD_REQUEST)
    
    firebase_user, created = FirebaseUser.objects.get_or_create(
        firebase_uid=firebase_uid,
        defaults={'username': username}
    )

    serializer = FirebaseUserSerializer(firebase_user)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


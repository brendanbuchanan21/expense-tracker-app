
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from ..models.user_model import FirebaseUser
from ..serializers.user_serializer import FirebaseUserSerializer
from rest_framework.parsers import MultiPartParser
from django.contrib.auth.models import AnonymousUser
from ..models.user_model import ProfilePicture

# view for posting username and user id to database
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

# view for posting users profile picture to the database

@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_profile_picture(request): 
    user = request.user

    print("request.user:", request.user)
    print("request.user type:", type(request.user))
    if isinstance(user, AnonymousUser):
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    
    firebase_uid = user.uid

    database_user = FirebaseUser.objects.filter(firebase_uid=firebase_uid).first()
    if not database_user:
        return Response({"error": "User not found"}, status=400)
    
    profile_image = request.FILES.get('profile_image')
    print('received image:', profile_image)
    if not profile_image: 
        return Response({"error": "No image provided"}, status=400)
    
    profile_picture, created = ProfilePicture.objects.get_or_create(user=database_user)
    
    if created: 
        print(f"Profile picture for {database_user.username} was created.")
    else: print(f"Profile picture for {database_user.username} already exists.")
       
    # Assign the image and save
    profile_picture.image = profile_image  
    profile_picture.save()



    return Response({"message": "Profile picture updated successfully."}, status=200)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_data(request):
    firebase_uid = request.user.uid

    try: 
        user = FirebaseUser.objects.get(firebase_uid=firebase_uid)
        user.delete()

        return Response({'message': 'User data deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    except FirebaseUser.DoesNotExist:
        return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def reset_user_data(request):
    firebase_uid = request.user.uid

    try:
        #delete all accounts and cascade to transactions
        user = FirebaseUser.objects.get(firebase_uid=firebase_uid)

        user.accounts.all().delete()

        if hasattr(user, 'profile_picture'):
            user.profile_picture.delete()
        
        return Response({"message": "user data reset successful"}, status=status.HTTP_204_NO_CONTENT)


    except FirebaseUser.DoesNotExist:
        return Response({"error": 'user not found'}, status=status.HTTP_404_NOT_FOUND)

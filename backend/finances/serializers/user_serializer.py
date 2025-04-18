

from rest_framework import serializers
from ..models.user_model import ProfilePicture 
from ..models.user_model import FirebaseUser

class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ProfilePicture
        fields = '__all__'


class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FirebaseUser
        fields = ['firebase_uid', 'username']
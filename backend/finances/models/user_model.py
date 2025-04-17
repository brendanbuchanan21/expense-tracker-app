from django.db import models
from django.contrib.auth.models import User
# Create your models here.



class ProfilePicture(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_picture')
    image = models.ImageField(upload_to='profile_pictures/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Profile Picture"
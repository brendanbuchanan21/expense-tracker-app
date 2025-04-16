from django.db import models

# Create your models here.



class ProfilePicture(models.Model):
    image = models.ImageField(upload_to='profile_pictures/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
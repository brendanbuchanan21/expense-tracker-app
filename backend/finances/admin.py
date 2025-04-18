from django.contrib import admin
from .models.user_model import ProfilePicture, FirebaseUser
# Register your models here.

admin.site.register(ProfilePicture)
admin.site.register(FirebaseUser)

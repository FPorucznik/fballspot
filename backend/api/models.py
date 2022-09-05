from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    bio = models.TextField(max_length=200, blank=True)
    fav_team = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to='avatars', default='default.png')

    
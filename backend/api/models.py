from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    bio = models.TextField(max_length=200, blank=True)
    fav_team = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to='avatars', default='default.png')

    def __str__(self) -> str:
        return self.user.username

class Notification(models.Model):
    account = models.ForeignKey(Account, null=False, on_delete=models.CASCADE)
    type = models.TextField(max_length=50, blank=False)
    data = models.JSONField()

    def __str__(self) -> str:
        return f'{self.account.user.username}-{self.type}'

class Friend(models.Model):
    accountOne = models.ForeignKey(Account, null=False, related_name="account_one", on_delete=models.CASCADE)
    accountTwo = models.ForeignKey(Account, null=False, related_name="account_two", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.accountOne.user.username}-{self.accountTwo.user.username}'
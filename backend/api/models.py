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
    sender = models.ForeignKey(Account, null=False, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(Account, null=False, related_name="receiver", on_delete=models.CASCADE)
    type = models.TextField(max_length=50, blank=False)
    data = models.JSONField()

    def __str__(self) -> str:
        return f'{self.receiver.user.username}-{self.type}'

class Friend(models.Model):
    accountOne = models.ForeignKey(Account, null=False, related_name="account_one", on_delete=models.CASCADE)
    accountTwo = models.ForeignKey(Account, null=False, related_name="account_two", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.accountOne.user.username}-{self.accountTwo.user.username}'

class Post(models.Model):
    author = models.ForeignKey(Account, null=False, on_delete=models.CASCADE)
    visibility = models.CharField(max_length=10, blank=False)
    type = models.CharField(max_length=10, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='posts',  blank=True)
    content = models.JSONField()
    likes = models.ManyToManyField(Account, related_name="account_likes", blank=True)
    dislikes = models.ManyToManyField(Account, related_name="account_dislikes", blank=True)

    def __str__(self) -> str:
        return f'{self.author.user.username}-{self.type}'

class Comment(models.Model):
    author = models.ForeignKey(Account, null=False, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=False, on_delete=models.CASCADE)
    text = models.TextField(max_length=500, null=False)

    def __str__(self) -> str:
        return f'{self.author.user.username}-{self.post}'

class Message(models.Model):
    author = models.ForeignKey(Account, related_name="chat_message", blank=False, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class Chat(models.Model):
    users = models.ManyToManyField(Account, related_name="chat_users")
    messages = models.ManyToManyField(Message, related_name="chat_messages", blank=True)

    def __str__(self):
        return f'{self.pk}'
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from api.models import Account, Notification, Friend, Post, Comment, Message, Chat, Watchroom, generate_code

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['account_id'] = user.account.id

        return token

class RegisterUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['email', 'username', 'password']
    
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        new_account = Account.objects.create(user=user)
        new_account.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'user', 'bio', 'fav_team', 'avatar']

class UpdateUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    bio = serializers.CharField(required=False)
    fav_team = serializers.CharField(required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = Account
        fields = ['user', 'bio', 'fav_team', 'avatar']

class SearchUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'user', 'bio', 'fav_team', 'avatar']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'sender', 'receiver', 'type', 'data']

class FriendsSerializer(serializers.ModelSerializer):
    accountOne = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    accountTwo = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())

    class Meta:
        model = Friend
        fields = ['accountOne', 'accountTwo']

class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())

    class Meta:
        model = Post
        fields = ['id', 'author', 'visibility', 'type', 'date', 'image', 'content', 'likes', 'dislikes']

class ListPostSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True)
    likes = AccountSerializer(read_only=True, many=True)
    dislikes = AccountSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'visibility', 'type', 'date', 'image', 'content', 'likes', 'dislikes']

class ListCommentSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'post', 'text']

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ['id', 'author', 'post', 'text']

class FriendsDetailsSerializer(serializers.ModelSerializer):
    accountOne = AccountSerializer(read_only=True)
    accountTwo = AccountSerializer(read_only=True)

    class Meta:
        model = Friend
        fields = ['id', 'accountOne', 'accountTwo']

class MessageAccountDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'user', 'avatar']

class MessageSerializer(serializers.ModelSerializer):
    author = MessageAccountDetailSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'author', 'text', 'timestamp']

class ChatSerializer(serializers.ModelSerializer):
    users = AccountSerializer(read_only=True, many=True)
    messages = MessageSerializer(read_only=True, many=True)

    class Meta:
        model = Chat
        fields = ['id', 'users', 'messages']

class CreateChatSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(required=True, many=True, queryset=Account.objects.all())
    messages = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'users', 'messages']

class CreateWatchroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchroom
        fields = ['id', 'host']

    def create(self, validated_data):
        room = Watchroom(
            host=validated_data['host'],
            code=generate_code()
        )
        room.save()
        room.users.add(validated_data['host'])
        room.save()

        return room

class GetWatchroomSerializer(serializers.ModelSerializer):
    users = AccountSerializer(read_only=True, many=True)
    messages = MessageSerializer(read_only=True, many=True)
    host = AccountSerializer(read_only=True)

    class Meta:
        model = Watchroom
        fields = ['id', 'host', 'code', 'users', 'messages']

class UpdateWatchroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchroom
        fields = ['host', 'code', 'users', 'messages']
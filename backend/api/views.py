from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import AccountSerializer, MyTokenObtainPairSerializer, RegisterUserSerializer, UpdateUserSerializer, SearchUserSerializer, \
    NotificationSerializer, FriendsSerializer, PostSerializer, ListPostSerializer, ListCommentSerializer
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Account, Notification, Friend, Post, Comment
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer

class UserView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

class UpdateUserView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]

class SearchUserView(generics.ListAPIView):
    serializer_class = SearchUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        return Account.objects.filter(user__username=username)

class ListNotificationView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        return Notification.objects.filter(receiver__user__username=username)

class AddFriendRelationshipView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = FriendsSerializer
    permission_classes = [IsAuthenticated]

class ListFriendsView(generics.ListAPIView):
    serializer_class = FriendsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        return Friend.objects.filter(Q(accountOne__user__username=username) | Q(accountTwo__user__username=username))

class AddNotificationView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        sender = Account.objects.get(pk=request.data['sender'])
        receiver = Account.objects.get(pk=request.data['receiver'])
        Notification.objects.get_or_create(sender=sender, receiver=receiver, type=request.data['type'], data=request.data['data'])
        return Response(request.data, status=status.HTTP_201_CREATED)

class DeleteNotificationView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

class ListPostsView(generics.ListAPIView):
    queryset = Post.objects.order_by('date').reverse()
    serializer_class = ListPostSerializer
    pagination_class = PageNumberPagination


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class UpdatePostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class ListCommentsView(generics.ListAPIView):
    serializer_class = ListCommentSerializer

    def get_queryset(self):
        post = self.kwargs['post']
        return Comment.objects.filter(post=post)
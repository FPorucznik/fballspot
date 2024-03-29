from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import AccountSerializer, MyTokenObtainPairSerializer, RegisterUserSerializer, UpdateUserSerializer, SearchUserSerializer, \
    NotificationSerializer, FriendsSerializer, PostSerializer, ListPostSerializer, ListCommentSerializer, CommentSerializer, FriendsDetailsSerializer, \
    ChatSerializer, CreateChatSerializer, CreateWatchroomSerializer, GetWatchroomSerializer, UpdateWatchroomSerializer
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Account, Notification, Friend, Post, Comment, Chat, Watchroom
from django.db.models import Q
from rest_framework.response import Response
from api.pagination import PostsPagination


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
    serializer_class = ListPostSerializer
    pagination_class = PostsPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        data = self.kwargs['visibility'].split("-")
        visibility = data[0]
        user = int(data[1])

        if user != 0:
            friends = Friend.objects.filter(Q(accountOne=user) | Q(accountTwo=user)).values_list('accountOne', 'accountTwo')
            friends = list(sum(friends,()))
            if not friends:
                friends.append(user)
            return Post.objects.filter(Q(visibility=visibility) & Q(author__id__in=friends)).order_by('date').reverse()

        return Post.objects.filter(visibility=visibility).order_by('date').reverse()


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class UpdatePostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class ListCommentsView(generics.ListAPIView):
    serializer_class = ListCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post = self.kwargs['post']
        return Comment.objects.filter(post=post)

class CreateCommentView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

class UserFriendsWithDetailsView(generics.ListAPIView):
    serializer_class = FriendsDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        return Friend.objects.filter(Q(accountOne__user__username=username) | Q(accountTwo__user__username=username))

class CreateChatView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = CreateChatSerializer
    permission_classes = [IsAuthenticated]

class ListChatsView(generics.ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Chat.objects.filter(users__id=pk)

class GetChatView(generics.RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

class CreateWatchroomView(generics.CreateAPIView):
    queryset = Watchroom.objects.all()
    serializer_class =  CreateWatchroomSerializer
    permission_classes = [IsAuthenticated]

class GetWatchroomView(generics.RetrieveAPIView):
    queryset = Watchroom.objects.all()
    serializer_class = GetWatchroomSerializer
    permission_classes = [IsAuthenticated]

class UpdateWatchroomView(generics.UpdateAPIView):
    queryset = Watchroom.objects.all()
    serializer_class = UpdateWatchroomSerializer
    permission_classes = [IsAuthenticated]
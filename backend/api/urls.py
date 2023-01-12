from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from api.views import MyTokenObtainPairView, RegisterUserView, UpdateUserView, UserView, SearchUserView, \
    ListNotificationView, AddFriendRelationshipView, ListFriendsView, AddNotificationView, DeleteNotificationView, \
    ListPostsView, CreatePostView, ListCommentsView, UpdatePostView, CreateCommentView, UserFriendsWithDetailsView, \
    CreateChatView, ListChatsView, GetChatView




urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('user/<int:pk>', UserView.as_view(), name='user_info'),
    path('user/<slug:username>', SearchUserView.as_view(), name='user_search'),
    path('user/update/<int:pk>', UpdateUserView.as_view(), name='user_update'),
    path('user/notifications/<slug:username>', ListNotificationView.as_view(), name='user_notifiactions'),
    path('user/friends/add/', AddFriendRelationshipView.as_view(), name='user_add_friend_relationship'),
    path('user/friends/<slug:username>', ListFriendsView.as_view(), name='user_friends'),
    path('user/notifications/add/', AddNotificationView.as_view(), name='user_add_notification'),
    path('user/notifications/delete/<int:pk>', DeleteNotificationView.as_view(), name='user_delete_notification'),
    path('posts/<slug:visibility>', ListPostsView.as_view(), name='posts'),
    path('posts/create/', CreatePostView.as_view(), name='post_create'),
    path('posts/comments/<int:post>', ListCommentsView.as_view(), name='post_comments'),
    path('posts/comments/add/', CreateCommentView.as_view(), name='add_post_comments'),
    path('posts/update/<int:pk>', UpdatePostView.as_view(), name='post_update'),
    path('user/friends/chats/<slug:username>', UserFriendsWithDetailsView.as_view(), name='user_friends_chats'),
    path('chat/create/', CreateChatView.as_view(), name='chat_create'),
    path('user/chats/<int:pk>', ListChatsView.as_view(), name='user_chats'),
    path('chats/<int:pk>', GetChatView.as_view(), name='get_chat')
]

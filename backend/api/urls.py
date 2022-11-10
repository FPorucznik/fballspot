from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from api.views import MyTokenObtainPairView, RegisterUserView, UpdateUserView, UserView, SearchUserView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('user/<int:pk>', UserView.as_view(), name='user_info'),
    path('user/<slug:username>', SearchUserView.as_view(), name='user_search'),
    path('user/update/<int:pk>', UpdateUserView.as_view(), name='user_update')
]

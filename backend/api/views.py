from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import AccountSerializer, MyTokenObtainPairSerializer, RegisterUserSerializer, UpdateUserSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Account
from rest_framework.parsers import MultiPartParser, FormParser


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

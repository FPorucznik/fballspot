from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from api.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<chat_name>\w+)/$", ChatConsumer.as_asgi()),
]
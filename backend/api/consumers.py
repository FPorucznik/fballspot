import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat, Message, Account
from .serializers import MessageSerializer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_name = self.scope["url_route"]["kwargs"]["chat_name"]
        self.chat_group_name = "chat_%s" % self.chat_name

        await self.channel_layer.group_add(self.chat_group_name, self.channel_name)

        await self.accept()
    

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.chat_group_name, self.channel_name)

    async def receive(self, text_data):
        print("receive ran")
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        type = text_data_json["type"]
        sender = text_data_json["sender"]
        chat_id = text_data_json["chat_id"]

        messageData = await self.create_message(sender, message, chat_id)

        await self.channel_layer.group_send(
            self.chat_group_name, {"type": type, "message": messageData}
        )

    async def chat_message(self, event):
        print("chat_message ran")
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))
    
    @database_sync_to_async
    def create_message(self, author, text, chat_id):
        print("creating message")
        account = Account.objects.get(id=author)
        message = Message(
            author=account,
            text=text
        )
        message.save()

        chat = Chat.objects.get(id=chat_id)
        chat.messages.add(message)
        chat.save()

        data = MessageSerializer(message).data
        data['author']['user'] = dict(data['author']['user'])
        data['author'] = dict(data['author'])

        return data
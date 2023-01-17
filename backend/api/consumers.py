import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat, Message, Account, Watchroom
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
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))
    
    @database_sync_to_async
    def create_message(self, author, text, chat_id):
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

class WatchroomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.watchroom_name = self.scope["url_route"]["kwargs"]["watchroom_name"]
        self.watchroom_group_name = "watchroom_%s" % self.watchroom_name

        await self.channel_layer.group_add(self.watchroom_group_name, self.channel_name)

        await self.accept()
    

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.watchroom_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        type = text_data_json["type"]
        sender = text_data_json["sender"]
        watchroom_id = text_data_json["watchroom_id"]

        if type == "watchroom_message":
            messageData = await self.create_message(sender, message, watchroom_id)
        else:
            messageData = {
                "type": type,
                "message": message,
            }

        await self.channel_layer.group_send(
            self.watchroom_group_name, {"type": type, "message": messageData}
        )

    async def watchroom_message(self, event):
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))

    async def watchroom_play_video(self, event):
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))

    async def watchroom_pause_video(self, event):
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))
    
    async def watchroom_load_video(self, event):
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))

    async def user_join(self, event):
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))
    
    async def video_share(self, event):
        messageData = event["message"]

        await self.send(text_data=json.dumps({"message": messageData}))
    
    @database_sync_to_async
    def create_message(self, author, text, watchroom_id):
        account = Account.objects.get(id=author)
        message = Message(
            author=account,
            text=text
        )
        message.save()

        watchroom = Watchroom.objects.get(id=watchroom_id)
        watchroom.messages.add(message)
        watchroom.save()

        data = MessageSerializer(message).data
        data['author']['user'] = dict(data['author']['user'])
        data['author'] = dict(data['author'])

        return data
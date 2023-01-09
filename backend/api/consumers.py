import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.chat_name = self.scope["url_route"]["kwargs"]["chat_name"]
        self.chat_group_name = "chat_%s" % self.chat_name

        async_to_sync(self.channel_layer.group_add)(
            self.chat_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.chat_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        type = text_data_json["type"]
        sender = text_data_json["sender"]

        async_to_sync(self.channel_layer.group_send)(
            self.chat_group_name, {"type": type, "message": message, "sender": sender}
        )

    def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]

        self.send(text_data=json.dumps({"message": message, "sender": sender}))
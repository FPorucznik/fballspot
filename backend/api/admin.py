from django.contrib import admin
from .models import Account, Notification, Friend, Post, Comment

class AccountAdmin(admin.ModelAdmin):
    pass

class NotificationAdmin(admin.ModelAdmin):
    pass

class FriendsAdmin(admin.ModelAdmin):
    pass

class PostAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account, AccountAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Friend, FriendsAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)


from django.contrib import admin
from .models import Account, Notification, Friend

class AccountAdmin(admin.ModelAdmin):
    pass

class NotificationAdmin(admin.ModelAdmin):
    pass

class FriendsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account, AccountAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Friend, FriendsAdmin)


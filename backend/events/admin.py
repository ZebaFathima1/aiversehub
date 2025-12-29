from django.contrib import admin
from .models import Event, GalleryImage, Payment, Registration

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'status', 'registered', 'capacity')
    list_filter = ('status', 'featured')
    search_fields = ('name', 'description', 'venue')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('event', 'title', 'uploaded_at')
    list_filter = ('event',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'user', 'event', 'amount', 'status', 'date')
    list_filter = ('status', 'method')
    search_fields = ('transaction_id', 'user__username', 'event__name')

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'date')
    list_filter = ('event',)
    search_fields = ('user__username', 'event__name')

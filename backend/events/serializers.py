from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event, GalleryImage, Payment, Registration
from accounts.models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')

    def get_profile(self, obj):
        try:
            profile = obj.profile
            return {
                'role': profile.role,
                'department': profile.department,
                'year': profile.year,
            }
        except UserProfile.DoesNotExist:
            return None

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ('id', 'image', 'title', 'uploaded_at')

class EventSerializer(serializers.ModelSerializer):
    gallery_images = GalleryImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    event_name = serializers.CharField(source='event.name', read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    event_name = serializers.CharField(source='event.name', read_only=True)

    class Meta:
        model = Registration
        fields = '__all__'

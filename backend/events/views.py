from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.db import models
from .models import Event, EventImage, EventRegistration
from .serializers import EventSerializer, EventImageSerializer, EventRegistrationSerializer
from users.views import IsAdminUser


from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny

class EventViewSet(viewsets.ModelViewSet):
    """ViewSet for event management"""
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'add_image']:
            # For now, keeping it open as per 'NO admin login' requirement 
            # or you might want IsAdminUser if you want SOME security.
            # But the prompt says NO admin login.
            return [AllowAny()]
        return [AllowAny()]
    
    def get_queryset(self):
        queryset = Event.objects.all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by featured
        is_featured = self.request.query_params.get('featured', None)
        if is_featured:
            queryset = queryset.filter(is_featured=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def past(self, request):
        """Get past events"""
        events = Event.objects.filter(status='completed').order_by('-date')
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events"""
        events = Event.objects.filter(status='upcoming').order_by('date')
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current events"""
        events = Event.objects.filter(status='ongoing').order_by('date')
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_image(self, request, slug=None):
        """Add image to event gallery"""
        event = self.get_object()
        
        image = request.FILES.get('image')
        caption = request.data.get('caption', '')
        
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        event_image = EventImage.objects.create(
            event=event,
            image=image,
            caption=caption
        )
        
        serializer = EventImageSerializer(event_image, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def registrations(self, request, slug=None):
        """Get all registrations for an event"""
        event = self.get_object()
        registrations = EventRegistration.objects.filter(event=event)
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)


class EventRegistrationViewSet(viewsets.ModelViewSet):
    """ViewSet for event registrations"""
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = EventRegistration.objects.select_related('user', 'event')
        
        # Filter by user
        user_id = self.request.query_params.get('user', None)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
            
        # Filter by event
        event_slug = self.request.query_params.get('event', None)
        if event_slug:
            queryset = queryset.filter(event__slug=event_slug)
            
        return queryset.order_by('-registered_at')

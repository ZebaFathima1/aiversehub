from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Event, GalleryImage, Payment, Registration
from .serializers import EventSerializer, GalleryImageSerializer, PaymentSerializer, RegistrationSerializer, UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def add_image(self, request, pk=None):
        event = self.get_object()
        image = request.FILES.get('image')
        title = request.data.get('title', '')
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        gallery_image = GalleryImage.objects.create(event=event, image=image, title=title)
        serializer = GalleryImageSerializer(gallery_image)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-date')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Payment.objects.all().order_by('-date')
        return Payment.objects.filter(user=user).order_by('-date')

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        payment = self.get_object()
        payment.status = 'completed'
        payment.save()
        
        # Create registration if it doesn't exist
        Registration.objects.get_or_create(user=payment.user, event=payment.event, payment=payment)
        
        return Response({'status': 'payment approved and registration created'})

class RegistrationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Registration.objects.all().order_by('-date')
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Registration.objects.all().order_by('-date')
        return Registration.objects.filter(user=user).order_by('-date')

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

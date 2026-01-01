from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Payment
from .serializers import PaymentSerializer
from users.views import IsAdminUser
from analytics.models import Activity


from rest_framework.permissions import IsAuthenticated, AllowAny

class PaymentViewSet(viewsets.ModelViewSet):
    """ViewSet for payment management"""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    
    def get_permissions(self):
        if self.action in ['approve', 'reject', 'list', 'retrieve', 'update', 'partial_update', 'destroy']:
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        queryset = Payment.objects.select_related('user', 'event', 'processed_by')
        
        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by user (for non-admin users)
        if hasattr(self.request.user, 'is_admin'):
            if not self.request.user.is_admin:
                queryset = queryset.filter(user=self.request.user)
        elif self.request.user.is_anonymous:
            # If anonymous, we might want to allow seeing all for the admin dashboard
            # But normally we'd restrict it. However, the requirement is NO admin login.
            pass
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        # Create activity log
        Activity.objects.create(
            user=self.request.user,
            action='submitted a payment',
            activity_type='payment'
        )
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def approve(self, request, pk=None):
        """Approve a payment"""
        payment = self.get_object()
        payment.status = 'approved'
        payment.processed_at = timezone.now()
        payment.processed_by = request.user if not request.user.is_anonymous else None
        payment.save()
        
        # Create activity log
        Activity.objects.create(
            user=payment.user,
            action=f'payment approved for {payment.event.title if payment.event else "registration"}',
            activity_type='payment'
        )
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def reject(self, request, pk=None):
        """Reject a payment"""
        payment = self.get_object()
        payment.status = 'rejected'
        payment.processed_at = timezone.now()
        payment.processed_by = request.user if not request.user.is_anonymous else None
        payment.notes = request.data.get('notes', payment.notes)
        payment.save()
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)

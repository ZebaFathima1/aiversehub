from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from .models import Event, Payment, Registration
from django.contrib.auth.models import User

class DashboardAnalyticsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        now = timezone.now()
        last_month = now - timedelta(days=30)
        
        # Stats
        total_users = User.objects.count()
        active_events = Event.objects.filter(status__in=['ongoing', 'upcoming']).count()
        total_registrations = Registration.objects.count()
        total_revenue = Payment.objects.filter(status='completed').aggregate(Sum('amount'))['amount__sum'] or 0
        
        # Recent Activity
        recent_registrations = Registration.objects.order_by('-date')[:5]
        recent_payments = Payment.objects.order_by('-date')[:5]
        
        activities = []
        for reg in recent_registrations:
            activities.append({
                'id': f'reg_{reg.id}',
                'user': reg.user.username,
                'action': f'registered for {reg.event.name}',
                'time': reg.date,
                'type': 'registration'
            })
        for pay in recent_payments:
            activities.append({
                'id': f'pay_{pay.id}',
                'user': pay.user.username,
                'action': f'completed payment of ₹{pay.amount}',
                'time': pay.date,
                'type': 'payment'
            })
        
        activities.sort(key=lambda x: x['time'], reverse=True)
        
        # Chart Data (last 6 months)
        chart_data = []
        for i in range(5, -1, -1):
            month_start = (now - timedelta(days=30 * i)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            month_end = (month_start + timedelta(days=32)).replace(day=1) - timedelta(seconds=1)
            
            month_revenue = Payment.objects.filter(
                status='completed', 
                date__range=[month_start, month_end]
            ).aggregate(Sum('amount'))['amount__sum'] or 0
            
            month_regs = Registration.objects.filter(
                date__range=[month_start, month_end]
            ).count()
            
            chart_data.append({
                'name': month_start.strftime('%b'),
                'revenue': float(month_revenue),
                'registrations': month_regs
            })

        return Response({
            'stats': {
                'total_users': total_users,
                'active_events': active_events,
                'total_registrations': total_registrations,
                'total_revenue': float(total_revenue),
            },
            'activities': activities[:10],
            'chart_data': chart_data
        })

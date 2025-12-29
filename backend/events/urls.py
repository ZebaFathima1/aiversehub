from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, PaymentViewSet, RegistrationViewSet, AdminUserViewSet
from .analytics_views import DashboardAnalyticsView

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'registrations', RegistrationViewSet)
router.register(r'admin-users', AdminUserViewSet, basename='admin-user')

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/dashboard/', DashboardAnalyticsView.as_view(), name='dashboard-analytics'),
]

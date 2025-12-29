from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.views import TokenObtainAndLogView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Keep Django's built-in admin available under `/django-admin/` so
    # we can use `/admin/` for the custom SPA dashboard.
    path('django-admin/', admin.site.urls),
    path('api/auth/token/', TokenObtainAndLogView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('events.urls')),
    # Catch-all route for the SPA.
    re_path(r'^(?!django-admin/|static/|assets/|api/|media/).*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

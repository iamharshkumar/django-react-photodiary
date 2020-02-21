from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from core.views import UserIDView, CommentView, UserProfileView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include("core.urls")),
    path('api/user-id/', UserIDView.as_view(), name='user-id'),
    path('api/comment/', CommentView.as_view(), name='comment'),
    path('api/profile/<username>/', UserProfileView.as_view(), name='profile'),
    path('api/profile/<username>/follow/', UserProfileView.as_view(), name='follow')

    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
                    ]

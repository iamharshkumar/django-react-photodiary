from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from core.views import UserIDView, CommentView, UserProfileView, LikesView, UserProfileEditView, FollowingUserPosts, \
    PostViewSets, PostDetailView, PostCreateView, FollowersListView, FollowingListView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/user-id/', UserIDView.as_view(), name='user-id'),
    path('api/comment/', CommentView.as_view(), name='comment'),
    path('api/profile/<username>/', UserProfileView.as_view(), name='profile'),
    path('api/profile/<username>/follow/', UserProfileView.as_view(), name='follow'),
    path('api/likes/', LikesView.as_view(), name='follow'),
    path('api/profile/<pk>/edit/', UserProfileEditView.as_view(), name='profile-edit'),
    path('api/post/<pk>/', PostDetailView.as_view(), name='post-detail'),
    path('api/userfeed/', FollowingUserPosts.as_view(), name='profile-edit'),
    path('api/posts/', PostViewSets.as_view(), name='list-posts'),
    path('api/create/', PostCreateView.as_view(), name='post-create'),
    path('api/<username>/followers/', FollowersListView.as_view(), name='user-followers'),
    path('api/<username>/following/', FollowingListView.as_view(), name='user-following'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
                    ]

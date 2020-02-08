from .views import PostViewSets
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'posts', PostViewSets, basename='user')
urlpatterns = router.urls

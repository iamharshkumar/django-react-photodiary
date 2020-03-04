from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from .serializers import PostSerializers, CommentSerializers, UserProfileSerializer, UserSerializer
from .models import Post, Comment, UserProfile, User


# Create your views here.


class UserProfileView(APIView):
    serializer_class = UserProfileSerializer

    def get(self, request, username, *args, **kwargs):
        user_profile = UserProfile.objects.get(user__username=username)
        serializer = self.serializer_class(instance=user_profile, context={'request': request})

        return Response({"data": serializer.data}, status=HTTP_200_OK)

    def post(self, request, username):
        user_profile = UserProfile.objects.get(user__username=username)
        data = request.data
        action = data.get("action")
        me = request.user
        if user_profile != me:
            if action == "follow":
                user_profile.followers.add(me)
            elif action == "unfollow":
                user_profile.followers.remove(me)
            else:
                pass
        serializer = self.serializer_class(instance=user_profile, context={'request': request})

        return Response({"data": serializer.data}, status=HTTP_200_OK)


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id, 'username': request.user.username}, status=HTTP_200_OK)


def is_there_more_data(request):
    offset = request.GET.get('offset')
    if int(offset) > Post.objects.all().count():
        return False
    return True


def infinite_filter(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return Post.objects.all()[int(offset): int(offset) + int(limit)]


class PostViewSets(ListAPIView):
    serializer_class = PostSerializers

    def get_queryset(self):
        qs = infinite_filter(self.request)
        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "posts": serializer.data,
            "has_more": is_there_more_data(self.request)
        })

    # queryset = Post.objects.order_by('-created')


class PostDetailView(RetrieveAPIView):
    serializer_class = PostSerializers
    queryset = Post.objects.all()


class PostCreateView(CreateAPIView):
    serializer_class = PostSerializers
    queryset = Post.objects.all()


class FollowingUserPosts(APIView):

    def get(self, request):
        i_following = self.request.user.following.all()
        qs = Post.objects.filter(user__in=i_following).order_by('-created')
        serializer = PostSerializers(qs, many=True).data
        return Response(serializer, status=HTTP_200_OK)


class CommentView(CreateAPIView):
    serializer_class = CommentSerializers
    permission_classes = (IsAuthenticated,)
    queryset = Comment.objects.all()


class UserProfileEditView(UpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = UserProfile.objects.all()


class LikesView(APIView):

    def post(self, request):
        user = request.user
        data = request.data
        action = data.get("action")
        post_id = data.get("post_id")
        post_obj = Post.objects.get(id=post_id)
        print(action, post_id)
        if post_obj:
            if action == "like":
                post_obj.likes.add(user)
            elif action == "unlike":
                post_obj.likes.remove(user)

        serializer = PostSerializers(instance=post_obj, context={"request": request})
        return Response(serializer.data, status=HTTP_200_OK)


class FollowersListView(APIView):
    serializer_class = UserSerializer

    def get(self, request, username):
        user = UserProfile.objects.get(user__username=username)
        qs = user.followers.all()
        serializer = self.serializer_class(qs, many=True).data
        return Response(serializer, status=HTTP_200_OK)


class FollowingListView(APIView):
    serializer_class = UserProfileSerializer

    def get(self, request, username):
        user = User.objects.get(username=username)
        qs = user.following.all()
        serializer = self.serializer_class(instance=qs, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

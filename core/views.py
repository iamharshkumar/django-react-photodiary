from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from .serializers import PostSerializers, CommentSerializers, UserProfileSerializer
from .models import Post, Comment, UserProfile


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


class PostViewSets(viewsets.ModelViewSet):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.order_by('-created')


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

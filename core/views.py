from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from .serializers import PostSerializers, CommentSerializers
from .models import Post, Comment


# Create your views here.
class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id}, status=HTTP_200_OK)


class PostViewSets(viewsets.ModelViewSet):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()


class CommentView(CreateAPIView):
    serializer_class = CommentSerializers
    permission_classes = (IsAuthenticated,)
    queryset = Comment.objects.all()


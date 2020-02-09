from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializers
from .models import Post


# Create your views here.
class PostViewSets(viewsets.ModelViewSet):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
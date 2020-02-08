from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PostSerializers
from .models import Post


# Create your views here.
class PostViewSets(viewsets.ModelViewSet):
    serializer_class = PostSerializers
    queryset = Post.objects.all()
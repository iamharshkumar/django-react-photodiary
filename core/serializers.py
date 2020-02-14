from rest_framework import serializers
from .models import Post, Comment


class CommentSerializers(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('author', 'comment')

    def get_author(self, obj):
        return obj.author.username


class PostSerializers(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'post_name', 'image', 'description', 'comments')

    def get_comments(self, obj):
        c_qs = Comment.objects.filter(post_id=obj.id)
        comments = CommentSerializers(c_qs, many=True).data
        return comments

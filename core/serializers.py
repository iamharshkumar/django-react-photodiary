from rest_framework import serializers
from .models import Post, Comment


class CommentSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('author', 'user', 'comment', 'post')

    def get_user(self, obj):
        return str(obj.author.user.username)


class PostSerializers(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'post_name', 'image', 'description', 'comments')

    def get_comments(self, obj):
        c_qs = Comment.objects.filter(post_id=obj.id)
        comments = CommentSerializers(c_qs, many=True).data
        return comments

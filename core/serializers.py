from rest_framework import serializers
from .models import Post, Comment, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user', 'first_name', 'last_name', 'profile_pic')


class CommentSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('author', 'user', 'comment', 'post', 'profile_pic')

    def get_user(self, obj):
        return str(obj.author.user.username)

    def get_profile_pic(self, obj):
        return str(obj.author.profile_pic)


class PostSerializers(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'post_name', 'image', 'description', 'comments')

    def get_comments(self, obj):
        c_qs = Comment.objects.filter(post_id=obj.id)
        comments = CommentSerializers(c_qs, many=True).data
        return comments

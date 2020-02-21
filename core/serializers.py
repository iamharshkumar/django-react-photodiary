from rest_framework import serializers
from .models import Post, Comment, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = (
            'user', 'username', 'first_name', 'last_name', 'profile_pic', 'following_count', 'followers_count',
            'is_following', 'posts')

    def get_is_following(self, obj):
        is_following = False
        context = self.context
        request = context.get("request")
        if request:
            user = request.user
            is_following = user in obj.followers.all()
        return is_following

    def get_posts(self, obj):
        p_qs = Post.objects.filter(user=obj.id)
        posts = PostSerializers(p_qs, many=True).data
        return posts

    def get_username(self, obj):
        return obj.user.username

    def get_following_count(self, obj):
        return obj.user.following.count()

    def get_followers_count(self, obj):
        return obj.followers.count()


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

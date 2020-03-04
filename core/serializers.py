from rest_framework import serializers
from .models import Post, Comment, UserProfile, User


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'profile')

    def get_profile(self, obj):
        qs = UserProfile.objects.get(user__username=obj.username)
        return UserProfileSerializer(qs).data


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
        p_qs = Post.objects.filter(user=obj.id).order_by('-created')
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
    likes_count = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'author', 'post_name', 'image', 'description', 'likes_count', 'is_like', 'comments')

    def get_is_like(self, obj):
        is_like = False
        context = self.context
        request = context.get("request")
        # print(request)
        if request:
            user = request.user
            is_like = user in obj.likes.all()
        return is_like

    def get_author(self, obj):
        return obj.user.user.username

    def get_comments(self, obj):
        c_qs = Comment.objects.filter(post_id=obj.id)
        comments = CommentSerializers(c_qs, many=True).data
        return comments

    def get_likes_count(self, obj):
        return obj.likes.all().count()

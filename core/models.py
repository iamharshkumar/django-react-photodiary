from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# Create your models here.
# class PostLike(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     post = models.ForeignKey("Post", on_delete=models.CASCADE)
#     timestamp = models.DateTimeField(auto_now_add=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pix', null=True, blank=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True)

    def __str__(self):
        return self.user.username

    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)

    post_save.connect(create_user_profile, sender=User)


class Post(models.Model):
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    post_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='PostPic/', null=False, blank=False)
    likes = models.ManyToManyField(User, related_name='post_user', blank=True)
    description = models.CharField(max_length=500)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.post_name


class Comment(models.Model):
    author = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    post = models.ForeignKey('Post', related_name="comments", on_delete=models.CASCADE)

    def __str__(self):
        return self.comment

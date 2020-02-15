from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pix', null=True, blank=True)

    def __str__(self):
        return self.first_name + self.last_name


class Post(models.Model):
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    post_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='PostPic/', null=False, blank=False)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.post_name


class Comment(models.Model):
    author = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    post = models.ForeignKey('Post', related_name="comments", on_delete=models.CASCADE)

    def __str__(self):
        return self.comment


from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from io import BytesIO
from PIL import Image
from django.core.files import File


# Create your models here.

def compress(image):
    im = Image.open(image)
    # create a BytesIO object
    im_io = BytesIO()
    # save image to BytesIO object
    im.save(im_io, 'JPEG', quality=15)
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pix', null=True, blank=True)
    # bio = models.CharField(max_length=500, null=True, blank=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        # call the compress function
        new_image = compress(self.profile_pic)
        # set self.image to new_image
        self.image = new_image
        # save
        super().save(*args, **kwargs)

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
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post_name

    def save(self, *args, **kwargs):
        # call the compress function
        new_image = compress(self.image)
        # set self.image to new_image
        self.image = new_image
        # save
        super().save(*args, **kwargs)


class Comment(models.Model):
    author = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    post = models.ForeignKey('Post', related_name="comments", on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment

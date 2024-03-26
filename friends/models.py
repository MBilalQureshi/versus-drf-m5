from django.db import models
from django.contrib.auth.models import User


class Friend(models.Model):
    """
    Friend model, related to 'owner' and 'request'.
    'owner' is a User that is request sender to a User.
    'request' is a User that is recieving request by 'owner'.
    We need the related_name attribute so that django can differentiate.
    between 'owner' and 'request' who both are User model instances.
    'unique_together' makes sure a user can't 'double follow' the same user.
    """
    owner = models.ForeignKey(
        User, related_name='request_sender', on_delete=models.CASCADE
    )
    request = models.ForeignKey(
        User, related_name='request_reciever', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'request']

    def __str__(self):
        return f'{self.owner} {self.request}'
from django.db import models
from django.contrib.auth.models import User
from products.models import Product


class Vote(models.Model):
    """
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    up_vote = models.BooleanField(default=False)
    down_vote = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'product']

    def __str__(self):
        return f'{self.owner} {self.product}'
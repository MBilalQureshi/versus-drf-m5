from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    """
    Product(Post) model, related to 'owner', i.e. a User instance.
    """
    CATEGORIES = [
    (0, 'Others'),
    (1, 'Electronics'),
    (2, 'Clothing'),
    (3, 'Books'),
    (4, 'Home & Kitchen'),
    (5, 'Sports & Outdoors'),
    (6, 'Beauty & Personal Care'),
    (7, 'Health & Wellness'),
    (8, 'Toys & Games'),
    (9, 'Automotive'),
    (10, 'Food & Grocery'),
    (11, 'Furniture'),
    (12, 'Office & Stationery'),
    (13, 'Pets'),
    (14, 'Tools & Home Improvement'),
    (15, 'Travel & Luggage'),
    (16, 'Musical Instruments'),
    (17, 'Baby & Kids'),
    (18, 'Jewelry & Watches'),
    (19, 'Art & Crafts'),
    (20, 'Garden & Outdoor Living'),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='images/', default='../default_post_vzxkyq', blank=True
    )
    category = models.IntegerField(choices=CATEGORIES, default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=False)
    location = models.CharField(max_length=80, blank=False)
    category_name = models.CharField(max_length=100)
    privacy = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'

    def save(self, *args, **kwargs):
        self.category_name = dict(self.CATEGORIES).get(self.category)
        super().save(*args, **kwargs)
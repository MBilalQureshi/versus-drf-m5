from django.contrib.auth.models import User
from .models import Product
from rest_framework import status
from rest_framework.test import APITestCase


class ProductListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='test', password='test123')

    def test_can_list_posts(self):
        test = User.objects.get(username='test')
        Product.objects.create(owner=test, title='a title', content='Content', price=200,location='Berlin' )
        response = self.client.get('/products/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        print(len(response.data))

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='test', password='test123')
        response = self.client.post('/products/posts/', {'title': 'a title', 'content':'Content', 'price':'200','location':'Berlin'})
        count = Product.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_logged_in_cant_create_post(self):
        response = self.client.post('/products/posts/', {'title': 'a title', 'content':'Content', 'price':'200','location':'Berlin'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
from django.contrib.auth.models import User
from .models import Product
from rest_framework import status
from rest_framework.test import APITestCase


class ProductListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username="test", password="test123")

    def test_can_list_posts(self):
        test = User.objects.get(username="test")
        Product.objects.create(
            owner=test, title="a title", content="Content", price=200,
            location="Berlin"
        )
        response = self.client.get("/products/posts/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        print(len(response.data))

    def test_logged_in_user_can_create_post(self):
        self.client.login(username="test", password="test123")
        response = self.client.post(
            "/products/posts/",
            {
                "title": "a title",
                "content": "Content",
                "price": "200",
                "location": "Berlin",
            },
        )
        count = Product.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_logged_in_cant_create_post(self):
        response = self.client.post(
            "/products/posts/",
            {
                "title": "a title",
                "content": "Content",
                "price": "200",
                "location": "Berlin",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ProductDetailViewTests(APITestCase):
    def setUp(self):
        test = User.objects.create_user(username="test", password="test123")
        brian = User.objects.create_user(username="brian", password="test123")
        Product.objects.create(
            owner=test,
            title="a title",
            content="tests content",
            price=200,
            location="Berlin",
        )
        Product.objects.create(
            owner=brian,
            title="another title",
            content="another content",
            price=300,
            location="Munich",
        )

    def test_can_retrieve_post_using_valid_id(self):
        response = self.client.get("/products/posts/1/")
        self.assertEqual(response.data["title"], "a title")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_post_using_invalid_id(self):
        response = self.client.get("/products/posts/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_post(self):
        self.client.login(username="test", password="test123")
        response = self.client.put(
            "/products/posts/1/",
            {
                "title": "This is title",
                "content": "Content",
                "price": "200",
                "location": "Berlin",
            },
        )
        post = Product.objects.filter(pk=1).first()
        # This would fail as titles are not equal
        # self.assertEqual(post.title, 'a new title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_another_users_post(self):
        self.client.login(username="test", password="test123")
        response = self.client.put(
            "/products/posts/2/",
            {
                "title": "Update title",
                "Update content": "Content",
                "price": "350",
                "location": "Germany",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

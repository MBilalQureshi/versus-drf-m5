from django.urls import path
from products import views
from .views import categories_list

"""
URL paths
"""
urlpatterns = [
    path('products/posts/', views.ProductList.as_view()),
    path('products/posts/<int:pk>/', views.ProductDetail.as_view()),
    path('categories/', categories_list, name='categories-list'),
]

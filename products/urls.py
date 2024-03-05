from django.urls import path
from products import views
from .views import categories_list

urlpatterns = [
    path('products/', views.ProductList.as_view()),
    path('products/<int:pk>/', views.ProductDetail.as_view()),
    path('categories/', categories_list, name='categories-list'),
]
from rest_framework import generics, filters, permissions
from .models import Product
from .serializers import ProductSerializer
from versus_drf_api.permissions import IsOwnerOrReadOnly

class ProductList(generics.ListCreateAPIView):
    '''
    List all Products data
    '''
    serializer_class = ProductSerializer
    # so that only authenticated user can create product
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = Product.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Product data can be updated/deleted the products owner is
    logged in user
    '''
    # ISSUE: in case of 404 the fields are still showing
    queryset = Product.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProductSerializer


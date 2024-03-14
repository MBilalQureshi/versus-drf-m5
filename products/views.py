from django.db.models import Count
from rest_framework import generics, filters, permissions
from .models import Product
from .serializers import ProductSerializer
from versus_drf_api.permissions import IsOwnerOrReadOnly
from django.http import JsonResponse
from django.db.models import Count, Case, When, IntegerField, F
from django_filters.rest_framework import DjangoFilterBackend

class ProductList(generics.ListCreateAPIView):
    '''
    List all Products data
    '''
    serializer_class = ProductSerializer
    # so that only authenticated user can create product
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    # queryset = Product.objects.all()
    queryset = Product.objects.annotate(
        up_votes_count=Count(Case(When(vote__up_vote=True, then=1), output_field=IntegerField()), distinct=True),
        down_votes_count=Count(Case(When(vote__down_vote=True, then=1), output_field=IntegerField()), distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')

    # Annotate up_votes_count with a different alias
    queryset = queryset.annotate(
        total_up_votes=Count(Case(When(vote__up_vote=True, then=1), output_field=IntegerField()))
    )
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]

    search_fields = [
        'owner__username',
        'title',
        'price',
        'category_name',
        'location',
        'content',
        'created_at',
        # Product.CATEGORIES,
    ]

    ordering_fields = [
        'up_votes_count',
        'comments_count',
        'down_votes_count',
        # 'votes__created_at',
    ]
    # posts current user had voted on
    # profiles current user had voted on
    # your top five best wor
    filterset_fields = [
        "vote__owner__profile"
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Product data can be updated/deleted the products owner is
    logged in user
    '''
    # ISSUE: in case of 404 the fields are still showing
    # queryset = Product.objects.all()
    queryset = Product.objects.annotate(
        up_votes_count=Count(Case(When(vote__up_vote=True, then=1), output_field=IntegerField()), distinct=True),
        down_votes_count=Count(Case(When(vote__down_vote=True, then=1), output_field=IntegerField()), distinct=True),
        comments_count=Count('comment', distinct=True),
    ).order_by('-created_at')
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProductSerializer

def categories_list(request):
    categories = dict(Product.CATEGORIES)
    return JsonResponse(categories)
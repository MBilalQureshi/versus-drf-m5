from django.db.models import Count
from rest_framework import generics, filters, permissions
from django.db.models.functions import Coalesce  
from .models import Product
from .serializers import ProductSerializer
from versus_drf_api.permissions import IsOwnerOrReadOnly
from django.http import JsonResponse
from django.db.models import Count, Case, When, IntegerField, Subquery, OuterRef
from django_filters.rest_framework import DjangoFilterBackend
from votes.models import Vote
from friends.models import Friend  # Import the Friend model
from django.db.models import Q

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
    # up_votes_subquery = Vote.objects.filter(product=OuterRef('pk'), up_vote=True).values('product').annotate(up_vote_count=Count('pk')).values('up_vote_count')
    # # up_votes_count = Coalesce(up_votes_subquery, 0)
    # queryset = Product.objects.annotate(
    #     up_votes_count=Coalesce(Subquery(up_votes_subquery, output_field=IntegerField()),0),
    #     down_votes_count=Count(Case(When(vote__down_vote=True, then=1), output_field=IntegerField()), distinct=True),
    #     comments_count=Count('comment', distinct=True)
    # ).order_by('-created_at')

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
        "vote__owner__profile",
        'owner__profile',
    ]
    def get_queryset(self):
        # Get the current user
        user = self.request.user
        up_votes_subquery = Vote.objects.filter(product=OuterRef('pk'), up_vote=True).values('product').annotate(up_vote_count=Count('pk')).values('up_vote_count')
        

        # Get all products where either privacy is False or the owner is the current user or the owner is a friend
        if user.is_authenticated:
            # Get the friends of the current user
            friends = Friend.objects.filter(owner=user)

            # Get the IDs of the users who are friends with the current user
            friend_ids = friends.values_list('request__id', flat=True)
            queryset = Product.objects.filter(
                Q(privacy=False) | Q(owner=user) | Q(owner_id__in=friend_ids)
            ).annotate(
                up_votes_count=Coalesce(Subquery(up_votes_subquery, output_field=IntegerField()),0),
                down_votes_count=Count(Case(When(vote__down_vote=True, then=1), output_field=IntegerField()), distinct=True),
                comments_count=Count('comment', distinct=True)
            ).order_by('-created_at')
        else:
            queryset = Product.objects.filter(Q(privacy=False)).annotate(
                up_votes_count=Coalesce(Subquery(up_votes_subquery, output_field=IntegerField()),0),
                down_votes_count=Count(Case(When(vote__down_vote=True, then=1), output_field=IntegerField()), distinct=True),
                comments_count=Count('comment', distinct=True)
            ).order_by('-created_at')

        return queryset
        
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Product data can be updated/deleted the products owner is
    logged in user
    '''
    # ISSUE: in case of 404 the fields are still showing
    # queryset = Product.objects.all()
    up_votes_subquery = Vote.objects.filter(product=OuterRef('pk'), up_vote=True).values('product').annotate(up_vote_count=Count('pk')).values('up_vote_count')
    queryset = Product.objects.annotate(
        up_votes_count=Subquery(up_votes_subquery, output_field=IntegerField()),
        down_votes_count=Count(Case(When(vote__down_vote=True, then=1), output_field=IntegerField()), distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProductSerializer

def categories_list(request):
    categories = dict(Product.CATEGORIES)
    return JsonResponse(categories)
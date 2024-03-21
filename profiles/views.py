from django.db.models import Count,IntegerField, Subquery, OuterRef, IntegerField
from django.db.models.functions import Coalesce  
from rest_framework import generics, filters
from .models import Profile
from .serializers import ProfileSerializer
from versus_drf_api.permissions import IsOwnerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from votes.models import Vote

class ProfileList(generics.ListAPIView):
    '''
    List all profiles data
    '''
    queryset = Profile.objects.annotate(
        posts_count=Count('owner__product', distinct=True),
        total_upvotes=Coalesce(Subquery(
            Vote.objects.filter(product__owner=OuterRef('owner'), up_vote=True)
                        .values('product__owner')
                        .annotate(total_upvotes=Count('pk'))
                        .values('total_upvotes')
        ), 0)
    ).order_by('-total_upvotes')
    serializer_class = ProfileSerializer
    filter_backends = [filters.OrderingFilter]
    serializer_class = ProfileSerializer

    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    ordering_fields = [
        'posts_count',
        'total_upvotes',
    ]

class ProfileDetail(generics.RetrieveUpdateAPIView):
    '''
    Profile data can be updated if owner
    '''
    queryset = Profile.objects.annotate(
        posts_count=Count('owner__product', distinct=True),
        total_upvotes=Coalesce(Subquery(
            Vote.objects.filter(owner=OuterRef('owner'), up_vote=True)
                        .values('owner')
                        .annotate(total_upvotes=Count('pk'))
                        .values('total_upvotes')
        ), 0)
    ).order_by('-created_at')
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProfileSerializer


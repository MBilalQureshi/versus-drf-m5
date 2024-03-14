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
        posts_count = Count('owner__product', distict=True)
    ).order_by('-created_at')
    serializer_class = ProfileSerializer

    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    def get_queryset(self):
        queryset = super().get_queryset()        
        up_votes_subquery = Vote.objects.filter(product=OuterRef('owner__product'), up_vote=True).values('product').annotate(up_vote_count=Count('pk')).values('up_vote_count')
        queryset = queryset.annotate(
            total_upvotes=Coalesce(Subquery(up_votes_subquery, output_field=IntegerField()), 0),
        ).order_by('-created_at')
        return queryset

    ordering_fields = [
        'posts_count',
        'total_upvotes',
        # As these are regular database fields, I  don’t need to add them to the queryset,  
        # but I still have to add them  to the ordering_fields list.
        # 'owner__following__created_at',
        # 'owner__followed__created_at'
    ]

class ProfileDetail(generics.RetrieveUpdateAPIView):
    '''
    Profile data can be updated if owner
    '''
    # ISSUE: in case of 404 the fields are still showing
    # can't logout so downgraded to django 4.2.3 ---remove this line later
    # queryset = Profile.objects.all()
    queryset = Profile.objects.annotate(
        posts_count = Count('owner__product', distict=True)
    ).order_by('-created_at')
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProfileSerializer


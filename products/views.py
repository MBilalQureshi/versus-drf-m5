from django.db.models import IntegerField, Subquery, OuterRef
from rest_framework import generics, filters, permissions
from django.db.models.functions import Coalesce
from .models import Product
from .serializers import ProductSerializer
from versus_drf_api.permissions import IsOwnerOrReadOnly
from django.http import JsonResponse
from django.db.models import Count, Case, When
from django_filters.rest_framework import DjangoFilterBackend
from votes.models import Vote
from friends.models import Friend
from django.db.models import Q


class ProductList(generics.ListCreateAPIView):
    """
    List all Products data and create new
    product post as logged in user
    """

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]

    search_fields = [
        "owner__username",
        "title",
        "price",
        "category_name",
        "location",
        "content",
        "created_at",
    ]

    ordering_fields = [
        "up_votes_count",
        "comments_count",
        "down_votes_count",
    ]

    filterset_fields = [
        "vote__owner__profile",
        "owner__profile",
    ]
    """
    Chat gpt helped in making this query set
    Showing only those post that are public and private to those
    who is friend with current user only
    """

    def get_queryset(self):
        user = self.request.user
        up_votes_subquery = (
            Vote.objects.filter(product=OuterRef("pk"), up_vote=True)
            .values("product")
            .annotate(up_vote_count=Count("pk"))
            .values("up_vote_count")
        )
        if user.is_authenticated:
            friends = Friend.objects.filter(owner=user)
            friend_ids = friends.values_list("request__id", flat=True)
            queryset = (
                Product.objects.filter(
                    Q(privacy=False) | Q(owner=user)
                                     | Q(owner_id__in=friend_ids))
                .annotate(
                    up_votes_count=Coalesce(
                        Subquery(up_votes_subquery,
                                 output_field=IntegerField()), 0),
                    down_votes_count=Count(
                        Case(
                            When(vote__down_vote=True, then=1),
                            output_field=IntegerField(),
                        ),
                        distinct=True,
                    ),
                    comments_count=Count("comment", distinct=True),
                )
                .order_by("-created_at")
            )
        else:
            queryset = (
                Product.objects.filter(Q(privacy=False))
                .annotate(
                    up_votes_count=Coalesce(
                        Subquery(up_votes_subquery,
                                 output_field=IntegerField()), 0),
                    down_votes_count=Count(
                        Case(
                            When(vote__down_vote=True, then=1),
                            output_field=IntegerField(),
                        ),
                        distinct=True,
                    ),
                    comments_count=Count("comment", distinct=True),
                )
                .order_by("-created_at")
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Product data can be updated/deleted if the products owner is
    logged in user
    """

    def get_queryset(self):
        user = self.request.user
        up_votes_subquery = (
            Vote.objects.filter(product=OuterRef("pk"), up_vote=True)
            .values("product")
            .annotate(up_vote_count=Count("pk"))
            .values("up_vote_count")
        )
        if user.is_authenticated:
            friends = Friend.objects.filter(owner=user)
            friend_ids = friends.values_list("request__id", flat=True)
            queryset = (
                Product.objects.filter(
                    Q(privacy=False) | Q(owner=user)
                    | Q(owner_id__in=friend_ids))
                .annotate(
                    up_votes_count=Coalesce(
                        Subquery(up_votes_subquery,
                                 output_field=IntegerField()), 0),
                    down_votes_count=Count(
                        Case(
                            When(vote__down_vote=True, then=1),
                            output_field=IntegerField(),
                        ),
                        distinct=True,
                    ),
                    comments_count=Count("comment", distinct=True),
                )
                .order_by("-created_at")
            )
        else:
            queryset = (
                Product.objects.filter(Q(privacy=False))
                .annotate(
                    up_votes_count=Coalesce(
                        Subquery(up_votes_subquery,
                                 output_field=IntegerField()), 0),
                    down_votes_count=Count(
                        Case(
                            When(vote__down_vote=True, then=1),
                            output_field=IntegerField(),
                        ),
                        distinct=True,
                    ),
                    comments_count=Count("comment", distinct=True),
                )
                .order_by("-created_at")
            )

        return queryset

    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProductSerializer


def categories_list(request):
    categories = dict(Product.CATEGORIES)
    return JsonResponse(categories)

from rest_framework import serializers
from .models import Product
from votes.models import Vote


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model
    """
    is_owner = serializers.SerializerMethodField()
    owner = serializers.ReadOnlyField(source='owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    up_vote_id = serializers.SerializerMethodField()
    down_vote_id = serializers.SerializerMethodField()
    up_votes_count = serializers.ReadOnlyField()
    down_votes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    category_name = serializers.CharField(source='get_category_display',
                                          read_only=True)

    def get_up_vote_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Vote.objects.filter(
                owner=user, product=obj, up_vote=True
            ).first()
            return like.id if like else None
        return None

    def get_down_vote_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Vote.objects.filter(
                owner=user, product=obj, down_vote=True
            ).first()
            return like.id if like else None
        return None

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def validate_image(self, value):
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                "Image size larger than 2MB!"
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                "Image width larger tha 4096px!"
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                "Image height larger tha 4096px!"
            )
        return value

    class Meta:
        model = Product
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'category', 'content', 'image', 'up_vote_id',
            'down_vote_id', 'category_name', 'up_votes_count',
            'down_votes_count', 'comments_count', 'price',
            'location', 'privacy'
        ]

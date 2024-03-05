from rest_framework import serializers
from .models import Product
from votes.models import Vote

class ProductSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    owner = serializers.ReadOnlyField(source = 'owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    up_vote_id = serializers.SerializerMethodField()
    down_vote_id = serializers.SerializerMethodField()

    def get_up_vote_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Vote.objects.filter(
                # see if currently logged in user is the user who liked the post we are trying to retrieve
                owner=user, product=obj, up_vote=True
            ).first()
            return like.id if like else None
        return None
    
    def get_down_vote_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Vote.objects.filter(
                # see if currently logged in user is the user who liked the post we are trying to retrieve
                owner=user, product=obj, down_vote=True
            ).first()
            return like.id if like else None
        return None

    def get_is_owner(self, obj):
        request = self.context['request']
        # Logged in as admin, Admin == Admin 2 hence is_owner = False
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
            'title', 'category' ,'content', 'image','up_vote_id',
            'down_vote_id'
        ]
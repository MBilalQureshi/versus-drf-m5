from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    owner = serializers.ReadOnlyField(source = 'owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    

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
            'title', 'content', 'image'
        ]
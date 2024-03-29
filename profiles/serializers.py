from rest_framework import serializers
from .models import Profile
from votes.models import Vote
from friends.models import Friend


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer of Profile model
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    posts_count = serializers.ReadOnlyField()
    total_up_votes_given = serializers.SerializerMethodField()
    total_up_votes_received = serializers.SerializerMethodField()
    total_down_votes_given = serializers.SerializerMethodField()
    total_down_votes_received = serializers.SerializerMethodField()
    total_upvotes = serializers.ReadOnlyField()
    sender_id = serializers.SerializerMethodField()

    def get_sender_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Friend.objects.filter(
                owner=user, request=obj.owner
            ).first()
            return following.id if following else None
        return None

    def get_total_up_votes_given(self, obj):
        user_votes = Vote.objects.filter(owner=obj.owner)
        total_upvotes = user_votes.filter(up_vote=True).count()
        return total_upvotes

    def get_total_up_votes_received(self, obj):
        user_posts = obj.owner.product_set.all()
        total_upvotes = 0
        for post in user_posts:
            upvotes_for_post = Vote.objects.filter(product=post,
                                                   up_vote=True).count()
            total_upvotes += upvotes_for_post
        return total_upvotes

    def get_total_down_votes_given(self, obj):
        user_votes = Vote.objects.filter(owner=obj.owner)
        total_downvotes = user_votes.filter(down_vote=True).count()
        return total_downvotes

    def get_total_down_votes_received(self, obj):
        user_posts = obj.owner.product_set.all()
        total_downvotes = 0
        for post in user_posts:
            downvotes_for_post = Vote.objects.filter(product=post,
                                                     down_vote=True).count()
            total_downvotes += downvotes_for_post
        return total_downvotes

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'content',
            'image', 'is_owner', 'posts_count', 'total_upvotes',
            'total_up_votes_given', 'total_up_votes_received',
            'total_down_votes_given', 'total_down_votes_received', 'sender_id'
        ]

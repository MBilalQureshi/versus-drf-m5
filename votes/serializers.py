from rest_framework import serializers
from .models import Vote
from django.db import IntegrityError

class VoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    def validate(self, attrs):
        """
        Validate if up-vote is active there should be no down-vote and vice versa.
        """
        up_vote = attrs.get('up_vote')
        down_vote = attrs.get('down_vote')

        if up_vote and down_vote:
            raise serializers.ValidationError("Kindly select only one, upvote or downvote")

        if not up_vote and not down_vote:
            raise serializers.ValidationError("Kindly select upvote or downvote")
        return attrs

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'You cannot vote again on same product, Kindly update or delete ypur current vote on product'
            })

    class Meta:
        model = Vote
        fields = ['id', 'created_at', 'owner', 'product', 'up_vote', 'down_vote']


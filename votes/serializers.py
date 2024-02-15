from rest_framework import serializers
from .models import Vote
from django.db import IntegrityError

class VoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    # Note: We don't need a get_is_owner method here because we don't need to know if the currently logged in user is the owner of a like.

    # Make sure 
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

    # Now to make sure user dosn't like same post more than 1 time
    def create(self, validated_data):
        try:
            # This create method is on the model serializer  and for that reason I had to call “super()”.
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'You cannot vote again on same product, Kindly update or delete ypur current vote on product'
            })

    class Meta:
        model = Vote
        fields = ['id', 'created_at', 'owner', 'product', 'up_vote', 'down_vote']


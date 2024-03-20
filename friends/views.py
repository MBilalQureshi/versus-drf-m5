from rest_framework import permissions, generics
from versus_drf_api.permissions import IsOwnerOrReadOnly
from .serializers import FriendSerializer
from .models import Friend

class FriendList(generics.ListCreateAPIView):
    """
    List all followers, i.e. all instances of a user
    following another user'.
    Create a follower, i.e. follow a user if logged in.
    Perform_create: associate the current logged in user with a follower.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FriendDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a follower
    No Update view, as we either follow or unfollow users
    Destroy a follower, i.e. unfollow someone if owner
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()
from rest_framework import permissions, generics
from versus_drf_api.permissions import IsOwnerOrReadOnly
from .serializers import FriendSerializer
from .models import Friend


class FriendList(generics.ListCreateAPIView):
    """
    List all friends, i.e. all instances of a user
    send friend requests to another user'.
    Create a friend, i.e. befriend a user if logged in.
    Perform_create: associate the current logged in user
    with a request reciever.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FriendDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a request reciever
    No Update view, as we either friend or unfriend users
    Destroy a request reciever, i.e. unfriend someone if owner
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

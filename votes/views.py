from rest_framework import generics, permissions
from versus_drf_api.permissions import IsOwnerOrReadOnly
from .models import Vote
from .serializers import VoteSerializer

class VoteList(generics.ListCreateAPIView):
    """
    List Vote or create a Vote if logged in.
    """
    serializer_class = VoteSerializer
    # we don't want anonymous users to vote
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Vote.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class VoteDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()
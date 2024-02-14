from rest_framework import generics, permissions
from versus_drf_api.permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer

class CommentList(generics.ListCreateAPIView):
    """
    List comments or create a comment if logged in.
    """
    serializer_class = CommentSerializer
    # we don't want anonymous users to comment
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
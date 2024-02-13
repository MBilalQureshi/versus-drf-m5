from rest_framework import generics, filters
from .models import Profile
from .serializers import ProfileSerializer
from versus_drf_api.permissions import IsOwnerOrReadOnly

class ProfileList(generics.ListAPIView):
    '''
    List all profiles data
    '''
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileDetail(generics.RetrieveUpdateAPIView):
    '''
    Profile data can be updated if owner
    '''
    # ISSUE: in case of 404 the fields are still showing
    # can't logout so downgraded to django 4.2.3 ---remove this line later
    queryset = Profile.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProfileSerializer


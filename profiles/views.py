from rest_framework import generics, filters
from .models import Profile
from .serializers import ProfileSerializer

class ProfileList(generics.ListAPIView):
    '''
    List all profiles data
    '''
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileDetail(generics.RetrieveUpdateAPIView):
    '''
    '''
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


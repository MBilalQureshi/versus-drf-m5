from django.urls import path
from friends import views

"""
URL paths
"""
urlpatterns = [
    path('friends/',views.FriendList.as_view()),
    path('friends/<int:pk>/',views.FriendDetail.as_view())
]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('player-list/', views.playerList, name="player-list"),
    path('top10-players/', views.top10Players, name="top10-player"),
    path('add-player/', views.addPlayer, name="add-player"),
    path('get-random-words/total=<int:totalSampleAmount>/wrong=<int:wrongSampleAmount>', views.getRandomWords, name="get-random-words")

]

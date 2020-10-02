from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PlayerSerializer
from .models import Player
import csv, random, os, json

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Player List': '/player-list/',
        'Get Top 10 Players':'/top10-players/',
        'Adding Player':'/add-player/',
        'Getting Random Words':'get-random-words/total=TotalSample/wrong=WrongSample'

    }
    return Response(api_urls)

@api_view(['POST'])
def addPlayer(request):
	serializer = PlayerSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['GET'])
def playerList(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

# Helper function to set random words
def setRandomWords(totalSampleAmount, wrongSampleAmount):
    # Getting all the .csv data.
    currentDir = os.getcwd()

    with open(os.path.join(currentDir, 'memoryapi/various/words_list.csv'), 'r') as csvreader:
        wordList = list()
        randomWords = list()
        
        data = csv.reader(csvreader)
        for word in data:
            wordList.append(word[0])
        # Adding minus 1 to totalSampleAmount for accuracy in counting and preventing confusion
        wrongSampleAmount += 1
        randomWords = random.sample(wordList, totalSampleAmount)
        for i,_ in enumerate(randomWords):
            if i > totalSampleAmount-wrongSampleAmount:
                break
            else:
                try:
                    # Marking the correct ones
                    randomWords[i] = randomWords[i] + ':C'
                except IndexError:
                    continue
    return randomWords

@api_view(['GET'])
def getRandomWords(request, totalSampleAmount, wrongSampleAmount):
    return Response(setRandomWords(totalSampleAmount,wrongSampleAmount))
    


@api_view(['GET'])
def top10Players(request):
    players = Player.objects.order_by('-score')[:10]
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

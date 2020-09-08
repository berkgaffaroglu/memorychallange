from django.db import models
import csv,os

class Player(models.Model):
    countryList = list()
    currentDir = os.getcwd()
    with open(os.path.join(currentDir, 'memoryapi/various/countries.csv'), 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        for country in csvreader:
            for c in country:
                countryList.append((f'{c.strip()}',f'{c.strip()}'))
        countryList.pop()
    country = models.CharField(choices=countryList, default='America',max_length=100, blank=True, null=True)
    nickname = models.CharField(max_length=255)
    score = models.IntegerField()



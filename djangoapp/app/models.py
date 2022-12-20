from django.db import models

class Deck(models.Model):
    #user_id = models.ForeignKey(djangoapp., on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField();
    date_updated = models.DateTimeField();
    allow_forks = models.BooleanField(default=True)
    private = models.BooleanField(default=False)
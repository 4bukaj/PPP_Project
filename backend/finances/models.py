from django.db import models # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.utils import timezone


class Expenses(models.Model):
    Title = models.CharField(max_length=255)
    Amount = models.DecimalField(max_digits=10, decimal_places=2)
    Date = models.DateField()
    Category = models.CharField(max_length=50)
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    CreatedAt = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"{self.Title} - {self.Amount} - {self.Date} - {self.Category}- {self.User}"
    
class Kryptos(models.Model):
    Coin = models.CharField(max_length=120)
    Amount = models.FloatField() 
    Worth = models.DecimalField(max_digits=20, decimal_places=10)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    ImageUrl = models.CharField(max_length=255)
    CreatedAt = models.DateTimeField(default=timezone.now, editable=False)
    
    def _str_(self):
        return f"{self.Coin} - {self.Amount} - {self.Worth} - {self.UserID}"

class KryptoData(models.Model):
    details = models.JSONField()
    createdAt = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"KryptoData - {self.createdAt}"
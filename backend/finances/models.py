from django.db import models
from django.contrib.auth.models import User

class Finances(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
    
class Expenses(models.Model):
    Title = models.CharField(max_length=255)
    Amount = models.DecimalField(max_digits=10, decimal_places=2)
    Date = models.DateField()
    Category = models.CharField(max_length=50)
    User = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.ID} - {self.Title}"
    
    
class Expense(models.Model):
    Title = models.CharField(max_length=255)
    Amount = models.DecimalField(max_digits=10, decimal_places=2)
    Date = models.DateField()
    Category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.ID} - {self.Title}"
    
from django.db import models

# Create your models here.

class Finances(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
    
class Expense(models.Model):
    Title = models.CharField(max_length=255)
    Amount = models.DecimalField(max_digits=10, decimal_places=2)
    Date = models.DateField()
    Category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.ID} - {self.Title}"
    
from rest_framework import serializers
from .models import Finances, Expense, Expenses
from django.contrib.auth.models import User

# Ale jazdunia do JSON'a

class FinancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finances
        fields = '__all__'

class UserCheckSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'Title', 'Amount', 'Date', 'Category']
from rest_framework import serializers # type: ignore
from .models import Expenses, Kryptos
from django.contrib.auth.models import User # type: ignore

# Ale jazdunia do JSON'a

class KryptosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kryptos
        fields = ['id', 'Coin', 'Amount', 'Worth', 'UserID', 'ImageUrl', 'CreatedAt']

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

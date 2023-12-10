from rest_framework import serializers
from .models import Finances

class FinancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finances
        fields = '__all__'
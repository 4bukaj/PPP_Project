from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Finances
from .serializers import FinancesSerializer

# Create your views here.

@api_view(['GET'])
def getData(request):
    items = Finances.objects.all()
    serializer = FinancesSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = FinancesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
from rest_framework.response import Response # type: ignore
from rest_framework.decorators import api_view # type: ignore
from rest_framework import generics, status, authentication, permissions # type: ignore
from rest_framework.views import APIView # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.contrib.auth import authenticate # type: ignore
from .models import Expenses, Kryptos
from .serializers import UserSerializer, UserCheckSerializer, UserUpdateSerializer, ExpensesSerializer, KryptosSerializer

# Admin page: admin - zmitac123

# -------------------------------- User ------------------------------------
@api_view(['GET'])
def users_get_all(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def users_get(request):

    serializer = UserCheckSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid username or password.',
            }, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def users_register(request):
    email = request.data.get('email', '')
    username = request.data.get('email', '')
    password = request.data.get('password', '')

    existing_user_username = User.objects.filter(username=username).first()
    existing_user_email = User.objects.filter(email=email).first()

    if existing_user_username or existing_user_email:
        error_message = {}
        if existing_user_username:
            error_message['username'] = 'User with this username already exists.'
        if existing_user_email:
            error_message['email'] = 'User with this email already exists.'
            
        return Response({
            'error': error_message,
        }, status=status.HTTP_400_BAD_REQUEST)
    else:
        new_user = User.objects.create_user(username=username, password=password, email=email)

        return Response({
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
        }, status=status.HTTP_201_CREATED)

class UpdateUser(APIView):
    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        existing_user_with_email = User.objects.filter(email=request.data.get('email')).exclude(id=user_id).first()
        if existing_user_with_email:
            return Response({'error': 'Another user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        existing_user_with_username = User.objects.filter(username=request.data.get('username')).exclude(id=user_id).first()
        if existing_user_with_username:
            return Response({'error': 'Another user with this username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserUpdateSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListUsers(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# --------------------------------------------------------------------------

# ------------------------------- Expences ---------------------------------
class ExpensesList(generics.ListAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

class ExpensesListDeleteAll(generics.ListCreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    
    def delete(self, request, user_id, expense_id, *args, **kwargs):
        try:
            user_exists = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            expense = Expenses.objects.get(id=expense_id, User__id=user_id)
            serializer = self.get_serializer(expense)
            expense.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except Expenses.DoesNotExist:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ExpensesListGetExpenses(generics.ListCreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
 
    def get(self, request, user_id, format=None):
        try:
            user = User.objects.get(pk=user_id)
            expenses = Expenses.objects.filter(User=user)
            serializer = ExpensesSerializer(expenses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Expenses.DoesNotExist:
            return Response({"error": "Expenses not found for the specified user."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     

class ExpensesListCreate(generics.ListCreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('User', None)

        try:
            user_exists = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# --------------------------------------------------------------------------

# ------------------------------- Kryptos ---------------------------------    
class KryptosListCreateView(generics.ListCreateAPIView):
    queryset = Kryptos.objects.all()
    serializer_class = KryptosSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('UserID', None)

        try:
            user_exists = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class KryptosListView(generics.ListAPIView):
    queryset = Kryptos.objects.all()
    serializer_class = KryptosSerializer    

class KryptosForUserView(generics.ListAPIView):
    serializer_class = KryptosSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        try:
            user = User.objects.get(pk=user_id)
            return Kryptos.objects.filter(UserID=user)
        except User.DoesNotExist:
            return None

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            if queryset is not None:
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class KryptoDeleteView(generics.DestroyAPIView):
    queryset = Kryptos.objects.all()
    serializer_class = KryptosSerializer

    def destroy(self, request, user_id, krypto_id, *args, **kwargs):
        try:
            user = User.objects.get(pk=user_id)
            krypto = Kryptos.objects.get(id=krypto_id, UserID=user)
            deleted_data = KryptosSerializer(krypto).data
            krypto.delete()
            return Response(deleted_data, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Kryptos.DoesNotExist:
            return Response({"error": "Krypto not found for the specified user."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# --------------------------------------------------------------------------
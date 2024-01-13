from django.urls import path # type: ignore
from . import views
from .views import ListUsers, UpdateUser, ExpensesList, ExpensesListCreate, ExpensesListDeleteAll, ExpensesListGetExpenses, KryptosListCreateView, KryptosListView, KryptosForUserView, KryptoDeleteView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users/register/', views.users_register),
    path('users/get/all/', ListUsers.as_view()),
    path('users/get/', views.users_get),
    path('users/update/<int:user_id>/', UpdateUser.as_view()),
    path('users/get-token/', obtain_auth_token),

    path('expenses/all/', ExpensesList.as_view()),
    path('expenses/add/', ExpensesListCreate.as_view()),
    path('expenses/delete/<int:user_id>/<int:expense_id>/', ExpensesListDeleteAll.as_view()),
    path('expenses/user/<int:user_id>/', ExpensesListGetExpenses.as_view()),

    path('kryptos/add/', KryptosListCreateView.as_view(), name='kryptos-list-create'),
    path('kryptos/get/all/', KryptosListView.as_view(), name='kryptos-list'),
    path('kryptos/get/<int:user_id>/', KryptosForUserView.as_view(), name='kryptos-for-user'),
    path('kryptos/delete/<int:user_id>/<int:krypto_id>/', KryptoDeleteView.as_view(), name='krypto-delete')
]

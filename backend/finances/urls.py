from django.urls import path # type: ignore
from . import views
from .views import ListUsers, UpdateUser, ExpensesList, ExpensesListCreate, ExpensesListDelete, EditExpenseView, ExpensesListGetExpenses, KryptosListCreateView, KryptosListView, KryptosForUserView, KryptoDeleteView

urlpatterns = [
    path('users/register/', views.users_register),
    path('users/get/all/', ListUsers.as_view()),
    path('users/get/', views.users_get),
    path('users/update/<int:user_id>/', UpdateUser.as_view()),

    path('expenses/all/', ExpensesList.as_view()),
    path('expenses/add/', ExpensesListCreate.as_view()),
    path('expenses/delete/<int:expense_id>/', ExpensesListDelete.as_view()),
    path('expenses/edit/<int:pk>/', EditExpenseView.as_view(), name='edit-expense'),
    path('expenses/user/<int:user_id>/', ExpensesListGetExpenses.as_view()),

    path('kryptos/add/', KryptosListCreateView.as_view(), name='kryptos-list-create'),
    path('kryptos/get/all/', KryptosListView.as_view(), name='kryptos-list'),
    path('kryptos/get/<int:user_id>/', KryptosForUserView.as_view(), name='kryptos-for-user'),
    path('kryptos/delete/<int:user_id>/<int:krypto_id>/', KryptoDeleteView.as_view(), name='krypto-delete')
]

from django.urls import path
from . import views
from .views import ListUsers, UpdateUser, ExpensesList, ExpensesListCreate, ExpensesListDeleteAll, ExpensesListGetExpenses

urlpatterns = [
    path('all', views.getData),
    path('add/', views.addItem),
    path('users/register/', views.users_register),
    path('users/get/all/', ListUsers.as_view()),
    path('users/get/', views.users_get),
    path('users/update/<int:user_id>/', UpdateUser.as_view()),
    path('expenses/all/', ExpensesList.as_view()),
    path('expenses/add/', ExpensesListCreate.as_view()),
    path('expenses/delete/<int:user_id>/<int:expense_id>/', ExpensesListDeleteAll.as_view()),
    path('expenses/user/<int:user_id>/', ExpensesListGetExpenses.as_view())
]

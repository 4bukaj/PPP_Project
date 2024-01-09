from django.urls import path
from . import views
from .views import ListUsers, UpdateUser

urlpatterns = [
    path('all', views.getData),
    path('add/', views.addItem),
    path('expenses/all/', views.get_expenses),
    path('expenses/add/', views.add_expense),
    path('expenses/delete/<int:expense_id>/', views.delete_expense),
    path('users/register/', views.users_register),
    path('users/get/all/', ListUsers.as_view()),
    path('users/get/', views.users_get),
    path('users/update/<int:user_id>/', UpdateUser.as_view())
]

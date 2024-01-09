from django.contrib import admin
from .models import Finances, Expense

# Register your models here.

class FinancesAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('Title', 'Amount', 'Date', 'Category')

admin.site.register(Finances, FinancesAdmin)
admin.site.register(Expense, ExpenseAdmin)
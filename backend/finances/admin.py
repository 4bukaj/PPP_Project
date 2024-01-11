from django.contrib import admin # type: ignore
from .models import Expenses, Kryptos

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('Title', 'Amount', 'Date', 'Category', 'User')
    
class KryptoAdmin(admin.ModelAdmin):
    list_display = ('Coin', 'Amount', 'Worth', 'UserID')

admin.site.register(Expenses, ExpenseAdmin)
admin.site.register(Kryptos, KryptoAdmin)
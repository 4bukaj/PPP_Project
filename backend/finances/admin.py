from django.contrib import admin
from .models import Finances

# Register your models here.

class FinancesAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

admin.site.register(Finances, FinancesAdmin)
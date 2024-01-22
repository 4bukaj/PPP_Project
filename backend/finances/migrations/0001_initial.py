# Generated by Django 5.0 on 2024-01-22 22:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Expenses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=255)),
                ('Amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('Date', models.DateField()),
                ('Category', models.CharField(max_length=50)),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Kryptos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Coin', models.CharField(max_length=120)),
                ('Amount', models.FloatField()),
                ('Worth', models.DecimalField(decimal_places=10, max_digits=20)),
                ('ImageUrl', models.CharField(max_length=255)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('UserID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

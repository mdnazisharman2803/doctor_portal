# Generated by Django 5.0.7 on 2024-07-19 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor_id', models.CharField(max_length=8, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=64)),
                ('specialty', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'doctors',
            },
        ),
    ]
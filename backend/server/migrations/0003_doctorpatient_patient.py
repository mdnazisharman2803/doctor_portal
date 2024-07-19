# Generated by Django 5.0.7 on 2024-07-19 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_pdf'),
    ]

    operations = [
        migrations.CreateModel(
            name='DoctorPatient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor_id', models.CharField(max_length=8)),
                ('patient_id', models.CharField(max_length=8)),
            ],
            options={
                'db_table': 'doctor_patient_link',
            },
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_id', models.CharField(max_length=8, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(blank=True, max_length=64, null=True)),
            ],
            options={
                'db_table': 'patients',
            },
        ),
    ]
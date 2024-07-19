# Generated by Django 5.0.7 on 2024-07-19 18:15

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PDF',
            fields=[
                ('pdf_id', models.AutoField(primary_key=True, serialize=False)),
                ('doctor_user_id', models.CharField(max_length=8)),
                ('file_path', models.CharField(max_length=255)),
                ('upload_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.doctor')),
            ],
            options={
                'db_table': 'uploaded_documents',
            },
        ),
    ]
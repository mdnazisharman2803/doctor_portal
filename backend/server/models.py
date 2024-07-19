from django.db import models
from django.utils import timezone

class Doctor(models.Model):
    doctor_id = models.CharField(max_length=8, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=64) 
    specialty = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'doctors'

class PDF(models.Model):
    pdf_id = models.AutoField(primary_key=True)
    doctor_user_id = models.CharField(max_length=8) 
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)  
    file_path = models.CharField(max_length=255)
    upload_date = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'uploaded_documents'

class Patient(models.Model):
    patient_id = models.CharField(max_length=8, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=64,blank=True, null=True) 

    class Meta:
        db_table = 'patients'

class DoctorPatient(models.Model):
    doctor_id = models.CharField(max_length=8)
    patient_id = models.CharField(max_length=8)

    class Meta:
        db_table = 'doctor_patient_link'






from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Doctor,PDF,Patient,DoctorPatient
from .scripts import generate_token,generate_id
import traceback
import json
import os
from django.utils import timezone

@method_decorator(csrf_exempt, name='dispatch')
class Register(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')    
            name=data.get('name')      
            specialty=data.get('specialty', '')
            password = data.get('password')  
            if Doctor.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'error': 'Email already registered'}, status=400)                      
            doctor_id=generate_id("doctor")
            doctor = Doctor(doctor_id=doctor_id,name=name,email=email,password=password,specialty=specialty)
            doctor.save()
            return JsonResponse({'success': True, 'message': 'Doctor registered successfully', 'doctor_id': doctor_id}, status=200)       
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({"success": False, "message": str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class Login(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')         
            doctor = Doctor.objects.get(email=email)  
            if doctor.password != password:
                return JsonResponse({'success': False, 'error': 'Invalid email or password'}, status=400) 
            access_token=generate_token({'emaild': email})           
            return JsonResponse({'success': True, 'doctor_id': doctor.doctor_id, 'token':access_token}, status=200)        
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({"success": False, "message": str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class UploadPDF(View):
    def post(self, request):
        try:
            doctor_id = request.POST.get('doctor', '')
            if not doctor_id:
                return JsonResponse({"success": False, "message": "Doctor ID is required"}, status=400)               
            upload_dir = f"documents/{doctor_id}"
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)
            upload_file = request.FILES['file']
            file_name, file_extension = os.path.splitext(upload_file.name)
            count = 1
            file_path = os.path.join(upload_dir, f"{doctor_id}_{file_name}_{count}{file_extension}")
            while os.path.exists(file_path):
                count += 1
                file_path = os.path.join(upload_dir, f"{doctor_id}_{file_name}_{count}{file_extension}")
            with open(file_path, 'wb') as f:
                for chunk in upload_file.chunks():
                    f.write(chunk)
            doctor = Doctor.objects.get(doctor_id=doctor_id)      
            pdf = PDF(doctor_user_id=doctor_id, doctor=doctor, file_path=file_path, upload_date=timezone.now())
            pdf.save()
            return JsonResponse({"success": True, "message": "PDF uploaded and saved successfully"}, status=200)
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({"success": False, "message": str(e)}, status=500)       

@method_decorator(csrf_exempt, name='dispatch')
class LinkPatient(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            doctor_id = data.get('doctor_id')
            patient_name = data.get('name')
            patient_email = data.get('email')
            if not patient_name or not patient_email:
                return JsonResponse({'error': 'Patient name or email is missing'}, status=400)        
            if Patient.objects.filter(email=patient_name).exists():
                return JsonResponse({'success': False, 'error': 'Patient already linked with this email.'}, status=400)     
            patient_id=generate_id("patient")
            patient = Patient(patient_id=patient_id,name=patient_name,email=patient_email)
            patient.save()
            doctor_patient_link=DoctorPatient(doctor_id=doctor_id,patient_id=patient_id)
            doctor_patient_link.save()
            return JsonResponse({'message': 'Patient linked successfully'}, status=200)
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)


        
@method_decorator(csrf_exempt, name='dispatch')
class GetPatients(View):
    def get(self, request):
        try:
            doctor_id = request.GET.get('doctor_id')
            patients = Patient.objects.filter(
                patient_id__in=DoctorPatient.objects.filter(doctor_id=doctor_id).values_list('patient_id', flat=True)
            ).values('patient_id', 'name', 'email')
            patient_list = list(patients)
            return JsonResponse({'patients': patient_list}, safe=False)
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)


from django.urls import path
from .views import (
                    Login,
                    )

from django.urls import path
from .views import Register,Login,UploadPDF,LinkPatient,GetPatients
# from .views import Register,Login,UploadPDF,LinkPatient


urlpatterns = [
    path('register', Register.as_view(), name='register'),
    path('login', Login.as_view(), name='login'),
    path('upload',UploadPDF.as_view(),name='upload'),
    path('link_patient', LinkPatient.as_view(), name='link_patient'),
    path('get_patients', GetPatients.as_view(), name='get_patients'),
]

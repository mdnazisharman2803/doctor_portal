# Doctor Portal App

## Overview

The Doctor Portal App is a web application designed to facilitate doctors in managing their practice by allowing them to register, log in, upload important PDF files, and link their patients. This application ensures the uniqueness of uploaded files and provides a list of patients linked to a specific doctor.

## Tech Stack

- **Front-end**: HTML, CSS, JavaScript, React
- **Backend**: Python, Django, DRF
- **Database**: MySQL

## Pages

- **Auth Page**: Doctors can register or sign in.
- **Upload Document Page**: Doctors can upload PDF files here.
- **Patient Page**: Doctors can link their patients and view their details.

## Database

The application uses a MySQL database to store data.

## Endpoints

- **login**
  - **Method**: POST
  - **Request Parameters**: email, password (hashed)
  - **Response**: doctor_id and access token

- **register**
  - **Method**: POST
  - **Request Parameters**: name, email, specialty, password (hashed)
  - **Response**: success or error message

- **upload_document**
  - **Method**: POST
  - **Request Parameters**: file, doctor_id
  - **Response**: success or error message

- **link_patient**
  - **Method**: POST
  - **Request Parameters**: patient_name, patient_email, doctor_id
  - **Response**: success or error message

- **get_patients**
  - **Method**: GET
  - **Request Parameters**: doctor_id (sent in params)
  - **Response**: list of linked patients

## Models

- **Doctor**: Stores doctor’s data
- **UploadedPdf**: Stores uploaded PDF data linked to a doctor
- **Patient**: Stores patient’s data
- **DoctorPatient**: Stores linked patients of doctors

## App Flow

1. **Registration**: Doctors can register with a unique email address. An email address cannot be reused for registration.
2. **Login**: Doctors can log in using their credentials. Passwords are hashed on the frontend, and hashed passwords are stored in the database. The algorithm and secret key for encoding passwords are stored in `env.js` for enhanced security.
3. **Upload Documents**: Doctors can upload PDF files, which are stored in a documents folder with subfolders created based on the doctor's user ID. Each PDF file's name starts with the doctor ID to facilitate linking and avoid file overwriting issues.
4. **Link Patients**: Doctors can link their patients by filling out a form with patient details. The linked patients are displayed in a table.

## Demo Video

For a detailed demonstration, please watch the [demo video](https://drive.google.com/file/d/1IPn8bKbPGUvTNs2SGjjQR7JcXbKekvZ2/view?usp=sharing).

---


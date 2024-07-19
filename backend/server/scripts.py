import random
import string
import jwt
import os

def generate_id(user_type):
    prefix = {"doctor": 'd_', "patient": 'p_'}
    return prefix.get(user_type, '') + ''.join(random.choices(string.ascii_letters + string.digits, k=6))

def generate_token(payload):
    secret_key=os.getenv("SECRET_KEY")
    algorithm=os.getenv("ALGORITHM")
    encoded_token=jwt.encode(payload, secret_key, algorithm=algorithm)
    return encoded_token


def decode_access_token(token):
    secret_key = os.getenv("SECRET_KEY")
    algorithm=os.getenv("ALGORITHM")
    decoded_data = jwt.decode(token, secret_key, algorithms=algorithm)
    return decoded_data



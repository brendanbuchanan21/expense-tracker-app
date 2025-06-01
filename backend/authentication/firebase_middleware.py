import firebase_admin
from firebase_admin import credentials, auth
from django.http import JsonResponse
from rest_framework.authentication import BaseAuthentication
from django.conf import settings
import os
import json

# Only initialize Firebase once, and use different methods depending on the environment
if not firebase_admin._apps:
    if settings.DEBUG:
        # Development: Load credentials from local JSON file
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        firebase_credentials_path = os.path.join(project_root, 'secrets', 'firebase_admin_key.json')
        cred = credentials.Certificate(firebase_credentials_path)
    else:
        # Production: Load credentials from environment variable
        firebase_json = os.environ.get("FIREBASE_ADMIN_SDK")
        if firebase_json is None:
            raise ValueError("FIREBASE_ADMIN_SDK environment variable not set.")
        firebase_dict = json.loads(firebase_json)
        cred = credentials.Certificate(firebase_dict)

    firebase_admin.initialize_app(cred)

# Helper function to verify the token
def verify_firebase_token(token):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        return None

# Simple wrapper for user
class FirebaseWrapper: 
    def __init__(self, decoded_token):
        self.token = decoded_token
        self.uid = decoded_token.get('uid')
        self.is_authenticated = True

# Custom authentication class
class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None  # No token provided

        try:
            token = auth_header.split(" ")[1]  # Expecting 'Bearer <token>'
            decoded_token = verify_firebase_token(token)

            if decoded_token:
                if settings.DEBUG:
                    print(f"Decoded Firebase token: {decoded_token}")
                return (FirebaseWrapper(decoded_token), token)
            else:
                return None
        except IndexError:
            raise JsonResponse({"error": "authorization token format is incorrect"}, status=400)
        except Exception as e:
            if settings.DEBUG:
                print(f"Error during token verification: {e}")
            raise JsonResponse({"error": "Invalid or expired token"}, status=401)

import firebase_admin
from firebase_admin import credentials, auth
from django.http import JsonResponse
from rest_framework.authentication import BaseAuthentication
from django.conf import settings
import os
import json
import base64

# Only initialize Firebase once, and use different methods depending on the environment
if not firebase_admin._apps:
    if settings.DEBUG:
        # Dev: load from file
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        firebase_credentials_path = os.path.join(project_root, 'secrets', 'firebase_admin_key.json')
        cred = credentials.Certificate(firebase_credentials_path)
    else:
        # Prod: load from env var (base64 encoded JSON string)
        firebase_b64 = os.environ.get("FIREBASE_ADMIN_SDK")
        if not firebase_b64:
            raise ValueError("FIREBASE_ADMIN_SDK environment variable not set.")
        
        try:
            # Decode base64 to JSON string
            firebase_json = base64.b64decode(firebase_b64).decode('utf-8')
            # Parse JSON string to dict
            firebase_dict = json.loads(firebase_json)
            print("Firebase credentials loaded successfully in prod")
            cred = credentials.Certificate(firebase_dict)
        except Exception as e:
            print(f"Failed to parse Firebase credentials: {e}")
            raise ValueError(f"Failed to parse Firebase credentials from environment variable: {e}")

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
        print("🔥 FirebaseAuthentication hit")
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

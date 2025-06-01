import firebase_admin
from firebase_admin import credentials, auth
from django.http import JsonResponse
import os
from rest_framework.authentication import BaseAuthentication


project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

firebase_credentials_path = os.path.join(project_root, 'secrets', 'firebase_admin_key.json')

cred = credentials.Certificate(firebase_credentials_path)
firebase_admin.initialize_app(cred)

def verify_firebase_token(token):
    try:

        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        return None
    


class FirebaseWrapper: 
    def __init__(self, decoded_token):
        self.token = decoded_token
        self.uid = decoded_token.get('uid')
        self.is_authenticated = True




class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None  # No token, authentication not required

        try:
            token = auth_header.split(" ")[1]  # Extract the token from the Authorization header
            decoded_token = verify_firebase_token(token)  # Verify the token with Firebase

            if decoded_token:
                print(f"here is the decoded token: {decoded_token}")  # Debug output for decoded token
                return (FirebaseWrapper(decoded_token), token)  # Return decoded token and the raw token for later use
            else:
                return None  # Invalid or expired token
        except IndexError:
            raise JsonResponse({"error": "authorization token format is incorrect"}, status=400)
        except Exception as e:
            print(f"error during token verification: {e}")
            raise JsonResponse({"error": "Invalid or expired token"}, status=401)
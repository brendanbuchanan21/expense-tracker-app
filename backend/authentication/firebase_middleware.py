import firebase_admin
from firebase_admin import credentials, auth
from django.http import JsonResponse
import os


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
    

class FirebaseAuthenticationMiddleware: 
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):

        auth_header = request.headers.get("Authorization")

        if auth_header:
            try: 

                token = auth_header.split(" ")[1]
                decoded_token = verify_firebase_token(token)
                if decoded_token:

                    request.user = decoded_token
                else: 
                    return JsonResponse({"error": "Invalid or expired token"}, status=401)
            except IndexError: 
                return JsonResponse({"error": "authorization token format is incorrect"}, status=400)
            
        
        response = self.get_response(request)
        return response
# auth.py
from flask_httpauth import HTTPBasicAuth
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

auth = HTTPBasicAuth()

# Load admin credentials from environment variables
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# Dummy user data for demonstration purposes
users = {
    ADMIN_USERNAME: ADMIN_PASSWORD,
}

# Define the exempted websites
exempt_urls = os.getenv("EXEMPT_URLS")
if exempt_urls:
    EXEMPT_URLS = exempt_urls.split(",")
else:
    EXEMPT_URLS = []

@auth.verify_password
def verify_password(username, password):
    # Directly compare the provided password with the stored password
    if username in users and users.get(username) == password:
        return username
    return None

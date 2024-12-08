from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from Routes.routes import routes

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set a secret key for session management
app.secret_key = os.getenv("SECRET_KEY")

# Enable CORS for the specified origins
CORS(app)

# Register the blueprint
app.register_blueprint(routes)

# Only include this block if you want to run the development server directly
if __name__ == "__main__":
    app.run(debug=True)

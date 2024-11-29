from flask import Flask
from dotenv import load_dotenv
from Routes.routes import routes

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

# Register the blueprint
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True)
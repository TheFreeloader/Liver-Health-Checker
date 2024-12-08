from flask import Blueprint, Flask, request, jsonify
from flask_restx import Api
from flask_cors import CORS
from Routes.auth import auth, EXEMPT_URLS


# Import Namespace
from Routes.namespace import prediction_ns

# Prediction
from Dashboard.Prediction.make_prediction import MakePrediction

app = Flask(__name__)
routes = Blueprint('routes', __name__)
api = Api(routes, title="AI", version="1.0", description="AI API")


# Adding namespaces to the API
api.add_namespace(prediction_ns)

# Adding resources to the API
prediction_ns.add_resource(MakePrediction, "/prediction")



# Configure CORS with exemptions for specific websites
CORS(app, resources={r"/*": {"origins": EXEMPT_URLS}})


# Protect the Swagger documentation endpoint
@routes.before_app_request
def before_request():
    origin = request.headers.get("Origin")
    path = request.path
    if path.startswith("/swaggerui") or path == "/swagger.json":
        if origin in EXEMPT_URLS:
            return  # Bypass authentication for the exempted websites
        return auth.login_required()(lambda: None)()


# Protect the base URL which contains the Swagger UI and endpoints
@app.route("/")
@auth.login_required
def swagger_ui():
    return api.render_doc()


# Protect the Swagger JSON route
@app.route("/swagger.json")
@auth.login_required
def swagger_json():
    return jsonify(api.__schema__)
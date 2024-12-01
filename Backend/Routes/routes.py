from flask import Blueprint, Flask
from flask_restx import Api


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
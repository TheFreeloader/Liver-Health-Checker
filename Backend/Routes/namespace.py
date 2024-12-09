from flask_restx import Namespace

# Create a namespace 
prediction_ns = Namespace("prediction", description="Prediction operations")
analytics_ns = Namespace("analytics", description="Analytics operations")
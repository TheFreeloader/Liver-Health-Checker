from flask_restx import Resource
from Dashboard.Prediction.prediction import Prediction
from Routes.namespace import prediction_ns
from Routes.models import prediction_model
from flask import request


class MakePrediction(Resource):
    @prediction_ns.expect(prediction_model)
    def post(self):
        data = request.get_json()
        response = Prediction().new_input(
            data["Age"],
            data["Gender"],
            data["Total_Bilirubin"],
            data["Direct_Bilirubin"],
            data["Alkaline_Phosphotase"],
            data["Alamine_Aminotransferase"],
            data["Aspartate_Aminotransferase"],
            data["Total_Protiens"],
            data["Albumin"],
            data["Albumin_and_Globulin_Ratio"],
        )
        return response

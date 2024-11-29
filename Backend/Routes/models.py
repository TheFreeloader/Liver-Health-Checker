from Routes.namespace import prediction_ns
from flask_restx import fields

prediction_model = prediction_ns.model(
    "Prediction",
    {
        "Age": fields.Integer(required=True, description="Patient's age"),
        "Gender": fields.String(required=True, description="Patient's Gender"),
        "Total_Bilirubin": fields.Float(required=True, description="Total Bilirubin"),
        "Direct_Bilirubin": fields.Float(required=True, description="Direct Bilirubin"),
        "Alkaline_Phosphotase": fields.Float(
            required=True, description="Alkaline Phosphotase"
        ),
        "Alamine_Aminotransferase": fields.Float(
            required=True, description="Alamine Aminotransferase"
        ),
        "Aspartate_Aminotransferase": fields.Float(
            required=True, description="Aspartate Aminotransferase"
        ),
        "Total_Protiens": fields.Float(required=True, description="Total Proteins"),
        "Albumin": fields.Float(required=True, description="Albumin"),
        "Albumin_and_Globulin_Ratio": fields.Float(
            required=True, description="Albumin and Globulin Ratio"
        ),
    },
)

from Routes.namespace import prediction_ns
from flask_restx import fields


def validate_number(value):
    try:
        # Check if the value is a float or an integer
        if isinstance(value, (int, float)):
            return value
        float(value)
    except ValueError:
        raise ValueError(f"Value {value} is not a valid number.")
    return value


prediction_model = prediction_ns.model(
    "Prediction",
    {
        "Age": fields.Integer(required=True, description="Patient's age"),
        "Gender": fields.String(required=True, description="Patient's Gender"),
        "Total_Bilirubin": fields.Float(
            required=True, description="Total Bilirubin", validate=validate_number
        ),
        "Direct_Bilirubin": fields.Float(
            required=True, description="Direct Bilirubin", validate=validate_number
        ),
        "Alkaline_Phosphotase": fields.Float(
            required=True, description="Alkaline Phosphotase", validate=validate_number
        ),
        "Alamine_Aminotransferase": fields.Float(
            required=True,
            description="Alamine Aminotransferase",
            validate=validate_number,
        ),
        "Aspartate_Aminotransferase": fields.Float(
            required=True,
            description="Aspartate Aminotransferase",
            validate=validate_number,
        ),
        "Total_Proteins": fields.Float(
            required=True, description="Total Proteins", validate=validate_number
        ),
        "Albumin": fields.Float(
            required=True, description="Albumin", validate=validate_number
        ),
        "Albumin_and_Globulin_Ratio": fields.Float(
            required=True,
            description="Albumin and Globulin Ratio",
            validate=validate_number,
        ),
    },
)

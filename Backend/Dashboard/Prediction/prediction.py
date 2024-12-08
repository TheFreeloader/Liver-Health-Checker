import pandas as pd
import pickle
import os

class Prediction:
    def __init__(self):
        self.label_encoders = self.get_encoders()

    @staticmethod
    def get_encoders():
        base_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "Model")
        )
        encoder_files = {
            "Dataset": "dataset_encoder.pkl",
            "Gender": "gender_encoder.pkl",
        }

        encoders = {}
        for key, file_name in encoder_files.items():
            file_path = os.path.join(base_path, file_name)
            if not os.path.exists(file_path):
                raise FileNotFoundError(f"{key} encoder file not found: {file_path}")
            with open(file_path, "rb") as file:
                encoders[key] = pickle.load(file)
        return encoders

    def get_model_and_scaler(self):
        base_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "Model")
        )
        model_path = os.path.join(base_path, "nb_model.pkl")
        scaler_path = os.path.join(base_path, "scaler.pkl")

        with open(model_path, "rb") as model_file:
            model = pickle.load(model_file)
        with open(scaler_path, "rb") as scaler_file:
            scaler = pickle.load(scaler_file)

        return model, scaler

    def predict(self, new_data):
        # Load the model and scaler
        model, scaler = self.get_model_and_scaler()

        # Transform the new data
        new_data = scaler.transform(new_data)

        # Make prediction
        prediction = model.predict(new_data)
        predicted_dataset = self.label_encoders["Dataset"].inverse_transform(prediction)
        print(predicted_dataset)
        if predicted_dataset[0] == 1:
            return {"prediction": 1}, 200
        elif predicted_dataset[0] == 0:
            return {"prediction": 0}, 200
        else:
            return {"Error": "Invalid Result"}, 400

    def new_input(
        self,
        Age,
        Gender,
        Total_Bilirubin,
        Direct_Bilirubin,
        Alkaline_Phosphotase,
        Alamine_Aminotransferase,
        Aspartate_Aminotransferase,
        Total_Proteins,
        Albumin,
        Albumin_and_Globulin_Ratio,
    ):
        # Create a new dataframe with the new input data
        print(
            Age,
            Gender,
            Total_Bilirubin,
            Direct_Bilirubin,
            Alkaline_Phosphotase,
            Alamine_Aminotransferase,
            Aspartate_Aminotransferase,
            Total_Proteins,
            Albumin,
            Albumin_and_Globulin_Ratio,
        )
        new_data = pd.DataFrame(
            {
                "Age": [Age],
                "Gender": self.label_encoders["Gender"].transform([Gender]),
                "Total_Bilirubin": [Total_Bilirubin],
                "Direct_Bilirubin": [Direct_Bilirubin],
                "Alkaline_Phosphotase": [Alkaline_Phosphotase],
                "Alamine_Aminotransferase": [Alamine_Aminotransferase],
                "Aspartate_Aminotransferase": [Aspartate_Aminotransferase],
                "Total_Proteins": [Total_Proteins],
                "Albumin": [Albumin],
                "Albumin_and_Globulin_Ratio": [Albumin_and_Globulin_Ratio],
            }
        )
        return self.predict(new_data)
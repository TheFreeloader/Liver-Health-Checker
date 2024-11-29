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
            "Dataset": "Dataset_encoder.pkl",
            "Gender": "Gender_encoder.pkl"
        }

        encoders = {}
        for key, file_name in encoder_files.items():
            file_path = os.path.join(base_path, file_name)
            if not os.path.exists(file_path):
                raise FileNotFoundError(f"{key} encoder file not found: {file_path}")
            with open(file_path, "rb") as file:
                encoders[key] = pickle.load(file)
        return encoders

    def get_model(self, Gender):
        base_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "Model")
        )
        if Gender == "Male":
            model_path = os.path.join(base_path, "nb_male_model.pkl")
            scaler_path = os.path.join(base_path, "scaler_male.pkl")
        elif Gender == "Female":
            model_path = os.path.join(base_path, "nb_female_model.pkl")
            scaler_path = os.path.join(base_path, "scaler_female.pkl")
        else:
            raise ValueError("Invalid Gender value")

        with open(model_path, "rb") as model_file:
            model = pickle.load(model_file)
        with open(scaler_path, "rb") as scaler_file:
            scaler = pickle.load(scaler_file)

        return model, scaler            

    def predict(self, new_data):
        # Determine which model to use based on gender
        gender = new_data["Gender"].values[0]
        if gender == self.label_encoders["Gender"].transform(["Male"])[0]:
            model, scaler = self.get_model("Male")
        else:
            model, scaler = self.get_model("Female")

        # Drop the Gender column before transforming the data
        new_data = new_data.drop(columns=["Gender"])

        # Transform the new data
        new_data = scaler.transform(new_data)

        # Make prediction
        prediction = model.predict(new_data)
        predicted_dataset = self.label_encoders["Dataset"].inverse_transform(prediction)
        if predicted_dataset[0] == 1:
            return {"prediction": "The patient has the condition."}, 200
        elif predicted_dataset[0] == 0:
            return {"prediction": "The patient does not have the condition."}, 200
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
            Total_Protiens,
            Albumin,
            Albumin_and_Globulin_Ratio,
        ):
        # Create a new dataframe with the new input data
        new_data = pd.DataFrame(
            {
                "Age": [Age],
                "Gender": self.label_encoders["Gender"].transform([Gender]),
                "Total_Bilirubin": [Total_Bilirubin],
                "Direct_Bilirubin": [Direct_Bilirubin],
                "Alkaline_Phosphotase": [Alkaline_Phosphotase],
                "Alamine_Aminotransferase": [Alamine_Aminotransferase],
                "Aspartate_Aminotransferase": [Aspartate_Aminotransferase],
                "Total_Protiens": [Total_Protiens],
                "Albumin": [Albumin],
                "Albumin_and_Globulin_Ratio": [Albumin_and_Globulin_Ratio],
            }
        )
        return self.predict(new_data)
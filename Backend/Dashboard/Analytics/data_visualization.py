import os
import pandas as pd
from collections import Counter


class DataVisualization:
    def __init__(self):
        self.data = self.load_data()

    def load_data(self):
        base_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "Model")
        )
        data_path = os.path.join(base_path, "cleaned_dataset.csv")
        data = pd.read_csv(data_path)
        return data

    def get_datasets(self):
        df = self.data
        # Return all the values from the datasets.csv
        return df[
            [
                "Age",
                "Gender",
                "Total_Bilirubin",
                "Direct_Bilirubin",
                "Alkaline_Phosphotase",
                "Alamine_Aminotransferase",
                "Aspartate_Aminotransferase",
                "Total_Proteins",
                "Albumin",
                "Albumin_and_Globulin_Ratio",
                "Dataset",
            ]
        ].to_dict(orient="records")

    def age_vs_datasets(self):
        df = self.data
        # Return the Age and Dataset columns as a dictionary
        return df[["Age", "Dataset"]].to_dict(orient="records")

    def age_distribution(self):
        df = self.data
        age_counts = Counter(df["Age"])
        return dict(age_counts)

    def gender_distribution(self):
        df = self.data
        gender_counts = Counter(df["Gender"])
        return dict(gender_counts)

    def gender_based_patient_count(self):
        df = self.data
        # Filter the DataFrame to include only rows where Dataset is 1
        filtered_df = df[df['Dataset'] == 1]
        # Count the occurrences of each gender in the filtered DataFrame
        patient_count = Counter(filtered_df['Gender'])
        return dict(patient_count)
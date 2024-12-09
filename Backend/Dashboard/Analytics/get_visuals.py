from flask_restx import Resource
from Dashboard.Analytics.data_visualization import DataVisualization


class GetDatasets(Resource):
    def get(self):
        response = DataVisualization().get_datasets()
        return response


class GetAgeVsDatasets(Resource):
    def get(self):
        response = DataVisualization().age_vs_datasets()
        return response


class GetAgeDistribution(Resource):
    def get(self):
        response = DataVisualization().age_distribution()
        return response


class GetGenderDistribution(Resource):
    def get(self):
        response = DataVisualization().gender_distribution()
        return response


class GetGenderBasedPatientCount(Resource):
    def get(self):
        response = DataVisualization().gender_based_patient_count()
        return response

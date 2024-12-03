import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import precision_score, recall_score
import os
import pickle

# Construct the full path to the CSV files
path = os.path.dirname(os.path.abspath(__file__))
csv_path_male = os.path.join(path, "..", "Model", "cleaned_dataset_male.csv")
csv_path_female = os.path.join(path, "..", "Model", "cleaned_dataset_female.csv")

# Load the datasets into DataFrames
data_male = pd.read_csv(csv_path_male)
data_female = pd.read_csv(csv_path_female)

# Ensure both datasets have the 'Gender' column with both 'Male' and 'Female' labels
data_male["Gender"] = "Male"
data_female["Gender"] = "Female"

# Combine the datasets to fit the LabelEncoder with both labels
combined_data = pd.concat([data_male, data_female])

# Encode categorical variables
label_encoders = {}
for column in ["Gender", "Dataset"]:
    le = LabelEncoder()
    combined_data[column] = le.fit_transform(combined_data[column])
    label_encoders[column] = le

# Apply the fitted encoders to the original datasets
data_male["Gender"] = label_encoders["Gender"].transform(data_male["Gender"])
data_female["Gender"] = label_encoders["Gender"].transform(data_female["Gender"])
data_male["Dataset"] = label_encoders["Dataset"].transform(data_male["Dataset"])
data_female["Dataset"] = label_encoders["Dataset"].transform(data_female["Dataset"])

# Save the encoders
with open(os.path.join(path, "Gender_encoder.pkl"), "wb") as f:
    pickle.dump(label_encoders["Gender"], f)
with open(os.path.join(path, "Dataset_encoder.pkl"), "wb") as f:
    pickle.dump(label_encoders["Dataset"], f)


def check_and_flag_data(data):
    data["Total_Bilirubin_Flag"] = data["Total_Bilirubin"].apply(
        lambda x: 0 if 0.3 <= x <= 1.2 else 1
    )
    data["Direct_Bilirubin_Flag"] = data["Direct_Bilirubin"].apply(
        lambda x: 0 if 0.1 <= x <= 0.3 else 1
    )
    data["Alkaline_Phosphotase_Flag"] = data["Alkaline_Phosphotase"].apply(
        lambda x: 0 if 20 <= x <= 140 else 1
    )
    data["Alamine_Aminotransferase_Flag"] = data["Alamine_Aminotransferase"].apply(
        lambda x: 0 if 7 <= x <= 56 else 1
    )
    data["Aspartate_Aminotransferase_Flag"] = data["Aspartate_Aminotransferase"].apply(
        lambda x: 0 if 5 <= x <= 40 else 1
    )
    data["Total_Protiens_Flag"] = data["Total_Protiens"].apply(
        lambda x: 0 if 6.0 <= x <= 8.3 else 1
    )
    data["Albumin_Flag"] = data["Albumin"].apply(lambda x: 0 if 3.4 <= x <= 5.4 else 1)
    data["Albumin_and_Globulin_Ratio_Flag"] = data["Albumin_and_Globulin_Ratio"].apply(
        lambda x: 0 if 1.0 <= x <= 2.0 else 1
    )
    return data


# Apply the flagging function to the datasets
data_male = check_and_flag_data(data_male)
data_female = check_and_flag_data(data_female)


def train_and_evaluate(data_subset, model_filename, scaler_filename):
    X = data_subset.drop(columns=["Dataset", "Gender"])  # Features
    y = data_subset["Dataset"]  # Target variable

    # Standardize the features
    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    # Set fixed parameters for test_size and random_state
    test_size = 0.3
    validation_size = 0.25
    random_state = 300

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )

    # Further split the training data into training and validation sets
    X_train, X_val, y_train, y_val = train_test_split(
        X_train, y_train, test_size=validation_size, random_state=random_state
    )

    # Train a Naive Bayes classifier
    nb = GaussianNB()
    nb.fit(X_train, y_train)

    # Evaluate the model on the validation data
    y_val_pred = nb.predict(X_val)
    val_precision = precision_score(y_val, y_val_pred, zero_division=0)
    val_recall = recall_score(y_val, y_val_pred)

    print(f"Validation Precision: {val_precision * 100:.2f}%")
    print(f"Validation Recall: {val_recall * 100:.2f}%")

    # Make predictions on the test data
    y_test_pred = nb.predict(X_test)

    # Calculate derived metrics
    precision = precision_score(y_test, y_test_pred, zero_division=0)
    recall = recall_score(y_test, y_test_pred)

    print(f"Test Precision: {precision * 100:.2f}%")
    print(f"Test Recall: {recall * 100:.2f}%")

    # Check for overfitting
    if precision > val_precision + 0.02:
        print("The model is likely overfitting.")
        return None, None  # Indicate overfitting
    else:
        print("The model does not appear to be overfitting.")

        # Save the model and scaler as pickle files
        with open(model_filename, "wb") as model_file:
            pickle.dump(nb, model_file)
        with open(scaler_filename, "wb") as scaler_file:
            pickle.dump(scaler, scaler_file)

        return nb, scaler


# Train and evaluate models for male and female subsets
print("Training model for male subset...")
nb_male, scaler_male = train_and_evaluate(
    data_male, "nb_male_model.pkl", "scaler_male.pkl"
)

print("Training model for female subset...")
nb_female, scaler_female = train_and_evaluate(
    data_female, "nb_female_model.pkl", "scaler_female.pkl"
)

# Example of making a prediction with new data
new_data = pd.DataFrame(
    {
        "Age": [38],
        "Gender": label_encoders["Gender"].transform(["Female"]),
        "Total_Bilirubin": [2.6],
        "Direct_Bilirubin": [1.2],
        "Alkaline_Phosphotase": [410],
        "Alamine_Aminotransferase": [59],
        "Aspartate_Aminotransferase": [57],
        "Total_Protiens": [5.6],
        "Albumin": [3.0],
        "Albumin_and_Globulin_Ratio": [0.8],
    }
)

# Apply the flagging function to the new data
new_data = check_and_flag_data(new_data)

# Determine which model to use based on gender
gender = new_data["Gender"].values[0]
if gender == label_encoders["Gender"].transform(["Male"])[0]:
    model_filename = "nb_male_model.pkl"
    scaler_filename = "scaler_male.pkl"
    print("Using male model.")
else:
    model_filename = "nb_female_model.pkl"
    scaler_filename = "scaler_female.pkl"
    print("Using female model.")

# Check if the model file exists before loading
if os.path.exists(model_filename) and os.path.exists(scaler_filename):
    # Load the model and scaler from pickle files
    with open(model_filename, "rb") as model_file:
        model = pickle.load(model_file)
    with open(scaler_filename, "rb") as scaler_file:
        scaler = pickle.load(scaler_file)

    # Ensure the new data columns are in the same order as the training data
    new_data = new_data.drop(columns=["Gender"])
    new_data = new_data[data_male.drop(columns=["Dataset", "Gender"]).columns]

    # Transform the new data
    new_data = scaler.transform(new_data)

    # Make prediction
    prediction = model.predict(new_data)
    predicted_dataset = label_encoders["Dataset"].inverse_transform(prediction)
    print(f"Predicted Dataset: {predicted_dataset[0]}")

    # Classify the patient based on the prediction
    if predicted_dataset[0] == 1:
        print("The patient has the condition.")
    elif predicted_dataset[0] == 0:
        print("The patient does not have the condition.")
    else:
        print("Unknown condition.")
else:
    print(
        f"Model file {model_filename} or scaler file {scaler_filename} not found. Skipping prediction."
    )

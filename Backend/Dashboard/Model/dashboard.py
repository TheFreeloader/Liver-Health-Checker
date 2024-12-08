import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import precision_score, recall_score, f1_score, confusion_matrix
import os
import pickle

# Construct the full path to the CSV file
path = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(path, "..", "Model", "cleaned_dataset.csv")

# Load the dataset into a DataFrame
data = pd.read_csv(csv_path)

# Encode the 'Gender' column
le_gender = LabelEncoder()
data["Gender"] = le_gender.fit_transform(data["Gender"])

# Encode the 'Dataset' column
le_dataset = LabelEncoder()
data["Dataset"] = le_dataset.fit_transform(data["Dataset"])


def train_and_evaluate(
    data,
    model_filename,
    scaler_filename,
    gender_encoder_filename,
    dataset_encoder_filename,
    threshold=0.5,
):
    features = data.drop(columns=["Dataset"])  # Features
    target = data["Dataset"]  # Target variable

    # Standardize the features
    scaler = StandardScaler()
    features = scaler.fit_transform(features)

    # Print the first 10 instances of the standardized values
    print("First 10 instances of standardized values:")
    print(pd.DataFrame(features, columns=data.drop(columns=["Dataset"]).columns).head(10))

    # Set fixed parameters for test_size and random_state
    test_size = 0.2
    validation_size = 0.2
    random_state = 12

    # Split the data into training and testing sets
    features_train, features_test, target_train, target_test = train_test_split(
        features, target, test_size=test_size, random_state=random_state
    )

    # Further split the training data into training and validation sets
    features_train, features_val, target_train, target_val = train_test_split(
        features_train, target_train, test_size=validation_size, random_state=random_state
    )

    # Train a Naive Bayes classifier
    nb = GaussianNB()
    nb.fit(features_train, target_train)

    # Evaluate the model on the validation data
    target_val_prob = nb.predict_proba(features_val)[:, 1]
    target_val_pred = (target_val_prob >= threshold).astype(int)
    val_precision = precision_score(target_val, target_val_pred, zero_division=0)
    val_recall = recall_score(target_val, target_val_pred)
    val_f1 = f1_score(target_val, target_val_pred)
    val_confusion_matrix = confusion_matrix(target_val, target_val_pred)

    # Make predictions on the test data
    target_test_prob = nb.predict_proba(features_test)[:, 1]
    target_test_pred = (target_test_prob >= threshold).astype(int)

    # Calculate derived metrics
    precision = precision_score(target_test, target_test_pred, zero_division=0)
    recall = recall_score(target_test, target_test_pred)
    f1 = f1_score(target_test, target_test_pred)
    confusion_matrix_result = confusion_matrix(target_test, target_test_pred)

    # Check for overfitting
    if precision > val_precision + 0.02:
        return (None,) * 10  # Indicate overfitting
    else:
        # Save the model, scaler, and encoders as pickle files
        with open(model_filename, "wb") as model_file:
            pickle.dump(nb, model_file)
        with open(scaler_filename, "wb") as scaler_file:
            pickle.dump(scaler, scaler_file)
        with open(gender_encoder_filename, "wb") as gender_encoder_file:
            pickle.dump(le_gender, gender_encoder_file)
        with open(dataset_encoder_filename, "wb") as dataset_encoder_file:
            pickle.dump(le_dataset, dataset_encoder_file)

        return (
            nb,
            scaler,
            val_precision,
            val_recall,
            val_f1,
            val_confusion_matrix,
            precision,
            recall,
            f1,
            confusion_matrix_result,
        )


# Train and evaluate the model using the combined dataset with a custom threshold
print("Training model for combined dataset...")
(
    nb,
    scaler,
    val_precision,
    val_recall,
    val_f1,
    val_confusion_matrix,
    precision,
    recall,
    f1,
    confusion_matrix_result,
) = train_and_evaluate(
    data,
    "nb_model.pkl",
    "scaler.pkl",
    "gender_encoder.pkl",
    "dataset_encoder.pkl",
    threshold=0.5,
)

if nb is not None:
    print(f"Validation Precision: {val_precision * 100:.2f}%")
    print(f"Validation Recall: {val_recall * 100:.2f}%")
    print(f"Validation F1 Score: {val_f1 * 100:.2f}%")
    print(f"Validation Confusion Matrix:\n{val_confusion_matrix}")
    print(f"Test Precision: {precision * 100:.2f}%")
    print(f"Test Recall: {recall * 100:.2f}%")
    print(f"Test F1 Score: {f1 * 100:.2f}%")
    print(f"Test Confusion Matrix:\n{confusion_matrix_result}")
else:
    print("The model appears to be overfitting.")


# Example of making a prediction with new data
new_data = pd.DataFrame(
    {
        "Age": [42],
        "Gender": le_gender.transform(["Male"]),
        "Total_Bilirubin": [6.8],
        "Direct_Bilirubin": [3.2],
        "Alkaline_Phosphotase": [630],
        "Alamine_Aminotransferase": [25],
        "Aspartate_Aminotransferase": [47],
        "Total_Proteins": [6.1],
        "Albumin": [2.3],
        "Albumin_and_Globulin_Ratio": [0.6],
    }
)
# Check if the model file exists before loading
model_filename = "nb_model.pkl"
scaler_filename = "scaler.pkl"
gender_encoder_filename = "gender_encoder.pkl"
dataset_encoder_filename = "dataset_encoder.pkl"

if (
    os.path.exists(model_filename)
    and os.path.exists(scaler_filename)
    and os.path.exists(gender_encoder_filename)
    and os.path.exists(dataset_encoder_filename)
):
    # Load the model, scaler, and encoders from pickle files
    with open(model_filename, "rb") as model_file:
        model = pickle.load(model_file)
    with open(scaler_filename, "rb") as scaler_file:
        scaler = pickle.load(scaler_file)
    with open(gender_encoder_filename, "rb") as gender_encoder_file:
        le_gender = pickle.load(gender_encoder_file)
    with open(dataset_encoder_filename, "rb") as dataset_encoder_file:
        le_dataset = pickle.load(dataset_encoder_file)

    # Ensure the new data columns are in the same order as the training data
    new_data = new_data[data.drop(columns=["Dataset"]).columns]

    # Transform the new data
    new_data = scaler.transform(new_data)

    # Make prediction
    prediction = model.predict(new_data)
    predicted_dataset = le_dataset.inverse_transform(prediction)
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
        f"Model file {model_filename}, scaler file {scaler_filename}, or encoder files not found. Skipping prediction."
    )
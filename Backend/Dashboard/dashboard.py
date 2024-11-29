import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score
import os

# Construct the full path to the CSV file
path = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(path, "..", "Datasets", "cleaned_dataset.csv")

# Load the dataset into a DataFrame
data = pd.read_csv(csv_path)

# Encode categorical variables
label_encoders = {}
for column in ["Gender", "Dataset"]:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Split the data into features and target variable
X = data.drop(columns=["Dataset"])  # Features
y = data["Dataset"]  # Target variable

# Standardize the features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.1, random_state=200
)

# Train a Naive Bayes classifier
nb = GaussianNB()
nb.fit(X_train, y_train)

# Make predictions on the test data
y_test_pred = nb.predict(X_test)

# Evaluate the model on the training data
y_train_pred = nb.predict(X_train)
train_accuracy = accuracy_score(y_train, y_train_pred)
print(f"Training Accuracy: {train_accuracy * 100:.2f}%")

# Evaluate the model on the test data
test_accuracy = accuracy_score(y_test, y_test_pred)
print(f"Test Accuracy: {test_accuracy * 100:.2f}%")

# Cross-validation
cv_scores = cross_val_score(nb, X, y, cv=10)

# Print individual fold scores
print("Cross-Validation Scores for each fold:")
for i, score in enumerate(cv_scores):
    print(f"Fold {i+1}: {score * 100:.2f}%")

# Print the average cross-validation accuracy
cv_accuracy = cv_scores.mean()
print(f"Cross-Validation Accuracy: {cv_accuracy * 100:.2f}%")

# Check for overfitting
if train_accuracy > test_accuracy + 0.02 and train_accuracy > cv_accuracy + 0.02:
    print("The model is likely overfitting.")
else:
    print("The model does not appear to be overfitting.")

# Example of making a prediction with new data
new_data = pd.DataFrame(
    {
        "Age": [45],
        "Gender": label_encoders["Gender"].transform(["Male"]),
        "Total_Bilirubin": [1.2],
        "Direct_Bilirubin": [0.3],
        "Alkaline_Phosphotase": [200],
        "Alamine_Aminotransferase": [30],
        "Aspartate_Aminotransferase": [25],
        "Total_Protiens": [7.0],
        "Albumin": [3.5],
        "Albumin_and_Globulin_Ratio": [1.1],
    }
)

# Ensure the new data columns are in the same order as the training data
new_data = new_data[data.drop(columns=["Dataset"]).columns]

# Transform the new data
new_data = scaler.transform(new_data)

prediction = nb.predict(new_data)
predicted_dataset = label_encoders["Dataset"].inverse_transform(prediction)
print(f"Predicted Dataset: {predicted_dataset[0]}")
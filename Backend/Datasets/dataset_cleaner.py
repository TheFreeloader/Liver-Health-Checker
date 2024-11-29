import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('datasets.csv', header=0)  # Ensure the first row is treated as the header

# Handle missing values (if any)
df_cleaned = df.dropna()

# Save the cleaned DataFrame to a new CSV file (optional)
df_cleaned.to_csv('cleaned_dataset.csv', index=False)

# Print the cleaned DataFrame
print(df_cleaned)
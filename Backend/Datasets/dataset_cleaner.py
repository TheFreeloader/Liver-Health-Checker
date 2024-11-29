import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('datasets.csv', header=0)  # Ensure the first row is treated as the header

# Replace values in the 'Dataset' column: 2 -> 0 and 1 -> 1
df['Dataset'] = df['Dataset'].replace({2: 0, 1: 1})

# Handle missing values (if any)
df_cleaned = df.dropna()

# Save the cleaned DataFrame to a new CSV file (optional)
df_cleaned.to_csv('cleaned_dataset.csv', index=False)

# Print the cleaned DataFrame
print(df_cleaned)
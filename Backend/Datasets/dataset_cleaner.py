import pandas as pd
from scipy import stats

# Load the CSV file into a DataFrame
df = pd.read_csv('datasets.csv', header=0)  # Ensure the first row is treated as the header

# Replace values in the 'Dataset' column: 2 -> 0 and 1 -> 1
df['Dataset'] = df['Dataset'].replace({2: 0, 1: 1})

# Handle missing values (if any)
df_cleaned = df.dropna()

# Calculate the Z-scores of the DataFrame
z_scores = stats.zscore(df_cleaned.select_dtypes(include=[float, int]))

# Create a boolean mask for rows where all Z-scores are less than 3 (i.e., not outliers)
mask = (abs(z_scores) < 3).all(axis=1)

# Filter the DataFrame using the mask
df_no_outliers = df_cleaned[mask]

# Save the cleaned DataFrame to a CSV file
df_no_outliers.to_csv('cleaned_dataset.csv', index=False)

# Print the cleaned DataFrame
print("Cleaned DataFrame:")
print(df_no_outliers)
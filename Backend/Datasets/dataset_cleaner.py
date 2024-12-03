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

# Split the cleaned DataFrame into male and female subsets
df_male = df_no_outliers[df_no_outliers['Gender'] == 'Male']
df_female = df_no_outliers[df_no_outliers['Gender'] == 'Female']

# Save the male and female DataFrames to separate CSV files
df_male.to_csv('cleaned_dataset_male.csv', index=False)
df_female.to_csv('cleaned_dataset_female.csv', index=False)

# Print the cleaned DataFrames
print("Male DataFrame:")
print(df_male)
print("\nFemale DataFrame:")
print(df_female)
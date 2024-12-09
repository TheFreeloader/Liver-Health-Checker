import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the dataset from the CSV file
df = pd.read_csv('cleaned_dataset.csv')

# Scatter plot for Age vs Dataset
plt.figure(figsize=(10, 6))
sns.scatterplot(x='Dataset', y='Age', data=df)
plt.title('Age vs Dataset')
plt.xlabel('Dataset')
plt.ylabel('Age')
plt.xticks([0, 1])  # Set x-axis ticks to 0 and 1 only
plt.grid(True)
plt.show()

# Scatter plot for Age distribution
plt.figure(figsize=(10, 6))
sns.scatterplot(x=df.index, y='Age', data=df, color='green')
plt.title('Age Distribution')
plt.xlabel('Index')
plt.ylabel('Age')
plt.grid(True)
plt.show()

# Bar plot for Gender distribution
plt.figure(figsize=(10, 6))
sns.countplot(x='Gender', data=df, hue='Gender', palette={'Male': 'blue', 'Female': 'orange'})
plt.title('Gender Distribution')
plt.xlabel('Gender')
plt.ylabel('Count')
plt.grid(True)
plt.show()

# Violin plots for technical values
technical_values = [
    'Total_Bilirubin', 'Direct_Bilirubin', 'Alkaline_Phosphotase',
    'Alamine_Aminotransferase', 'Aspartate_Aminotransferase',
    'Total_Proteins', 'Albumin', 'Albumin_and_Globulin_Ratio'
]

plt.figure(figsize=(15, 10))
for i, column in enumerate(technical_values, 1):
    plt.subplot(3, 3, i)
    sns.violinplot(x='Dataset', y=column, data=df)
    plt.title(column)
plt.tight_layout()
plt.show()

# Strip plots for technical values
plt.figure(figsize=(15, 10))
for i, column in enumerate(technical_values, 1):
    plt.subplot(3, 3, i)
    sns.stripplot(x='Dataset', y=column, data=df, jitter=True, size=5)
    plt.title(column)
plt.tight_layout()
plt.show()
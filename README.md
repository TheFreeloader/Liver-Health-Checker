# Liver Health Checker

A web application that employs machine learning algorithms to assist in early detection and classification of liver disease based on patient medical data.

## 🎯 Our Goal

To develop a web application that employs a Bayesian algorithm to accurately classify individuals as either having liver disease or not, based on a given dataset of patient information. This tool aims to assist in early detection and potential prevention of liver disease, contributing to improved healthcare outcomes.

## 📊 Dataset Information

**Dataset Source:** [Indian Liver Patient Records](https://www.kaggle.com/datasets/uciml/indian-liver-patient-records)

### Context
Patients with liver disease have been continuously increasing because of excessive consumption of alcohol, inhalation of harmful gases, intake of contaminated food, pickles and drugs. This dataset was used to evaluate prediction algorithms in an effort to reduce burden on doctors.

### Content
- **Total Records:** 583 patient records
  - 416 liver patient records
  - 167 non-liver patient records
- **Geographic Source:** North East of Andhra Pradesh, India
- **Gender Distribution:**
  - 441 male patient records
  - 142 female patient records
- **Age Handling:** Any patient whose age exceeded 89 is listed as being of age "90"
- **Target Variable:** "Dataset" column serves as class label to distinguish between liver disease patients and healthy individuals

## 🚀 Features

- **Bayesian Classification Algorithm:** Implements probabilistic machine learning for accurate disease prediction
- **Web-based Interface:** User-friendly web application for easy access and interaction
- **Early Detection Focus:** Designed to assist healthcare professionals in identifying potential liver disease cases
- **Data-driven Insights:** Based on real patient records from medical institutions

## 🛠️ Technology Stack

- **Frontend:** Nest.js, HTML5, CSS3
- **Backend:** Flask
- **Machine Learning:** Python, Scikit-learn, Pandas, NumPy, Matplotlib
- **Deployment:** Render for the Backend and Vercel for the Frontend



## 💻 Usage

1. **Input Patient Data:** Enter relevant medical parameters through the web interface
2. **Algorithm Processing:** The Bayesian classifier processes the input data
3. **Risk Assessment:** Receive classification results indicating liver disease probability
4. **Healthcare Support:** Use results to support medical decision-making (not replace professional diagnosis)

## 👥 Team Members

- **[Cyrl John Navarro]** - *developer* - [cyjnavarro@gmail.com]
- **[Joshua Ivan Villanueva]** - *Project Manager* - [joivillanueva@gbox.ncf.edu.ph]
- **[Jeffrey Agdoro]** - *UI/UX* - [jagdoro@gbox.ncf.edu.ph]

## 🙏 Acknowledgments

- UCI Machine Learning Repository for providing the Indian Liver Patient Records dataset
- Kaggle community for dataset accessibility
- Healthcare professionals who contributed to data collection
- Academic advisors and mentors

---

**Note:** This project was developed as part of our capstone project to demonstrate the application of machine learning in healthcare diagnostics.

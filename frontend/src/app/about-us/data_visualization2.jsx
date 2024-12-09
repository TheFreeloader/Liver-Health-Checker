"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./page.module.css";

const DataVisualization2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/analytics/analytics"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.visible}>
      <div className={style.div_container}>
        <h1>About our Dataset</h1>
        <h2>
          Dataset:{" "}
          <a
            href="https://www.kaggle.com/datasets/uciml/indian-liver-patient-records"
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
          >
            https://www.kaggle.com/datasets/uciml/indian-liver-patient-records
          </a>
        </h2>
        <div className={style.description}>
          <ul>Context:</ul>
          <p>
            Patients with Liver disease have been continuously increasing
            because of excessive consumption of alcohol, inhale of harmful
            gases, intake of contaminated food, pickles and drugs. This dataset
            was used to evaluate prediction algorithms in an effort to reduce
            burden on doctors.
          </p>
        </div>
        <div className={style.description}>
          <ul>Content:</ul>
          <p>
            This data set contains 416 liver patient records and 167 non liver
            patient records collected from North East of Andhra Pradesh, India.
            The "Dataset" column is a class label used to divide groups into
            liver patient (liver disease) or not (no disease). This data set
            contains 441 male patient records and 142 female patient records.
            Any patient whose age exceeded 89 is listed as being of age "90".
          </p>
        </div>
        <div className={style.description}>
          <ul>Columns:</ul>
          <ul>
            <li>Age of the patient</li>
            <li>Gender of the patient</li>
            <li>Total Bilirubin</li>
            <li>Direct Bilirubin</li>
            <li>Alkaline Phosphotase</li>
            <li>Alamine Aminotransferase</li>
            <li>Aspartate Aminotransferase</li>
            <li>Total Proteins</li>
            <li>Albumin</li>
            <li>Albumin and Globulin Ratio</li>
            <li>
              Dataset: field used to split the data into two sets (patient with
              liver disease, or no disease)
            </li>
          </ul>
        </div>
        <table className={style.table_container}>
          <thead>
            <tr>
              <th>Instance</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Total Bilirubin</th>
              <th>Direct Bilirubin</th>
              <th>Alkaline Phosphotase</th>
              <th>Alamine Aminotransferase</th>
              <th>Aspartate Aminotransferase</th>
              <th>Total Proteins</th>
              <th>Albumin</th>
              <th>Albumin and Globulin Ratio</th>
              <th>Dataset</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Age}</td>
                <td>{item.Gender}</td>
                <td>{item.Total_Bilirubin}</td>
                <td>{item.Direct_Bilirubin}</td>
                <td>{item.Alkaline_Phosphotase}</td>
                <td>{item.Alamine_Aminotransferase}</td>
                <td>{item.Aspartate_Aminotransferase}</td>
                <td>{item.Total_Proteins}</td>
                <td>{item.Albumin}</td>
                <td>{item.Albumin_and_Globulin_Ratio}</td>
                <td>{item.Dataset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataVisualization2;
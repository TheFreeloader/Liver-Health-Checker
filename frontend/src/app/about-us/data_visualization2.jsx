"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./page.module.css";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const DataVisualization2 = () => {
  const [data, setData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderDistribution, setGenderDistribution] = useState([]);
  const [patientCount, setPatientCount] = useState([]);

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
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

  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/analytics/analytics/age"
      );
      const formattedData = response.data.map((item) => ({
        x: item.Dataset,
        y: item.Age,
      }));
      setScatterData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setScatterData([]);
      setLoading(false);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/analytics/analytics/age_distribution"
      );
      const formattedData = Object.entries(response.data).map(
        ([age, frequency]) => ({
          age: parseInt(age),
          frequency: frequency,
        })
      );
      setAgeDistribution(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData4 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/analytics/analytics/gender_distribution"
      );
      const formattedData = Object.entries(response.data).map(
        ([gender, frequency]) => ({
          gender: gender,
          frequency: frequency,
        })
      );
      setGenderDistribution(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData5 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/analytics/analytics/patient_count"
      );
      const formattedData = Object.entries(response.data).map(
        ([gender, frequency]) => ({
          gender: gender,
          frequency: frequency,
        })
      );
      setPatientCount(formattedData);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

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
        <div
          className={style.div_container_graph}
          style={{ height: 400, width: "100%" }}
        >
          <div>
            <h3
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "23px",
                marginLeft: "5%",
              }}
            >
              AGE in relation to DATASET
            </h3>
            <p
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "15px",
                marginTop: "1%",
                marginLeft: "15%",
              }}
            >
              This scatterplot represents the age of the patients in relation to
              the dataset. The 0 represent patient without liver disease and 1
              represent patient with liver disease.
            </p>
            <ScatterChart
              width={1000}
              height={600}
              margin={{ top: 50, right: 100, bottom: 50, left: 160 }}
            >
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="x"
                name="Dataset"
                domain={[0, 1]}
                ticks={[0, 1]}
                tick={{ fontSize: 25, fill: "white" }}
                label={{
                  value: "Dataset",
                  position: "insideBottomRight",
                  offset: -5,
                  fill: "white",
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Age"
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Age",
                  angle: -90,
                  position: "insideLeft",
                  fill: "white",
                }}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Dataset" data={scatterData} fill="orange" />
            </ScatterChart>
          </div>
          <div>
            <h3
              style={{ color: "white", textAlign: "center", fontSize: "23px" }}
            >
              AGE DISTRIBUTION
            </h3>
            <p
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "15px",
                marginTop: "1%",
              }}
            >
              This bar chart represents the frequency of different ages in the
              dataset.
            </p>
            <BarChart
              width={1000}
              height={600}
              data={ageDistribution}
              margin={{ top: 40, right: 130, bottom: 50, left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Age",
                  position: "insideBottomRight",
                  offset: -5,
                  fill: "white",
                }}
              />
              <YAxis
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  fill: "white",
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "white", borderRadius: "5px" }}
                itemStyle={{ color: "black" }}
              />
              <Legend />
              <Bar dataKey="frequency" fill="orange" />
            </BarChart>
          </div>
        </div>
        <div className={style.div_container_graph}>
          <div>
            <h3
              style={{
                color: "white",
                textAlign: "center",
                marginLeft: "5%",
                fontSize: "23px",
              }}
            >
              GENDER DISTRIBUTION
            </h3>
            <p
              style={{
                color: "white",
                textAlign: "center",
                marginLeft: "15%",
                marginTop: "1%",
              }}
            >
              This bar chart represents the frequency of different genders in
              the dataset.
            </p>
            <BarChart
              width={1000}
              height={600}
              data={genderDistribution}
              margin={{ top: 30, right: 100, bottom: 50, left: 160 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="gender"
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Gender",
                  position: "insideBottomRight",
                  offset: -5,
                  fill: "white",
                }}
              />
              <YAxis
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  fill: "white",
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "white" }}
                itemStyle={{ color: "black" }}
              />
              <Legend />
              <Bar dataKey="frequency" fill="orange" />
            </BarChart>
          </div>
          <div>
            <h3
              style={{ color: "white", textAlign: "center", fontSize: "23px" }}
            >
              PATIENT COUNT by GENDER
            </h3>
            <p
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "1%",
                marginLeft: "6%",
              }}
            >
              This bar chart represents the count of patients by gender where
              the dataset value is 1 or people that have liver disease.
            </p>
            <BarChart
              width={1000}
              height={600}
              data={patientCount}
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="gender"
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Gender",
                  position: "insideBottomRight",
                  offset: -5,
                  fill: "white",
                }}
              />
              <YAxis
                tick={{ fontSize: 20, fill: "white" }}
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  fill: "white",
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "white" }}
                itemStyle={{ color: "black" }}
              />
              <Legend />
              <Bar dataKey="frequency" fill="orange" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization2;

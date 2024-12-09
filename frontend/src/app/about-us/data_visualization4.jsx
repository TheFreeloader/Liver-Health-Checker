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

const DataVisualization4 = () => {
  const [data, setData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderDistribution, setGenderDistribution] = useState([]);
  const [patientCount, setPatientCount] = useState([]);

  useEffect(() => {
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

export default DataVisualization4;

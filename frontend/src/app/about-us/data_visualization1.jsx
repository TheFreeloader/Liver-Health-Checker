import React from "react";
import style from "./page.module.css";

const DataVisualization1 = () => {

  return (
    <div className={style.visible}>
      <div className={style.div_container}>
        <h1>Our Goal</h1>
        <p className={style.goal_p}>
          To develop a web application that employs a Bayesian algorithm to
          accurately classify individuals as either having liver disease or not,
          based on a given dataset of patient information. This tool aims to
          assist in early detection and potential prevention of liver disease,
          contributing to improved healthcare outcomes.
        </p>
      </div>
    </div>
  );
};

export default DataVisualization1;
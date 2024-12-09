import React from "react";
import style from "./page.module.css";

const DataVisualization3 = () => {
  return (
    <div className={style.visible}>
      <div className={style.div_container}>
        <h1>Algorithm Used</h1>
        <p className={style.goal_p}>
          <span className={style.highlight}>Naive Bayes</span> is a probabilistic algorithm used to predict liver disease
          based on a specific set of medical parameters such as patient age,
          gender, and biochemical markers. The model makes use of eleven key
          features, including total and direct bilirubin levels, liver enzyme
          tests such as alkaline phosphatase, alamine aminotransferase, and
          aspartate aminotransferase, as well as total proteins, albumin, and
          albumin-globulin ratio. The algorithm calculates the probability of
          liver disease based on these precise biochemical and demographic
          indicators. The method works by looking at how these individual
          parameters statistically correlate with the presence or absence of
          liver disease, allowing for a computational approach to initial
          medical screening that can help identify potential risk patterns
          across different patient profiles.
        </p>
      </div>
    </div>
  );
};

export default DataVisualization3;
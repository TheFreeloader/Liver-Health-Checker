"use client";
import React from "react";
import Image from "next/image";
import style from "./page.module.css";
import NavLine from "../../../../public/icons/navLine.png";
import Number4 from "../../../../public/images/number4.png";

const SurveyForm4 = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className={style.Header}>
        <h1>Your Assessment</h1>
        <h3>4 of 4</h3>
      </div>
      <div className={style.lineContainer}>
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLine} alt="line" className={style.navlineActive} />
      </div>
      <div className={style.questionHolder}>
        <div className={style.questionNumber}>
          <Image src={Number4} alt="number" className={style.number1} />
        </div>
        <div className={style.questionText}>
          <h2>Protein Levels</h2>
        </div>
      </div>
      <div className={style.inputWrapper2}>
        <input
          type="text"
          name="Total_Proteins"
          placeholder="Total Proteins (g/dL)"
          className={style.input2}
          value={formData.Total_Proteins || ""}
          onChange={(e) => handleInputChange(e, "number")}
          required
        />
        <input
          type="text"
          name="Albumin"
          placeholder="Albumin (g/dL)"
          className={style.input2}
          value={formData.Albumin || ""}
          onChange={(e) => handleInputChange(e, "number")}
          required
        />
        <input
          type="text"
          name="Albumin_and_Globulin_Ratio"
          placeholder="Albumin and Globulin Ratio (A/G ratio)"
          className={style.input2}
          value={formData.Albumin_and_Globulin_Ratio || ""}
          onChange={(e) => handleInputChange(e, "number")}
          required
        />
      </div>
    </>
  );
};

export default SurveyForm4;
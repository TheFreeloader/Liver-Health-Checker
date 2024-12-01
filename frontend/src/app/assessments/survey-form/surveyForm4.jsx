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
          type="number"
          name="Total_Protiens"
          placeholder="Total Proteins (g/dL)"
          className={style.input2}
          value={formData.Total_Protiens === 0 ? "" : formData.Total_Protiens}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="Albumin"
          placeholder="Albumin (g/dL)"
          className={style.input2}
          value={formData.Albumin === 0 ? "" : formData.Albumin}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="Albumin_and_Globulin_Ratio"
          placeholder="Albumin and Globulin Ratio (A/G ratio)"
          className={style.input2}
          value={formData.Albumin_and_Globulin_Ratio === 0 ? "" : formData.Albumin_and_Globulin_Ratio}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};

export default SurveyForm4;
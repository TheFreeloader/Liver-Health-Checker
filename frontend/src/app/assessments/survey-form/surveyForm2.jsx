"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./page.module.css";
import NavLine from "../../../../public/icons/navLine.png";
import NavLineInactive from "../../../../public/icons/navLineInactive.png";
import Number2 from "../../../../public/images/number2.png";

const SurveryForm2 = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className={style.Header}>
        <h1>Your Assessment</h1>
        <h3>2 of 4</h3>
      </div>
      <div className={style.lineContainer}>
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLineInactive} alt="line" className={style.navline} />
        <Image src={NavLineInactive} alt="line" className={style.navline} />
      </div>
      <div className={style.questionHolder}>
        <div className={style.questionNumber}>
          <Image src={Number2} alt="number" className={style.number1} />
        </div>
        <div className={style.questionText}>
          <h2>Bilirubin Levels</h2>
        </div>
      </div>
      <div className={style.inputWrapper2}>
        <input
          type="text"
          name="totalBilirubin"
          placeholder="Total Bilirubin (mg/dL)"
          className={style.input2}
          value={formData.totalBilirubin}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="directBilirubin"
          placeholder="Direct Bilirubin (mg/dL)"
          className={style.input2}
          value={formData.directBilirubin}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};

export default SurveryForm2;

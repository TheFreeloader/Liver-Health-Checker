"use client";
import React from "react";
import Image from "next/image";
import style from "./page.module.css";
import NavLine from "../../../../public/icons/navLine.png";
import NavLineInactive from "../../../../public/icons/navLineInactive.png";
import Number3 from "../../../../public/images/number3.png";

const SurveyForm3 = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className={style.Header}>
        <h1>Your Assessment</h1>
        <h3>3 of 4</h3>
      </div>
      <div className={style.lineContainer}>
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLineInactive} alt="line" className={style.navline} />
      </div>
      <div className={style.questionHolder}>
        <div className={style.questionNumber}>
          <Image src={Number3} alt="number" className={style.number1} />
        </div>
        <div className={style.questionText}>
          <h2>Enzymes Levels</h2>
        </div>
      </div>
      <div className={style.inputWrapper2}>
        <input
          type="number"
          name="Alkaline_Phosphotase"
          placeholder="Alkaline Phosphotase (IU/L)"
          className={style.input2}
          value={formData.Alkaline_Phosphotase === 0 ? "" : formData.Alkaline_Phosphotase}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="Alamine_Aminotransferase"
          placeholder="Alamine Aminotransferase (IU/L)"
          className={style.input2}
          value={formData.Alamine_Aminotransferase === 0 ? "" : formData.Alamine_Aminotransferase}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="Aspartate_Aminotransferase"
          placeholder="Aspartate Aminotransferase (IU/L)"
          className={style.input2}
          value={formData.Aspartate_Aminotransferase === 0 ? "" : formData.Aspartate_Aminotransferase}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};

export default SurveyForm3;
"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./page.module.css";
import NavLine from "../../../../public/icons/navLine.png";
import NavLineInactive from "../../../../public/icons/navLineInactive.png";
import Number3 from "../../../../public/images/number3.png";

const SurveryForm3 = ({ formData, handleInputChange }) => {
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
          type="text"
          name="alkalinePhosphotase"
          placeholder="Alkaline Phosphotase (IU/L)"
          className={style.input2}
          value={formData.alkalinePhosphotase}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="alamineAminotransferase"
          placeholder="Alamine Aminotransferase (IU/L)"
          className={style.input2}
          value={formData.alamineAminotransferase}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="asparateAminotransferase"
          placeholder="Aspartate Aminotransferase (IU/L)"
          className={style.input2}
          value={formData.asparateAminotransferase}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};

export default SurveryForm3;

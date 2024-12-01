"use client";
import React from "react";
import Image from "next/image";
import style from "./page.module.css";
import NavLine from "../../../../public/icons/navLine.png";
import NavLineInactive from "../../../../public/icons/navLineInactive.png";
import Number1 from "../../../../public/images/number1.png";

const SurveryForm1 = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className={style.Header}>
        <h1>Your Assessment</h1>
        <h3>1 of 4</h3>
      </div>
      <div className={style.lineContainer}>
        <Image src={NavLine} alt="line" className={style.navlineActive} />
        <Image src={NavLineInactive} alt="line" className={style.navline} />
        <Image src={NavLineInactive} alt="line" className={style.navline} />
        <Image src={NavLineInactive} alt="line" className={style.navline} />
      </div>
      <div className={style.questionHolder}>
        <div className={style.questionNumber}>
          <Image src={Number1} alt="number" className={style.number1} />
        </div>
        <div className={style.questionText}>
          <h2>Patient Information</h2>
        </div>
      </div>
      <div className={style.inputWrapper}>
        <input
          type="text"
          name="age"
          placeholder="Age"
          className={style.input}
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <select
          name="gender"
          className={style.select}
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Female" className={style.option}>
            Female
          </option>
          <option value="Male" className={style.option}>
            Male
          </option>
        </select>
      </div>
    </>
  );
};

export default SurveryForm1;
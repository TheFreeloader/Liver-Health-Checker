"use client";
import React from "react";
import style from "./page.module.css";
import BackIcon from "../../../../public/icons/backwhite.png";
import Image from "next/image";

function Result() {

  const handleSubmit = () => {
    window.location.href = "/";
  }

  return (
    <div className={style.col1}>
      <div className={style.header}>
        <h1 className={style.title}>
          Thank you for taking the time to complete our Liver Health Assessment.
        </h1>
        <p className={style.text}>
          Your responses have provided valuable insights into your potential
          risks. Remember, this is just the first step—prioritize your health
          and consult a healthcare professional for further guidance. Here’s to
          taking charge of your liver health!
        </p>
      </div>
      <div className={style.spacer}></div>
      <button onClick={handleSubmit} className={style.continueButton}>
        <Image src={BackIcon} alt="Back Icon" className={style.backIcon} />
        <span className={style.buttonText}>Back to Homepage</span>
      </button>
    </div>
  );
}

export default Result;

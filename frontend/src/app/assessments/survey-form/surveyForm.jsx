"use client";
import React, { useState } from "react";
import style from "./page.module.css";
import SurveryForm1 from "./surveyForm1";
import SurveryForm2 from "./surveyForm2";
import SurveryForm3 from "./surveyForm3";
import SurveryForm4 from "./surveyForm4";
import Image from "next/image";
import BackIcon from "../../../../public/icons/backIcon.png";
import BackIconWhite from "../../../../public/icons/backwhite.png";
import ForwardIcon from "../../../../public/icons/angle-right.png";
import Col2 from "../assessment_page_right";
import GetResult from "../../../../component/Hooks/getResult"
const SurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    totalBilirubin: "",
    directBilirubin: "",
    alkalinePhosphotase: "",
    alamineAminotransferase: "",
    asparateAminotransferase: "",
    totalProteins: "",
    albumin: "",
    albuminGlobulinRatio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
      // return formData.age !== "" && formData.gender !== "";
      case 2:
        // Add validation for SurveyForm2
        return true;
      case 3:
        // Add validation for SurveyForm3
        return true;
      case 4:
        // Add validation for SurveyForm4
        return true;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleSubmit = (value) => {
    if (validateForm()) {
      window.location.href = `/assessments/result?value=${value}`;
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Navigate back to the assessment page
      window.location.href = "/assessments";
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <SurveryForm1
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SurveryForm2
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <SurveryForm3
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <SurveryForm4
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return (
          <SurveryForm1
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
    }
  };

  return (
    <>
      <div className={style.col1}>
        {renderForm()}
        <div className={style.buttonContainer}>
          <div className={style.backButtonContainer}>
            <button
              className={style.backButton}
              onClick={handleBack}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={isHovered ? BackIconWhite : BackIcon}
                alt="Back Icon"
                className={isHovered ? style.backIconHover : ""}
              />
              <span className={style.backbuttontext}>Go Back</span>
            </button>
          </div>
          <div
            className={`${style.continueButtonContainer} ${
              style[`step${currentStep}`] || ""
            }`}
          >
            {currentStep === 4 ? (
            <button onClick={() => handleSubmit()} className={style.continueButton}>
            <span className={style.buttonText}>Submit</span>
            <Image
              src={ForwardIcon}
              alt="Forward Icon"
              className={style.forwardIcon}
            />
          </button>
            ) : (
              <button onClick={handleContinue} className={style.continueButton}>
                <span className={style.buttonText}>Continue</span>
                <Image
                  src={ForwardIcon}
                  alt="Forward Icon"
                  className={style.forwardIcon}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <Col2 />
    </>
  );
};

export default SurveyForm;

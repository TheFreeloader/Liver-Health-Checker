"use client";
import React, { useState } from "react";
import style from "./page.module.css";
import SurveyForm1 from "./surveyForm1";
import SurveyForm2 from "./surveyForm2";
import SurveyForm3 from "./surveyForm3";
import SurveyForm4 from "./surveyForm4";
import Image from "next/image";
import BackIcon from "../../../../public/icons/backIcon.png";
import BackIconWhite from "../../../../public/icons/backwhite.png";
import ForwardIcon from "../../../../public/icons/angle-right.png";
import Col2 from "../assessment_page_right";
import axios from "axios";
import Swal from "sweetalert2";

const SurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    Age: 0,
    Gender: "",
    Total_Bilirubin: 0,
    Direct_Bilirubin: 0,
    Alkaline_Phosphotase: 0,
    Alamine_Aminotransferase: 0,
    Aspartate_Aminotransferase: 0,
    Total_Protiens: 0,
    Albumin: 0,
    Albumin_and_Globulin_Ratio: 0,
  });

  const getResult = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/prediction/prediction",
        formData
      );
      return response.data.prediction;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "Gender" ? value : value === "" ? "" : parseFloat(value) || 0,
    });
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        return formData.Age !== 0 && formData.Gender !== "";
      case 2:
        return (
          formData.Total_Bilirubin !== 0 && formData.Direct_Bilirubin !== 0
        );
      case 3:
        return true;
      case 4:
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields.",
      });
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const value = await getResult();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your assessment has been submitted successfully.",
        }).then(() => {
          window.location.href = `/assessments/result?value=${value}`;
        });
      } catch (error) {
        console.error("Error getting result:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while submitting the form. Please try again.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      window.location.href = "/assessments";
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <SurveyForm1
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SurveyForm2
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <SurveyForm3
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <SurveyForm4
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return (
          <SurveyForm1
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
              <button onClick={handleSubmit} className={style.continueButton}>
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

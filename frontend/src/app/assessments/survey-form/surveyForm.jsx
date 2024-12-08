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
    Age: "",
    Gender: "",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkaline_Phosphotase: "",
    Alamine_Aminotransferase: "",
    Aspartate_Aminotransferase: "",
    Total_Proteins: "",
    Albumin: "",
    Albumin_and_Globulin_Ratio: "",
  });

  const getResult = async () => {
    try {
      const response = await axios.post(
        "https://capstone-0579.onrender.com/prediction/prediction",
        {
          ...formData,
          Age: parseFloat(formData.Age),
          Gender: formData.Gender,
          Total_Bilirubin: parseFloat(formData.Total_Bilirubin),
          Direct_Bilirubin: parseFloat(formData.Direct_Bilirubin),
          Alkaline_Phosphotase: parseFloat(formData.Alkaline_Phosphotase),
          Alamine_Aminotransferase: parseFloat(formData.Alamine_Aminotransferase),
          Aspartate_Aminotransferase: parseFloat(formData.Aspartate_Aminotransferase),
          Total_Proteins: parseFloat(formData.Total_Proteins),
          Albumin: parseFloat(formData.Albumin),
          Albumin_and_Globulin_Ratio: parseFloat(formData.Albumin_and_Globulin_Ratio),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.prediction;
    } catch (error) {
      console.error("Error getting result:", error);
      throw error;
    }
  };

  const handleInputChange = (e, type = "text") => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? value : value,
    });
  };

   const validateForm = () => {
    switch (currentStep) {
      case 1:
        return formData.Age !== "" && formData.Gender !== "";
      case 2:
        return (
          formData.Total_Bilirubin !== "" && formData.Direct_Bilirubin !== ""
        );
      case 3:
        return (
          formData.Alkaline_Phosphotase !== "" &&
          formData.Alamine_Aminotransferase !== "" &&
          formData.Aspartate_Aminotransferase !== ""
        );
      case 4:
        return (
          formData.Total_Proteins !== "" &&
          formData.Albumin !== "" &&
          formData.Albumin_and_Globulin_Ratio !== ""
        );
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
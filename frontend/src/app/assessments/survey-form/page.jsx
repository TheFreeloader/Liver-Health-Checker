import React from "react";
import SurveryForm from "./surveyForm";
import style from "./page.module.css";
const page = () => {
  return (
    <>
      <div className={style.container}>
        <SurveryForm />
      </div>
    </>
  );
};

export default page;

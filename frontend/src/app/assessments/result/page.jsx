import React from "react";
import Result from "./result";
import style from "./page.module.css";
import Negative from "./negative";
import Positive from "./postive";
const page = () => {
  return (
    <>
      <div className={style.container}>
        <Result />
        <Negative />
      </div>
    </>
  );
};

export default page;

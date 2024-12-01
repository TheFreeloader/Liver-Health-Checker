"use client";
import React, { useEffect, useState } from "react";
import Result from "./result";
import style from "./page.module.css";
import Negative from "./negativeOutcome";
import Positive from "./positiveOutcome";

const Page = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setValue(urlParams.get("value"));
  }, []);

  if (value === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style.container}>
        <Result />
        {value === "0" && <Negative />}
        {value === "1" && <Positive />}
      </div>
    </>
  );
};

export default Page;
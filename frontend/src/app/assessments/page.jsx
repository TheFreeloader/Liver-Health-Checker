import React from "react";
import Col1 from "./assessment_page_left";
import Col2 from "./assessment_page_right";
import style from "./page.module.css";
function Assessments() {
  return (
    <>
      <div className={style.container}>
        <Col1 />
        <Col2 />
      </div>
    </>
  );
}

export default Assessments;

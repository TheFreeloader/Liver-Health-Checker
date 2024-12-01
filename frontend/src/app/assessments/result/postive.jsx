import React from "react";
import Line from "../../../../public/icons/line.png";
import style from "./page.module.css";
import Image from "next/image";

const postive = () => {
  return (
    <div className={style.col2}>
      <div className={style.wrapper2}>
        <div className={style.header2}>Assessment Result</div>
        <div className={style.lineContainer}>
          <Image src={Line} alt="line" className={style.line} />
        </div>
        <div className={style.infoWrapper}>
          <div className={style.infoText}>
            <h1 className={style.infoTitle}>
              {" "}
              There is a Possibility of Having Liver Disease
            </h1>
            <h1 className={style.recommendationText}> Recommendation:</h1>
            <div className={style.bulletContainer}>
              <ul className={style.bullet}>
                <li>Consult a hepatologist for further evaluation.</li>
                &nbsp;
                <li>Maintain a healthy diet and avoid alcohol.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default postive;

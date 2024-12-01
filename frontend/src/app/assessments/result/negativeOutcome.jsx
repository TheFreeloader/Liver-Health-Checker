import React from "react";
import Line from "../../../../public/icons/line.png";
import style from "./page.module.css";
import Image from "next/image";

const negative = () => {
  return (
    <div className={style.col2}>
      <div className={style.wrapper2}>
        <div className={style.header2}>Assessment Result</div>
        <div className={style.lineContainer}>
          <Image src={Line} alt="line" className={style.line} />
        </div>
        <div className={style.infoWrapperGreen}>
          <div className={style.infoText}>
            <h1 className={style.infoTitleGreen}>
              No Liver Disease <br /> Detected
            </h1>
            <h1 className={style.recommendationText}> Recommendation:</h1>
            <div className={style.bulletContainer}>
              <ul className={style.bullet}>
                <li>Continue monitoring your health periodically.</li>
                &nbsp;
                <li>Stay hydrated and follow a balanced diet.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default negative;

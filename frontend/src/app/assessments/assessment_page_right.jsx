import React from "react";
import Line from "../../../public/icons/line.png";
import DocIcon from "../../../public/icons/doc.png";
import style from "./page.module.css";
import Image from "next/image";

const col2 = () => {
  return (
    <div className={style.col2}>
      <div className={style.wrapper2}>
        <div className={style.header2}>Assessment Result</div>
        <div className={style.lineContainer}>
          <Image src={Line} alt="line" className={style.line} />
        </div>
        <div className={style.infoWrapper}>
          <div className={style.infoLogo}>
            <Image src={DocIcon} alt="doc icon" className={style.docIcon} />
          </div>
          <div className={style.infoText}>
            <p>
              Finish the survey to identify potential risks of liver disease.
              Your results will offer valuable insights into your liver health
              and guide you toward the right steps for prevention or care. Take
              control of your well-being and start prioritizing your liver
              health today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default col2;

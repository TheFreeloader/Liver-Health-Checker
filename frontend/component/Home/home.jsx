import React from "react";
import style from "./home.module.css";
import Start_assesment from "../Funct-Components/Buttons/try_it_button";
import Image from "next/image";
import doctorImage from "../../public/images/doctor.png";

const home = () => {
  return (
    <div className={style.container}>
      <div className={style.home}>
        <h1 className={style.title}>Liver Health Checker</h1>
        <p className={style.paragraph}>
          Take the first step toward understanding your liver health—Assess your
          risk for liver disease today!
        </p>
        <Start_assesment />
      </div>
      <div className={style.rightColoumn}>
        <Image src={doctorImage} alt="Doctor" className={style.image} />
      </div>
    </div>
  );
};

export default home;
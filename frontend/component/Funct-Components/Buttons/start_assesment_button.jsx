"use client";
import React from "react";
import Image from "next/image";
import angleRight from "../../../public/icons/angle-right.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./start_assessment_button.module.css";

const StartAssesmentButton = () => {
  const pathname = usePathname();
  return (
    <div className={style.startAssesment}>
      <Link
        href="/assessments/survey-form"
        className={pathname === "/assessments/survey-form" ? style.active : ''}
      >
        <div className={style.text}>Start Assessment</div>
        <div className={style.iconWrapper}>
          <Image src={angleRight} alt="angle-right" className={style.icon} />
        </div>
      </Link>
    </div>
  );
};

export default StartAssesmentButton;
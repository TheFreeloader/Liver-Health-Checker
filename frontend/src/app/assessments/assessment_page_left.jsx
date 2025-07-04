"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./page.module.css";
import seachIcon from "../../../public/icons/search.png";
import heartIcon from "../../../public/icons/heart.png";
import relaxIcon from "../../../public/icons/relax.png";
import Button from "../../../component/Funct-Components/Buttons/start_assesment_button";

const Col1 = () => {
  return (
    <div className={style.col1}>
      <div className={style.content}>
        <div className={style.header}>
          <h1 className={style.title}>Liver Health Assessment</h1>
          <p className={style.text}>
            Welcome to our Liver Health Survey! This quick and simple
            questionnaire is designed to help you assess your risk for liver
            disease. By answering a few simple questions, you’ll gain
            personalized insights and take an important step toward proactive
            liver care. Let’s get started on your journey to better health!
          </p>
        </div>
        <div className={style.wrapper}>
          <div className={style.card}>
            <div className={style.icon}>
              <Image
                src={seachIcon}
                alt="search icon"
                className={style.image}
              />
            </div>
            <p className={style.label}>
              Identify potential risk factors for liver disease before symptoms
              become serious{" "}
            </p>
          </div>
          <div className={style.card}>
            <div className={style.icon1}>
              <Image
                src={heartIcon}
                alt="heart icon"
                className={style.image2}
              />
            </div>
            <p className={style.label}>
              Recieve Tailored recommendation to improve and maintain your liver
              health{" "}
            </p>
          </div>
          <div className={style.card}>
            <div className={style.icon2}>
              <Image
                src={relaxIcon}
                alt="relax icon"
                className={style.image3}
              />
            </div>
            <p className={style.label}>
              Take control of your well-being with actionable steps toward a
              healthier lifestyle.{" "}
            </p>
          </div>
        </div>
      </div>
      <Button className={style.button} />
    </div>
  );
};

export default Col1;
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./try_it_button.module.css";
import Image from "next/image";
import angleRight from "../../../public/icons/angle-right.png";

function start_assesment() {
  const pathname = usePathname();
  return (
    <div className={style.startAssesment}>
      <Link href="/assessments" className={pathname === "/assessments" ? style.active : ""}>
        <div className={style.text}>Try it Now</div>
        <div className={style.iconWrapper}>
          <Image src={angleRight} alt="angle-right" className={style.icon} />
        </div>
      </Link>
    </div>
  );
}

export default start_assesment;
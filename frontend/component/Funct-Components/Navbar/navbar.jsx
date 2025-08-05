"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const isAboutActive = pathname === "/about-us";

  return (
    <div className={`${styles.Navbar} ${isAboutActive ? styles.about_active : ""}`}>
      <div className={styles.marginer}>
        <Link
          href="/"
          className={`${pathname === "/" ? styles.active : ""} ${isAboutActive ? styles.other_links_when_about_active : ""}`}
        >
          Home
        </Link>
        <Link
          href="/assessments"
          className={`${pathname.startsWith("/assessments") ? styles.active : ""} ${isAboutActive ? styles.other_links_when_about_active : ""}`}
        >
          Assessment
        </Link>
        <Link
          href="/about-us"
          className={isAboutActive ? styles.about_active : ""}
        >
          About Us
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
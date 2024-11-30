"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.Navbar}>
      <div className={styles.marginer}>
        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          Home
        </Link>
        <Link
          href="/assessments"
          className={pathname === "/assessments" ? styles.active : ""}
        >
          Assessment
        </Link>
        <Link
          href="/about-us"
          className={pathname === "/about-us" ? styles.active : ""}
        >
          About Us
        </Link>
        <Link
          href="/contact-us"
          className={pathname === "/contact-us" ? styles.active : ""}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

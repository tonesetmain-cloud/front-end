"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/Navbar";
import WithAuth from "@/components/WithAuth";
import UiElements from "@/components/UI/UiElements";
import styles from "./Canva.module.css";
import axios from "axios";

const links = [
  { labelFull: "Project 1", labelShort: "P1", href: "/canva" },
  { labelFull: "Project 2", labelShort: "P2", href: "/canva" },
  { labelFull: "Project 3", labelShort: "P3", href: "/canva" },
];

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}3003/business/get-all-business-details`
        );

        if (response.data.status === "success") {
          console.log("Data:", response.data);
        }
      } catch (error) {
        console.error("Error getting details:", error);
        alert("Error in getting details");
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className={styles.container}>
      <NavBar flag={true} />
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          ☰
        </button>
        <nav className={styles.links}>
          {links.map((link) => (
            <a key={link.labelFull} href={link.href}>
              {open ? link.labelFull : link.labelShort}
            </a>
          ))}
        </nav>
      </div>
      <UiElements />
    </div>
  );
};

export default function ProtectedCanvas() {
  return (
    <WithAuth>
      <CanvaPage />
    </WithAuth>
  );
}

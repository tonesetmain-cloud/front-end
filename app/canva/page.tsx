"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/Navbar";
import WithAuth from "@/components/WithAuth";
import UiElements from "@/components/UI/UiElements";
import styles from "./Canva.module.css";
import axios from "axios";

export type projects = {
  id?: string;
  user_id: string;
  business_name: string;
  business_type: string;
  target_audience: string;
  brand_personality: string;
  brand_style: string;
  brand_emotion: string;
  preferred_colors: string;
  color_theme: string;
  core_values: string;
  branding_purpose: string;
  admired_competitors: string;
  geographic_influences: string;
  wants_secondary_colors: boolean;
  differentiate_competitor_colors: string;
};

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [open, setOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<projects[]>([]);
  const [selectedId, setselectedId] = useState<string>("");

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;
        if (!token) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.get(
          `${baseUrl}3003/business/get-all-business-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status == "success") {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error("Error getting details:", error);
        alert("Error in getting details");
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleClick = (id: string) => {
    setselectedId(id);
  };

  return (
    <div className={styles.container}>
      <NavBar flag={true} />
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          ☰
        </button>
        <nav className={styles.links}>
          {projects.map((project, i) => (
            <p key={project.id} onClick={() => handleClick(project.id!)}>
              {open ? project.business_name : `P${i + 1}`}
            </p>
          ))}
        </nav>
      </div>
      <UiElements id={selectedId} />
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

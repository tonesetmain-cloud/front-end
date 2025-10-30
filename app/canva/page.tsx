"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/Navbar";
import WithAuth from "@/components/WithAuth";
import UiElements from "@/components/UI/UiElements";
import styles from "./Canva.module.css";
import axios from "axios";
import { projects, UIElementsAttributes } from "@/types/types";

import Dropdown from "react-bootstrap/Dropdown";

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [open, setOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<projects[]>([]);
  const [selectedId, setselectedId] = useState<string>("");
  const [version, setVersion] = useState<number>(1);
  const [versions, setVersions] = useState<UIElementsAttributes[]>();

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

    const fetchVersions = async () => {
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
          `${baseUrl}3003/business/get-ui-details-by-id/${selectedId}`,
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
      <div className={styles.versionScrollBar}>
        <Dropdown>
          <Dropdown.Toggle
            variant={`dark`}
            id="dropdown-basic"
            className={styles.versionBtn}>
            Version
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
      <UiElements id={selectedId} version={version} />
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

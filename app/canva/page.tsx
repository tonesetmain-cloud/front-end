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
  const [selectedId, setSelectedId] = useState<string>("");
  const [version, setVersion] = useState<UIElementsAttributes>();
  const [versions, setVersions] = useState<UIElementsAttributes[]>();

  //get all the project detaiulsof the user
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
          setSelectedId(response.data.data[0].id);
        }
      } catch (error) {
        console.error("Error getting details:", error);
        alert("Error in getting details");
      }
    };

    fetchBusinessDetails();
  }, []);

  //get all the versions (history) of a single project by its ID
  useEffect(() => {
    if (!selectedId) return;
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
          setVersions(response.data.data);
          setVersion(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error getting details:", error);
        alert("Error in getting details");
      }
    };
    fetchVersions();
  }, [selectedId]);

  const handleClick = (id: string) => {
    setSelectedId(id);
  };

  const handleVersionClick = (version: UIElementsAttributes) => {
    setVersion(version);
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
            {versions?.map((i, key) => {
              return (
                <Dropdown.Item key={key} onClick={() => handleVersionClick(i)}>
                  Version {i.version}
                </Dropdown.Item>
              );
            })}
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
      {/* render only when version data is available */}
      {version && <UiElements id={selectedId} version={version} />}
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

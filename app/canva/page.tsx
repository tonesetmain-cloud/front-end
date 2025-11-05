"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/Navbar";
import WithAuth from "@/components/WithAuth";
import UiElements from "@/components/UI/UiElements";
import styles from "./Canva.module.css";
import axios from "axios";
import { projects, UIElementsAttributes } from "@/types/types";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "react-bootstrap/Dropdown";

export const fetchProjects = async (token: string, baseUrl: string) => {
  const response = await axios.get(
    `${baseUrl}3003/business/get-all-business-details`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (response.data.status !== "success") {
    throw new Error("Failed to fetch projects");
  }

  return response.data.data;
};

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = useAuthToken();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [version, setVersion] = useState<UIElementsAttributes>();
  const [versions, setVersions] = useState<UIElementsAttributes[]>();

  //use react query to fetch business details beacuse it will cache the details. So that we wont need to refetch it again.
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useQuery<projects[], Error>({
    queryKey: ["projects", token],
    queryFn: () => fetchProjects(token!, baseUrl!),
    enabled: !!token,
  });

  useEffect(() => {
    if (projectsData?.length && !selectedId) {
      setSelectedId(projectsData[0].id ?? ""); // safe because we already checked length
    }
  }, [projectsData, selectedId]);

  //get all the versions (history) of a single project by its ID
  useEffect(() => {
    if (!selectedId) return;
    const fetchVersions = async () => {
      try {
        if (!token) {
          console.error("No valid auth token found");
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
          {projectsData?.map((project, i) => (
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

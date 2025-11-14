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
import { fetchProjects } from "@/lib/fetchProjects";
import TechStack from "@/components/techstack/TechStack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import SystemDesign from "@/components/systemDesign/SystemDesign";

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  const token = useAuthToken();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [version, setVersion] = useState<UIElementsAttributes>();
  const [versions, setVersions] = useState<UIElementsAttributes[]>();
  const [screen, setScreen] = useState<string>("ui-stuff");

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
          `${baseUrl}/business/get-ui-details-by-id/${selectedId}`,
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

  const handleScreenChange = (value: string) => {
    setScreen(value);
  };
  return (
    <div className={styles.container}>
      <NavBar flag={true} />
      <div className={styles.topBar}>
        <div className={styles.menuBar}>
          <button
            className={screen === "stack" ? styles.activeMenuItem : ""}
            onClick={() => handleScreenChange("stack")}>
            Tech stack
          </button>
          <button
            className={screen === "ui-stuff" ? styles.activeMenuItem : ""}
            onClick={() => handleScreenChange("ui-stuff")}>
            UI stuff
          </button>
          <button
            className={screen === "system-design" ? styles.activeMenuItem : ""}
            onClick={() => handleScreenChange("system-design")}>
            System design
          </button>
        </div>
        {screen == "ui-stuff" && (
          <div className={styles.versionScrollBar}>
            <Dropdown>
              <Dropdown.Toggle
                variant={`dark`}
                id="dropdown-basic"
                className={styles.versionBtn}>
                Version
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {versions?.map((i, key) => (
                  <Dropdown.Item
                    key={key}
                    onClick={() => handleVersionClick(i)}>
                    Version {i.version}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>

      <div
        className={`${styles.sidebar} ${open ? styles.open : ""}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>
        <nav className={styles.links}>
          {projectsData?.map((project, i) => (
            <p key={project.id} onClick={() => handleClick(project.id!)}>
              {open ? (
                project.business_name
              ) : (
                <>
                  <FontAwesomeIcon icon={faFolder} style={{ marginRight: 4 }} />
                  {i + 1}
                </>
              )}
            </p>
          ))}
        </nav>
      </div>
      {/* render only when version data is available */}
      <div className={styles.uiElementsContainer}>
        {version && screen == "ui-stuff" && (
          <UiElements id={selectedId} version={version} />
        )}
        {screen == "stack" && <TechStack id={selectedId} />}
        {screen == "system-design" && <SystemDesign id={selectedId} />}
      </div>
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

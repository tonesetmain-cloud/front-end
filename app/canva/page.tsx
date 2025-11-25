"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/Navbar";
import WithAuth from "@/components/WithAuth";
import UiElements from "@/components/UI/UiElements";
import styles from "./Canva.module.css";
import axios from "axios";
import {
  projects,
  UIElementsAttributes,
  TechStachVersionsAttributes,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/fetchProjects";
import TechStack from "@/components/techstack/TechStack";
import SystemDesign from "@/components/systemDesign/SystemDesign";
import { fetchUserId } from "@/lib/fetchUserId";
import Sidebar from "@/components/canvas/Sidebar";
import TopMenu from "@/components/canvas/TopMenu";
import { version } from "os";

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  const [selectedId, setSelectedId] = useState<string>("");
  const [uiElementsVersion, setuiElementsVersion] =
    useState<UIElementsAttributes>();
  const [uiElementsVersions, setuiElementsVersions] =
    useState<UIElementsAttributes[]>();
  const [techStackVersion, setTechStackVersion] =
    useState<TechStachVersionsAttributes>();
  const [techStackVersionNumber, setTechStackVersionNumber] =
    useState<number>(1);
  const [techStackVersions, setTechStackVersions] =
    useState<TechStachVersionsAttributes[]>();
  const [screen, setScreen] = useState<string>("ui-stuff");
  const {
    data: userIdData,
    isLoading: userIdLoading,
    error: userIdError,
  } = useQuery<string, Error>({
    queryKey: ["user"],
    queryFn: () => fetchUserId(baseUrl!),
  });

  //use react query to fetch business details beacuse it will cache the details. So that we wont need to refetch it again.
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useQuery<projects[], Error>({
    queryKey: ["projects", userIdData],
    queryFn: () => fetchProjects(baseUrl!),
  });

  useEffect(() => {
    if (projectsData?.length && !selectedId) {
      setSelectedId(projectsData[0].id ?? ""); // safe because we already checked length
    }
  }, [projectsData, selectedId]);

  //get all the ui elements versions (history) of a single project by its ID
  useEffect(() => {
    if (!selectedId) return;
    const fetchVersions = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/business/get-ui-details-by-id/${selectedId}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.status == "success") {
          setuiElementsVersions(response.data.data);
          setuiElementsVersion(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error getting details:", error);
        alert("Error in getting details");
      }
    };
    fetchVersions();
  }, [selectedId]);

  //get all the techstack versions (history) of a single project by its ID
  useEffect(() => {
    if (!selectedId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/business/get-tech-stack-all-versions/${selectedId}`,
          { withCredentials: true }
        );
        setTechStackVersions(response.data.data);
      } catch (error) {
        console.error("Error in TechStack component:", error);
      }
    };

    fetchData();
  }, [selectedId]);

  //get the specific version detail of techstack
  useEffect(() => {
    if (!selectedId) return;
    if (!techStackVersionNumber) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/business/get-tech-stack-by-id-and-version/${selectedId}/${techStackVersionNumber}`,
          { withCredentials: true }
        );
        setTechStackVersion(response.data.data);
      } catch (error) {
        console.error("Error in TechStack component:", error);
      }
    };
    fetchData();
  }, [selectedId, techStackVersionNumber]);

  //we are stroring whole version object into var
  const handleUIElementVersionClick = (version: UIElementsAttributes) => {
    setuiElementsVersion(version);
  };
  //first we stroing version number then fetching techstack of that version number
  // Handling the fetching of tech stack and UI elements is different because the backend structures them differently. The tech stack is stored across multiple tables, while the UI elements are stored in a single table.
  const handleTechStackVersionClick = (
    version: TechStachVersionsAttributes
  ) => {
    setTechStackVersionNumber(version.version!);
  };

  return (
    <div className={styles.container}>
      <NavBar flag={true} />

      <TopMenu
        uiElementsVersions={uiElementsVersions!}
        techStackVersions={techStackVersions!}
        handleUIElementVersionClick={handleUIElementVersionClick}
        handleTechStackVersionClick={handleTechStackVersionClick}
        screen={screen}
        setScreen={setScreen}
      />

      <Sidebar projectsData={projectsData!} setSelectedId={setSelectedId} />

      {/* render only when version data is available */}
      <div className={styles.uiElementsContainer}>
        {uiElementsVersion && screen == "ui-stuff" && (
          <UiElements id={selectedId} version={uiElementsVersion} />
        )}
        {screen == "stack" && (
          <TechStack id={selectedId} techStackVersion={techStackVersion} />
        )}
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

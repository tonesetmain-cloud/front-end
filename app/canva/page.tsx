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

const CanvaPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  const [selectedId, setSelectedId] = useState<string>("");
  const [uiElementsVersion, setuiElementsVersion] =
    useState<UIElementsAttributes>();
  const [uiElementsVersions, setuiElementsVersions] =
    useState<UIElementsAttributes[]>();
  const [techStackVersion, setTechStackVersion] =
    useState<TechStachVersionsAttributes>();
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
        console.log("Fetching TechStack details for ID:", selectedId);
        const response = await axios.get(
          `${baseUrl}/business/get-tech-stack-all-versions/${selectedId}`,
          { withCredentials: true }
        );
        setTechStackVersions(response.data.data);
        setTechStackVersion(response.data.data[0]);
        console.log("TechStack Response:", response.data.data);
      } catch (error) {
        console.error("Error in TechStack component:", error);
      }
    };

    fetchData();
  }, [selectedId]);

  const handleVersionClick = (version: UIElementsAttributes) => {
    setuiElementsVersion(version);
  };

  return (
    <div className={styles.container}>
      <NavBar flag={true} />

      <TopMenu
        uiElementsVersions={uiElementsVersions!}
        handleVersionClick={handleVersionClick}
        screen={screen}
        setScreen={setScreen}
      />

      <Sidebar projectsData={projectsData!} setSelectedId={setSelectedId} />

      {/* render only when version data is available */}
      <div className={styles.uiElementsContainer}>
        {uiElementsVersion && screen == "ui-stuff" && (
          <UiElements id={selectedId} version={uiElementsVersion} />
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

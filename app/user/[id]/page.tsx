"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navbar/Navbar";
import styles from "./User.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithAuth from "@/components/WithAuth";
import { fetchProjects } from "../../canva/page";
import { UserType, projects } from "@/types/types";
import { useAuthToken } from "@/hooks/useAuthToken";

const User = () => {
  const params = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = useAuthToken();
  const [user, setUser] = useState<UserType>();
  const [projects, setProjects] = useState<projects[]>([]);

  const {
    data: projectsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", token],
    queryFn: () => fetchProjects(token!, baseUrl!),
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        if (!token) return;
        const response = await axios.get(
          `${baseUrl}3002/auth/get-user/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status == "success") {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [token, params]);

  return (
    <div className={styles.userScreen}>
      <NavBar />
      <div className={styles.userDetails}>
        <p>
          {user?.first_name} {user?.last_name}
        </p>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone_number}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonFree}>Logout</button>
        <button className={styles.buttonPro}>🔥 Get Pro</button>
      </div>
      <div className={styles.projects}>
        <h3>Your Projects</h3>
        {projectsData?.length > 0 ? (
          projectsData.map((project: any) => (
            <div className={styles.card} key={project.id}>
              <h3>{project.business_name}</h3>
              <p>Business Type: {project.business_type}</p>
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
};

export default function ProotectedUser() {
  return (
    <WithAuth>
      <User />
    </WithAuth>
  );
}

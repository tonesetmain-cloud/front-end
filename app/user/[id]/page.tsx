"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navbar/Navbar";
import styles from "./User.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithAuth from "@/components/WithAuth";
import { fetchProjects } from "@/lib/fetchProjects";
import { UserType, projects } from "@/types/types";
import { fetchUserId } from "@/lib/fetchUserId";

const User = () => {
  const params = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;
  const baseBusinessURL = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  const [user, setUser] = useState<UserType>();

  const {
    data: userIdData,
    isLoading: userIdLoading,
    error: userIdError,
  } = useQuery<string, Error>({
    queryKey: ["user"],
    queryFn: () => fetchUserId(baseUrl!),
  });

  const {
    data: projectsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", userIdData],
    queryFn: () => fetchProjects(baseBusinessURL!),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/auth/get-user/${params.id}`,
          {
            withCredentials: true,
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
  }, [params]);

  return (
    <div className={styles.userScreen}>
      <NavBar />
      <div className={styles.userDetails}>
        <div className={styles.nameContainer}>
          <span className={styles.firstName}>{user?.first_name}</span>{" "}
          <span className={styles.lastName}>{user?.last_name}</span>
          <img src="/images/user/1.jpg" alt="" className={styles.profilePic} />
        </div>

        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone_number}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonFree}>Logout</button>
        <button className={styles.buttonPro}>🔥 Get Pro</button>
      </div>
      <div className={styles.projects}>
        <h3>Your Projects</h3>
        <div className={styles.cardsContainer}>
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

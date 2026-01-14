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
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ProjectDetails from "@/components/profile/ProjectDetails";
import ProfileEditDetails from "@/components/profile/ProfileEditDetails";

const User = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;
  const baseBusinessURL = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  const [user, setUser] = useState<UserType>();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [reload, setReload] = useState(0);

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
  }, [params, reload]);

  const handleLogout = async () => {
    try {
      await axios.get(`${baseUrl}/auth/logout`, { withCredentials: true });
      queryClient.clear();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.userScreen}>
      <NavBar />
      <div className={styles.userDetails}>
        <div className={styles.editIcon}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => {
              setShowProfileEdit(true);
            }}
          />
        </div>
        {user && (
          <ProfileEditDetails
            show={showProfileEdit}
            setShowEdit={setShowProfileEdit}
            onClose={() => setShowProfileEdit(false)}
            setReload={setReload}
            user={{
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              phone_number: user.phone_number,
            }}
          />
        )}

        <div className={styles.nameContainer}>
          <span className={styles.firstName}>{user?.first_name}</span>{" "}
          <span className={styles.lastName}>{user?.last_name}</span>
          <img src="/images/user/1.jpg" alt="" className={styles.profilePic} />
        </div>

        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone_number}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonFree} onClick={handleLogout}>
          Logout
        </button>
        <button className={styles.buttonPro}>🔥 Get Pro</button>
      </div>
      <div className={styles.projects}>
        <h3>Your Projects</h3>
        <div className={styles.cardsContainer}>
          {Array.isArray(projectsData) && projectsData.length > 0 ? (
            projectsData.map((project) => (
              <div className={styles.card} key={project.id}>
                <h3>{project.business_name}</h3>
                <p>Business Type: {project.business_type}</p>
                <div className={styles.buttonWrapper}>
                  <button
                    className={styles.redirectCanva}
                    onClick={() => {
                      router.push("/canva");
                    }}>
                    Go To Canva Page &gt;
                  </button>
                </div>
                <div className={styles.buttonWrapper}>
                  <button
                    className={styles.projectDetailsBtn}
                    onClick={() => {
                      setShowProjectDetails(true);
                    }}>
                    Details
                  </button>
                </div>
                {user && projectsData && (
                  <ProjectDetails
                    project={project}
                    show={showProjectDetails}
                    onClose={() => setShowProjectDetails(false)}
                  />
                )}
              </div>
            ))
          ) : (
            <p></p>
          )}
          <div className={styles.card}>
            <p>Work with new Project</p>
            <button
              className={styles.buttonAdd}
              title="Add New"
              onClick={() => {
                router.push("/questions");
              }}>
              <svg
                className={styles.svgIcon}
                viewBox="0 0 24 24"
                height="100px"
                width="100px"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeWidth={1}
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                />
                <path strokeWidth={1} d="M8 12H16" />
                <path strokeWidth={1} d="M12 16V8" />
              </svg>
            </button>
          </div>
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

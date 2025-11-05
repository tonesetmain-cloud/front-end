"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navbar/Navbar";
import styles from "./User.module.css";
import axios from "axios";
import WithAuth from "@/components/WithAuth";
import { UserType, projects } from "@/types/types";
import { useAuthToken } from "@/hooks/useAuthToken";

const User = () => {
  const params = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = useAuthToken();
  const [user, setUser] = useState<UserType>();
  const [projects, setProjects] = useState<projects[]>([]);

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

  useEffect(() => {
    if (!token) return;
    const fetchBusinessDetails = async () => {
      try {
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
          console.log("qwaidgshbewad SGAVSDF ", response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchBusinessDetails();
  }, [token]);

  return (
    <div>
      <NavBar />
      <h1>hi</h1>
      <p>User param: {params.id}</p>
      <p>
        Name: {user?.first_name} {user?.last_name}
      </p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone_number}</p>
      <p>{projects[0]?.business_name}</p>
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

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navbar/Navbar";
import styles from "./User.module.css";
import axios from "axios";
import { UserType } from "@/types/types";
import { useAuthToken } from "@/hooks/useAuthToken";

const User = () => {
  const params = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = useAuthToken();
  const [user, setUser] = useState<UserType>();

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
        console.log(response.data.data);
        if (response.data.status == "success") {
          setUser(response.data.data);
        }

        console.log(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [token, params]);

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
    </div>
  );
};

export default User;

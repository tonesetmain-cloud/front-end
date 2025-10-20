"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type WithAuthProps = {
  children: React.ReactNode;
};

const WithAuth = ({ children }: WithAuthProps) => {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/signin");
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      try {
        const response = await axios.get(`${baseUrl}3002/auth/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status !== "success") {
          router.push("/signin");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        router.push("/signin");
      }
    };

    verifyToken();
  }, [router]);

  return <>{children}</>;
};

export default WithAuth;

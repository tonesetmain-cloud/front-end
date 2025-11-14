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
      const storedData = localStorage.getItem("authToken");
      if (!storedData) {
        router.push("/signin");
        return;
      }

      const { value: token, expiry } = JSON.parse(storedData);
      const now = new Date().getTime();

      // Check expiry
      if (now > expiry) {
        localStorage.removeItem("authToken");
        router.push("/signin");
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;
      try {
        const response = await axios.get(`${baseUrl}/auth/protected`, {
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

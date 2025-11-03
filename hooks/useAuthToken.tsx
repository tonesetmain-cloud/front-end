"use client";

import { useState, useEffect } from "react";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedData = localStorage.getItem("authToken");
    if (!storedData) {
      setToken(null);
      return;
    }

    try {
      const { value, expiry } = JSON.parse(storedData);
      const now = Date.now();

      if (now < expiry) {
        setToken(value);
      } else {
        localStorage.removeItem("authToken");
        setToken(null);
      }
    } catch (err) {
      console.error("Invalid token format:", err);
      localStorage.removeItem("authToken");
      setToken(null);
    }
  }, []);

  return token;
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBar from "@/components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../signup/SignUp.module.css";

const SignIn = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please enter both email and password.");
      return;
    }

    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${baseUrl}3002/auth/login`, payload);

      if (response.data.status == "error") {
        alert("Invalid credentials. Please try again.");
        return;
      }
      if (response.data.status == "success") {
        const token = response.data.data.token;

        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", token);
        }
        router.push("/canva");
      }
    } catch (error: unknown) {
      console.error("Error signing in user:", error);
      alert("Sign In failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <NavBar />
      <div className={styles.circle + " " + styles.large}></div>
      <div className={styles.circle + " " + styles.medium}></div>
      <div className={styles.circle + " " + styles.small}></div>
      <div className={styles.circle + " " + styles.xsmall}></div>
      <div className={styles.heading}> Sign In</div>

      <div className={styles.formCard}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" className={styles.btn} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBar from "@/components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import styles from "../signup/SignUp.module.css";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await axios.post(`${baseUrl}/auth/login`, payload, {
        withCredentials: true,
      });

      console.log("Sign In response:", response.data);

      if (response.data.status == "error") {
        alert("Invalid credentials. Please try again.");
        return;
      }
      if (response.data.status == "success") {
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
      <div className={`${styles.heading} ${styles.signInHeading}`}>Sign In</div>

      <div className={styles.formCard}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={styles.InputField}
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ position: "relative" }}>
            <Form.Label>Password</Form.Label>

            <Form.Control
              className={styles.InputField}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeLogo}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </Form.Group>

          <button className={styles.googleBtn} type="button">
            <FcGoogle size={22} />
            Sign in with Google
          </button>

          <Button variant="primary" className={styles.btn} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;

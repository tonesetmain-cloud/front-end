"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NavBar from "@/components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import styles from "./SignUp.module.css";
import Col from "react-bootstrap/Col";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Row from "react-bootstrap/Row";
import { FcGoogle } from "react-icons/fc";
import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient();

const SignUp = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
    if (data.password != data.confirmPassword) {
      alert("Your passwords are not matching!");
      return;
    }
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: "+" + data.phoneNumber,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, payload, {
        withCredentials: true,
      });
      if (response.data.status == "success") {
        if (typeof window !== "undefined") {
          const now = new Date();
          const expiry = now.getTime() + 60 * 60 * 1000; // 1 hour
        }
        router.push("/questions");
      }
    } catch (error: unknown) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL_AUTH}/auth/google`;
  };

  return (
    <div className={styles.formContainer}>
      <NavBar />
      <div className={styles.circle + " " + styles.large}></div>
      <div className={styles.circle + " " + styles.medium}></div>
      <div className={styles.circle + " " + styles.small}></div>
      <div className={styles.circle + " " + styles.xsmall}></div>
      <div className={styles.heading}> Sign Up</div>

      <div className={styles.formCard}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className={styles.InputField}
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="firstName"
                value={data.firstName}
                className={styles.InputField}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
                className={styles.InputField}
                value={data.lastName}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="validationCustom03">
            <Form.Label>Phone number</Form.Label>
            <PhoneInput
              country={"us"} // default country
              value={data.phoneNumber}
              onChange={(phone) =>
                setData((prev) => ({ ...prev, phoneNumber: phone }))
              }
              inputStyle={{ width: "100%" }}
              containerStyle={{ width: "100%" }}
              inputProps={{
                name: "phoneNumber",
                required: true,
              }}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ position: "relative" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                marginTop: "0.5rem",
              }}>
              <li
                className={styles.passwordCriteriaHeader}
                style={{ color: data.password.length >= 8 ? "green" : "red" }}>
                At least 8 characters
              </li>
              <li
                className={styles.passwordCriteriaHeader}
                style={{
                  color: /[A-Z]/.test(data.password) ? "green" : "red",
                }}>
                At least 1 uppercase letter
              </li>
              <li
                className={styles.passwordCriteriaHeader}
                style={{
                  color: /[a-z]/.test(data.password) ? "green" : "red",
                }}>
                At least 1 lowercase letter
              </li>
              <li
                className={styles.passwordCriteriaHeader}
                style={{ color: /\d/.test(data.password) ? "green" : "red" }}>
                At least 1 number
              </li>
              <li
                className={styles.passwordCriteriaHeader}
                style={{
                  color: /[\W_]/.test(data.password) ? "green" : "red",
                }}>
                At least 1 special character
              </li>
            </ul>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formConfirmPassword"
            style={{ position: "relative" }}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeLogo}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </Form.Group>

          <button
            className={styles.googleBtn}
            type="button"
            onClick={handleGoogleSignIn}>
            <FcGoogle size={22} />
            Sign up with Google
          </button>

          <Button variant="primary" className={styles.btn} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

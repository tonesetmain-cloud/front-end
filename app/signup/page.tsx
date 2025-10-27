"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NavBar from "@/components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./SignUp.module.css";
import Col from "react-bootstrap/Col";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Row from "react-bootstrap/Row";

const SignUp = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
      const response = await axios.post(
        `${baseUrl}3002/auth/register`,
        payload
      );
      if (response.data.status == "success") {
        const token = response.data.data.token;

        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", token);
        }
        router.push("/questions");
      }
    } catch (error: unknown) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
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

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Button
            variant="outline-danger"
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}3002/auth/google`)
            }>
            Continue with Google
          </Button> */}

          <Button variant="primary" className={styles.btn} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

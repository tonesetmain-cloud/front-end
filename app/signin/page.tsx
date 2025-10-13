"use client";

import React from "react";
import NavBar from "@/components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../signup/SignUp.module.css";

const SignIn = () => {
  return (
    <div className={styles.formContainer}>
      <NavBar />
      <div className={styles.circle + " " + styles.large}></div>
      <div className={styles.circle + " " + styles.medium}></div>
      <div className={styles.circle + " " + styles.small}></div>
      <div className={styles.circle + " " + styles.xsmall}></div>
      <div className={styles.heading}> Sign In</div>

      <div className={styles.formCard}>
        <Form className={styles.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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

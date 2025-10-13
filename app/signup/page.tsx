"use client";

import React from "react";
import NavBar from "@/components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./SignUp.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const SignUp = () => {
  return (
    <div className={styles.formContainer}>
      <NavBar />
      <div className={styles.circle + " " + styles.large}></div>
      <div className={styles.circle + " " + styles.medium}></div>
      <div className={styles.circle + " " + styles.small}></div>
      <div className={styles.circle + " " + styles.xsmall}></div>
      <div className={styles.heading}> Sign Up</div>

      <div className={styles.formCard}>
        <Form className={styles.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control required type="text" placeholder="First name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control required type="text" placeholder="Last name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="password" placeholder="Phone Number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Button variant="primary" className={styles.btn} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

"use client";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./Contact.module.css";

type Props = {};

const allowedDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
];

const Contact: React.FC<Props> = () => {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const email = (form.email as any).value;

    const domain = email.split("@")[1]?.toLowerCase();

    if (!allowedDomains.includes(domain)) {
      e.preventDefault();
      setError(
        `We only accept messages from these domains: ${allowedDomains.join(
          ", "
        )}.`
      );
      return;
    }

    setError("");
  };

  return (
    <Container className={styles.contactContainer}>
      <div className={styles.twoColumn}>
        <div className={styles.left}>
          <h2 className={styles.leftTitle}>Get in touch with us</h2>
          <p className={styles.leftDesc}>
            We’re here to help with anything you need. Whether you have a
            question, feedback, or just want to connect, drop us a message and
            we’ll get back to you.
          </p>
          <div className={styles.contactInfo}>
            <p className={styles.label}>Email Address</p>
            <p className={styles.value}>toneset.main@gmail.com</p>
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.subHeading}>
            We’d love to hear from you. Fill out the form below!
          </p>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <Form
            className={styles.contactForm}
            action="https://formspree.io/f/xzzwlolg"
            method="POST"
            onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    className={styles.inputField}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className={styles.inputField}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className={styles.formGroup}>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                name="subject"
                className={styles.inputField}
                required
              />
            </Form.Group>

            <Form.Group className={`mb-3 ${styles.formGroup}`}>
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your message..."
                name="message"
                className={styles.inputField}
                required
              />
            </Form.Group>

            <Button type="submit" className={styles.submitBtn}>
              Send Message
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Contact;

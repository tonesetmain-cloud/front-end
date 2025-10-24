"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Navbar.module.css";
import { useTheme } from "../../context/ThemeContext";

import { useRouter } from "next/navigation";

type props = {
  flag?: boolean;
};

const NavBar: React.FC<props> = ({ flag }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const toggleThemeFunction = () => {
    toggleTheme();
    console.log("Toggled theme to:", theme === "light" ? "dark" : "light");
  };

  return (
    <Navbar
      className={`${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } sticky-top ${styles["navbar-text-size"]}`}
      expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={
              theme === "dark"
                ? "/images/logo/logo.svg"
                : "/images/logo/logo-2.svg"
            }
            className={`d-inline-block align-top ${styles["brand-logo"]}`}
            alt="Tone Set Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {flag == false ? (
            <Nav className="me-auto">
              <Nav.Link href="#welcome">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#yet-to-come">
                  Yet To Come Features
                </NavDropdown.Item>
                <NavDropdown.Item href="#pricing">Pricing</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              {/* this is antest of the hero in the  */}
            </Nav>
          ) : (
            <Nav className="me-auto"> </Nav>
          )}

          {!flag && (
            <>
              <button
                className={styles["sign-up"]}
                onClick={() => router.push("/signup")}>
                Sign Up
              </button>
              <button
                className={styles["sign-in"]}
                onClick={() => router.push("/signin")}>
                Sign In
              </button>
            </>
          )}

          <input
            type="checkbox"
            className={styles["theme-checkbox"]}
            id="custom-theme-switch"
            onChange={toggleThemeFunction}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

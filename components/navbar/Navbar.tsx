"use client";

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Navbar.module.css";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { useAuthToken } from "@/hooks/useAuthToken";

type Props = {
  flag?: boolean;
  home?: boolean;
};
type DecodedToken = {
  id?: string;
  userId?: string;
  sub?: string;
};

const NavBar: React.FC<Props> = ({ flag, home = false }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const tokenStored = useAuthToken();
  const [userId, setuserId] = useState<string>();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 55);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) return;
    try {
      const decoded = jwtDecode<DecodedToken>(storedToken);
      const id = decoded.userId || decoded.id || decoded.sub;
      if (id) setuserId(id);
    } catch {
      setuserId(undefined);
    }
  }, []);

  const toggleThemeFunction = () => {
    toggleTheme();
    console.log("Toggled theme to:", theme === "light" ? "dark" : "light");
  };

  return (
    <Navbar
      className={`sticky-top ${styles["navbar-text-size"]} ${
        home ? "" : styles.nonCurve
      } `}
      expand="lg">
      <Container
        fluid
        className={`${home ? styles.curve : styles.scrolled} ${
          scrolled ? styles.scrolled : ""
        }`}>
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
          {flag === false ? (
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
            </Nav>
          ) : (
            <Nav className="me-auto" />
          )}

          {/* Show Sign In / Up only if there's no token */}
          {!tokenStored && !flag && (
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

          {tokenStored && (
            <FontAwesomeIcon
              className={styles.userIcon}
              onClick={() => router.push(`/user/${userId}`)}
              icon={faUser}
              size="lg"
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

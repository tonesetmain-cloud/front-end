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
import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchUserId } from "@/lib/fetchUserId";

type Props = {
  flag?: boolean;
  home?: boolean;
};

const NavBar: React.FC<Props> = ({ flag, home = false }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 55);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    data: userIdData,
    isLoading: userIdLoading,
    error: userIdError,
  } = useQuery<string, Error>({
    queryKey: ["user"],
    queryFn: () => fetchUserId(baseUrl!),
  });

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
        <Navbar.Brand
          role="button"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}>
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
          {!flag && !userIdData && (
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

          {userIdData && (
            <FontAwesomeIcon
              className={styles.userIcon}
              onClick={() => router.push(`/user/${userIdData}`)}
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

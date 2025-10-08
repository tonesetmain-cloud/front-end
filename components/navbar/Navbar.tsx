"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Navbar.module.css";
import { useTheme } from "../../context/ThemeContext";

function NavBar() {
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
        <Navbar.Brand href="#home">
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
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            {/* this is antest of the hero in the  */}
          </Nav>
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
}

export default NavBar;

import React from "react";
import ColorPalette from "./cards/ColorPalette";
import Fonts from "./cards/Fonts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./UiElements.module.css";
import { projects, UIElementsAttributes } from "@/types/types";
import UserFlow from "./cards/UserFlow";

const fontsStaticData = {
  h1: {
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: "700",
    fontSize: "48px",
    lineHeight: "1.1",
  },
  h2: {
    fontFamily: "Outfit, system-ui",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "1.2",
  },
  h3: {
    fontFamily: "Outfit, system-ui",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "1.25",
  },
  h4: {
    fontFamily: "Dancing Script, cursive",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "1.3",
  },
  h5: {
    fontFamily: "Space Grotesk, sans-serif",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "1.4",
  },
  h6: {
    fontFamily: "Space Grotesk, sans-serif",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "1.4",
  },
  p: {
    fontFamily: "Rubik, sans-serif",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

const nodesData = [
  { id: "landing", label: "Landing Page", type: "input" },
  { id: "collections", label: "Collections Page" },
  { id: "product", label: "Product Detail Page" },
  { id: "cart", label: "Cart Page" },
  { id: "checkout", label: "Checkout Page" },
  { id: "confirmation", label: "Confirmation Page" },
  { id: "signin", label: "Sign In Page" },
  { id: "signup", label: "Sign Up Page" },
  { id: "dashboard", label: "Account Dashboard" },
  { id: "sustainability", label: "Sustainability Page" },
  { id: "blog", label: "Community Page" },
];

const edgesData = [
  { id: "e1", source: "landing", target: "collections", label: "Shop Now" },
  {
    id: "e2",
    source: "collections",
    target: "product",
    label: "Click Product",
  },
  { id: "e3", source: "product", target: "cart", label: "Add to Cart" },
  { id: "e4", source: "cart", target: "checkout", label: "Checkout" },
  {
    id: "e5",
    source: "checkout",
    target: "confirmation",
    label: "Payment Success",
  },
  {
    id: "e6",
    source: "checkout",
    target: "cart",
    label: "Payment Fail (Retry)",
  },
  { id: "e7", source: "landing", target: "signin", label: "Sign In" },
  { id: "e8", source: "landing", target: "signup", label: "Sign Up" },
  { id: "e9", source: "signin", target: "dashboard", label: "Success" },
  {
    id: "e10",
    source: "signup",
    target: "dashboard",
    label: "Complete Onboarding",
  },
  {
    id: "e11",
    source: "landing",
    target: "sustainability",
    label: "Learn More",
  },
  { id: "e12", source: "landing", target: "blog", label: "Community" },
  {
    id: "e13",
    source: "confirmation",
    target: "dashboard",
    label: "Track Order",
  },
];

type props = {
  id: string;
  version: UIElementsAttributes;
};

const UiElements: React.FC<props> = ({ id, version }) => {
  console.log("Light Colors:", version.light_theme_colors);
  console.log("Dark Colors:", version.dark_theme_colors);
  console.log("Accent Colors:", version.accent_colors);
  console.log("Fonts:", version.fonts);
  console.log("nodesData:", version.user_flow.nodes_data);
  console.log("edgesData:", version.user_flow.edges_data);
  return (
    <div>
      <div className={`d-flex justify-content-center ${styles.uiElementsPage}`}>
        <Container fluid>
          <Row className={`justify-content-center g-5 ${styles.uiContainer}`}>
            <Col xs="auto">
              <ColorPalette
                colors={version.light_theme_colors}
                title=" Color Palette for Light Theme"
              />
              <ColorPalette
                colors={version.dark_theme_colors}
                title=" Color Palette for Dark Theme"
              />
              <ColorPalette
                colors={version.accent_colors}
                title="Accent Color Palette"
              />
            </Col>
            <Col xs="auto">
              <Fonts fonts={version.fonts} />
            </Col>
            <Col xs>
              <UserFlow
                nodesData={version.user_flow.nodes_data}
                edgesData={version.user_flow.edges_data}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UiElements;

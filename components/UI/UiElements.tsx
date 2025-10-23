import React from "react";
import ColorPalette from "./cards/ColorPalette";
import Fonts from "./cards/Fonts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./UiElements.module.css";
import UserFlow from "./cards/UserFlow";

const fontsStaticData = {
  h1: {
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "48px",
    lineHeight: "1.2",
  },
  h2: {
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "1.3",
  },
  h3: {
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "1.3",
  },
  h4: {
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "1.4",
  },
  h5: {
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "1.4",
  },
  h6: {
    fontFamily: "Poppins, sans-serif",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  p: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

const UiElements = () => {
  return (
    <div>
      <h1>UI</h1>
      <div className="d-flex justify-content-center">
        <Container>
          <Row>
            <Col>
              <ColorPalette
                colors={["#FF3B30", "#E53935", "#8B0000", "#1C1C1C", "#3A3A3A"]}
                title=" Color Palette for Light Theme"
              />
              <ColorPalette
                colors={["#FF6B61", "#FF6659", "#D32F2F", "#E0E0E0", "#B0B0B0"]}
                title=" Color Palette for Dark Theme"
              />
              <ColorPalette
                colors={["#FFC107", "#1ABC9C", "#FF6F3C", "#3498DB", "#FF8DAA"]}
                title="Accent Color Palette"
              />
            </Col>
            <Col>
              <Fonts fonts={fontsStaticData} />
            </Col>
            <Col>
              <UserFlow />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UiElements;

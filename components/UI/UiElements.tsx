import React from "react";
import ColorPalette from "./cards/ColorPalette";
import Fonts from "./cards/Fonts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./UiElements.module.css";
import { projects, UIElementsAttributes } from "@/types/types";
import UserFlow from "./cards/UserFlow";

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

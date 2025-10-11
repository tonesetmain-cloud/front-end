import React from "react";
import Card from "./cards/Card";
import styles from "./MainFeatures.module.css";
import {
  faBullseye,
  faMicrochip,
  faPalette,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputerMouse } from "@fortawesome/free-solid-svg-icons";

const MainFeatures = () => {
  return (
    <div  id="features" className={styles.mainFeatures}>
      <h2 className={styles.title}> Our Main Features</h2>
      <div className={styles.container}>
        <Card
          title={"Personalized Results"}
          description={
            "Tailored color palettes and templates designed specifically for your industry and brand personality"
          }
          icon={
            <FontAwesomeIcon
              icon={faBullseye}
              size="1x"
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"Easy-to-Use"}
          description={
            "Whether you're a designer or a business owner, our clean interface and intuitive flow make the process fast and fun."
          }
          icon={
            <FontAwesomeIcon
              icon={faComputerMouse}
              size="1x"
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"High-Quality Palettes"}
          description={
            "We consider emotional tone, and accessibility to ensure your colors don’t just look good: they work."
          }
          icon={
            <FontAwesomeIcon
              icon={faPalette}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"24/7 Support Available"}
          description={
            "Our team is available around the clock to assist you; whether you're stuck, curious, or just need a helping hand."
          }
          icon={
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"AI-Powered"}
          description={
            "Using the power of OpenAI, our system understands your brand’s values to generate purpose-driven color palettes."
          }
          icon={
            <FontAwesomeIcon
              icon={faMicrochip}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
      </div>
    </div>
  );
};

export default MainFeatures;

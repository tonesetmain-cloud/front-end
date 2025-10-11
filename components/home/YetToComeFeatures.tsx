import React from "react";
import Card from "./cards/Card";
import styles from "./MainFeatures.module.css";
import {
  faBullseye,
  faClock,
  faDatabase,
  faPenFancy,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MainFeatures = () => {
  return (
    <div className={styles.mainFeatures}>
      <h2 className={styles.title}> Our Yet To Come Features</h2>
      <div className={styles.container}>
        <Card
          title={"Project Roadmap "}
          description={
            "Answer a few questions and get a detailed development roadmap with phases, priorities, and timelines."
          }
          icon={
            <FontAwesomeIcon
              icon={faRoad}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"Time & Cost Estimator"}
          description={
            "Estimate how long your project might take and what it could cost, whether you're hiring or building solo."
          }
          icon={
            <FontAwesomeIcon
              icon={faClock}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"Logo Style Suggestion"}
          description={
            "Answer a few brand questions and get creative ideas for logo styles (minimal, playful, bold, etc.) that fit your identity."
          }
          icon={
            <FontAwesomeIcon
              icon={faPenFancy}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
        <Card
          title={"Database Helper"}
          description={
            "Just share your app idea and we’ll suggest a basic database layout with key tables and relationships."
          }
          icon={
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ color: "var(--royal-blue)" }}
            />
          }
        />
      </div>
    </div>
  );
};

export default MainFeatures;

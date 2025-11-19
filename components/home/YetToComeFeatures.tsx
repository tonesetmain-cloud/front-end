"use client";
import React, { useEffect } from "react";
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
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.animateUp}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div id="yet-to-come" className={styles.mainFeatures}>
      <h2 className={styles.title}>Our Yet To Come Features</h2>
      <div className={styles.twoColumn}>
        <div className={styles.YTFleft}>
          {[
            {
              title: "Project Roadmap",
              desc: "Answer a few questions and get a detailed development roadmap with phases, priorities, and timelines.",
              icon: faRoad,
            },
            {
              title: "Time & Cost Estimator",
              desc: "Estimate how long your project might take and what it could cost, whether you're hiring or building solo.",
              icon: faClock,
            },
            {
              title: "Logo Style Suggestion",
              desc: "Answer a few brand questions and get creative ideas for logo styles (minimal, playful, bold, etc.) that fit your identity.",
              icon: faPenFancy,
            },
            {
              title: "Database Helper",
              desc: "Just share your app idea and we’ll suggest a basic database layout with key tables and relationships you need.",
              icon: faDatabase,
            },
            {
              title: "Feature Breakdown",
              desc: "(Epics → Stories) Turn your idea into a clean breakdown: main features, user stories, tasks, and priority order.",
              icon: faBullseye,
            },
          ].map((item, i) => (
            <div key={i} className={styles.animateUp}>
              <Card
                title={item.title}
                description={item.desc}
                icon={
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: "var(--royal-blue)" }}
                  />
                }
              />
            </div>
          ))}
        </div>

        <div className={styles.YTFright + " " + styles.container}>
          {" "}
          <img src="/images/features/yetFeatures.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainFeatures;

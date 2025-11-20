"use client";
import React, { useEffect } from "react";
import Card from "./cards/Card";
import styles from "./MainFeatures.module.css";
import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faMicrochip,
  faPalette,
  faPhone,
  faComputerMouse,
} from "@fortawesome/free-solid-svg-icons";

const MainFeatures = () => {
  const { theme } = useTheme();

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
    <div id="features" className={styles.mainFeatures}>
      <h2 className={styles.title}>Our Main Features</h2>

      <div className={styles.twoColumn}>
        {/* LEFT - Sticky Image */}
        {theme === "dark" ? (
          <div className={styles.left}>
            <img src="/images/features/mainFeaturesDark.png" alt="" />
          </div>
        ) : (
          <div className={styles.left}>
            <img src="/images/features/mainFeatures.png" alt="" />
          </div>
        )}

        {/* RIGHT - Cards */}
        <div className={styles.right + " " + styles.container}>
          {[
            {
              title: "Personalized Results",
              desc: "Tailored color palettes and templates designed specifically for your industry and brand personality",
              icon: faBullseye,
            },
            {
              title: "Easy-to-Use",
              desc: "Whether you're a designer or a business owner, our clean interface makes the process fast and fun.",
              icon: faComputerMouse,
            },
            {
              title: "High-Quality Palettes",
              desc: "We consider emotional tone, and accessibility to ensure your colors don’t just look good: they work.",
              icon: faPalette,
            },
            {
              title: "24/7 Support Available",
              desc: "Our team is available around the clock to assist you; whether you're stuck, or just need a helping hand.",
              icon: faPhone,
            },
            {
              title: "AI-Powered",
              desc: "Using the power of OpenAI, our system understands your brand’s values to generate purpose driven results.",
              icon: faMicrochip,
            },
          ].map((item, i) => (
            <div key={i} className={styles.animateUp}>
              <Card
                title={item.title}
                description={item.desc}
                icon={
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="1x"
                    style={{ color: "var(--royal-blue)" }}
                  />
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainFeatures;

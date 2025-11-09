"use client";
import React, { useEffect, useState } from "react";
import styles from "./Welcome.module.css";
import { useTheme } from "@/context/ThemeContext";
import LiquidEther from "@/components/home/LiquidEther";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  const { theme } = useTheme(); // grab the current theme
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    console.log(scrolled);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    router.push("/canva");
  };

  return (
    <div id="welcome" className={styles.container}>
      <div className={`${styles.menuBar} ${scrolled ? "" : styles.liquidBg}`}>
        <LiquidEther
          colors={
            theme === "dark"
              ? ["#12002f", "#1b003d", "#000000"] // dark theme colors
              : ["#5227FF", "#FF9FFC", "#B19EEF"] // light theme colors
          }
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.text}>
        <h1 className={styles.title}>
          An application that helps you set the tone for your project
        </h1>
        <p className={styles.description}>
          Tone Set is a tool that helps you build accurate design components for
          your website. It follows color theory so your design stays consistent
          and balanced. We’re also working on simple UI templates, like Figma
          but adjusted to your brand, so you can move faster and go from idea to
          ready-to-use design. Of course, there are many solutions online. But
          here you don’t just get another generic solution. You get something
          practical, clear, and made to fit your needs. That’s why Tone Set can
          be the best choice for you: less noise, more focus, and results you
          can trust.
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.buttonFree} onClick={handleClick}>
          Get Started For Free
        </button>
        <button className={styles.buttonPro}>🔥 Get Pro</button>
      </div>
    </div>
  );
};

export default Welcome;

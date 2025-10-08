import React from "react";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.circle + " " + styles.large}></div>
      <div className={styles.circle + " " + styles.medium}></div>
      <div className={styles.circle + " " + styles.small}></div>
      <div className={styles.circle + " " + styles.xsmall}></div>

      <h1 className={styles.title}>
        An application that helps you set the tone for your project
      </h1>
      <p className={styles.description}>
        Tone Set is a tool that helps you build accurate design components for
        your website. It follows color theory so your design stays consistent
        and balanced. We’re also working on simple UI templates, like Figma but
        adjusted to your brand, so you can move faster and go from idea to
        ready-to-use design. Of course, there are many solutions online. But
        here you don’t just get another generic solution. You get something
        practical, clear, and made to fit your needs. That’s why Tone Set can be
        the best choice for you: less noise, more focus, and results you can
        trust.
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonFree}>Get Started For Free</button>
        <button className={styles.buttonPro}>🔥 Get Pro</button>
      </div>
    </div>
  );
};

export default Welcome;

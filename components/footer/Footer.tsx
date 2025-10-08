"use client";

import React from "react";
import styles from "./Footer.module.css";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <img
          src={
            theme === "dark"
              ? "/images/logo/logo.svg"
              : "/images/logo/logo-2.svg"
          }
          alt="Tone Set"
          className={styles.logo}
        />
      </div>
      <div className={styles.linksSection}>
        <div>
          <h4>Useful Links</h4>
          <a href="/blog">Blog</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
        </div>
        <div>
          <h4>Terms</h4>
          <a href="/tos">TOS</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/refund">Refund Policy</a>
        </div>
        <div>
          <h4>Support & Help</h4>
          <a href="/support">Open Support Ticket</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

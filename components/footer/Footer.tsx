"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

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
          <Link href="/blog">Blog</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </div>

        <div>
          <h4>Terms</h4>
          <Link href="/tos">TOS</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/refund">Refund Policy</Link>
        </div>

        <div>
          <h4>Support & Help</h4>
          <Link href="/support">Open Support Ticket</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

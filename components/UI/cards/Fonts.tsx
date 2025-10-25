"use client";
import React from "react";
import styles from "./Fonts.module.css";

type props = {
  fonts: {
    [key: string]: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
  };
};

const Fonts: React.FC<props> = ({ fonts }) => {
  const handleCopy = (style: React.CSSProperties) => {
    navigator.clipboard.writeText(JSON.stringify(style));
    alert(`Copied style to clipboard`);
  };
  return (
    <div className={styles.card}>
      <h5>Font Styles</h5>
      {Object.entries(fonts).map(([tag, style], index) => (
        <div key={index} className={styles.fontRow}>
          <div className={styles.fontLabel}>{tag.toUpperCase()}</div>
          {tag === "p" ? (
            <div
              className={styles.fontSample}
              style={style}
              onClick={() => handleCopy(style)}>
              {`Paragraph`}
            </div>
          ) : (
            <div
              className={styles.fontSample}
              style={style}
              onClick={() => handleCopy(style)}>
              {`Heading`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Fonts;

"use client";

import React from "react";
import styles from "./ColorPalette.module.css";

type props = {
  colors: string[];
  title: string;
};
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ColorPalette: React.FC<props> = ({ colors, title }) => {
  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard`);
  };

  return (
    <div className={styles.card}>
      <h5>{title}</h5>
      {colors.map((color, index) => (
        <div key={index} className={styles.colorRow}>
          <div
            className={styles.color}
            onClick={() => handleCopy(hexToRgba(color, 1))}
            style={{ backgroundColor: hexToRgba(color, 1) }}></div>
          <div
            className={styles.color}
            onClick={() => handleCopy(hexToRgba(color, 0.8))}
            style={{ backgroundColor: hexToRgba(color, 0.8) }}></div>
          <div
            className={styles.color}
            onClick={() => handleCopy(hexToRgba(color, 0.6))}
            style={{ backgroundColor: hexToRgba(color, 0.6) }}></div>
          <div
            className={styles.color}
            onClick={() => handleCopy(hexToRgba(color, 0.4))}
            style={{ backgroundColor: hexToRgba(color, 0.4) }}></div>
          <div
            className={styles.color}
            onClick={() => handleCopy(hexToRgba(color, 0.25))}
            style={{ backgroundColor: hexToRgba(color, 0.25) }}></div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;

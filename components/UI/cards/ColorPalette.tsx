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

  const [isMaximized, setIsMaximized] = React.useState(false);
  return (
    <div className={styles.overlayWrapper}>
      {isMaximized && <div className={styles.pageBlur}></div>}
      <div className={`${styles.card} ${isMaximized ? styles.fullscreen : ""}`}>
        <div className="MacButtons">
          <button className="redButton" onClick={() => setIsMaximized(false)} />
          <button
            className="greenButton"
            onClick={() => setIsMaximized(true)}
          />
        </div>

        {!isMaximized ? (
          <>
            <h6>{title}</h6>
            {colors.map((color, index) => (
              <div key={index} className={styles.colorRow}>
                {[1, 0.8, 0.6, 0.4, 0.25].map((alpha) => (
                  <div
                    key={alpha}
                    className={styles.color}
                    onClick={() => handleCopy(hexToRgba(color, alpha))}
                    style={{ backgroundColor: hexToRgba(color, alpha) }}
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            <h6>{title}</h6>
            {colors.map((color, index) => (
              <div key={index} className={styles.colorRowMaxScreen}>
                {[1, 0.8, 0.6, 0.4, 0.25].map((alpha) => {
                  const rgba = hexToRgba(color, alpha);
                  return (
                    <div className={styles.tooltipWrapper} key={alpha}>
                      <div
                        className={styles.colorMaxScreen}
                        data-color={rgba}
                        onClick={() => handleCopy(rgba)}
                        style={{ backgroundColor: rgba }}
                      />
                      <span className={styles.tooltip}>
                        This is the reason for choosing this color. This is the
                        reason for choosing this color. This is the reason for
                        choosing this color. This is the reason for choosing
                        this color {rgba}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColorPalette;

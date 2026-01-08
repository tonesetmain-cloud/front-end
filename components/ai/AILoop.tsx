import React from "react";
import styles from "./AILoop.module.css";

const AILoop: React.FC = () => {
  return (
    <div className={styles.siriorbContainer}>
      <h3>Generating...</h3>
      <div className={styles.blobs}>
        <svg viewBox="0 0 1200 1200">
          {[1, 2, 3, 4].map((i) => (
            <g
              key={`blob-${i}`}
              className={`${styles.blob} ${styles[`blob-${i}`]}`}>
              <path />
            </g>
          ))}
          {[1, 2, 3, 4].map((i) => (
            <g
              key={`blob-alt-${i}`}
              className={`${styles.blob} ${styles[`blob-${i}`]} alt`}>
              <path />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default AILoop;

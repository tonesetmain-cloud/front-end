import React from "react";
import styles from "./SystemDesign.module.css";

type props = {
  id: string;
};

const SystemDesign: React.FC<props> = ({ id }) => {
  return (
    <div className={styles.systemDesignPage}>
      <div className={styles.objects}></div>
      <div className={styles.editField}>
        <h1>System Design</h1>
        <h4>{id}</h4>
      </div>
    </div>
  );
};

export default SystemDesign;

import React from "react";
import styles from "./SystemDesign.module.css";

type props = {
  id: string;
};

const SystemDesign: React.FC<props> = ({ id }) => {
  return (
    <div className={styles.systemDesignPage}>
      <h4>This feature is locked for now 🔒 We’re working on it.</h4>
      {/* <div className={styles.objects}></div>
      <div className={styles.editField}>
        <h1>System Design</h1>
      </div> */}
      å
    </div>
  );
};

export default SystemDesign;

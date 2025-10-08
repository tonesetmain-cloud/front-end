import React from "react";
import styles from "./Card.module.css";

type props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Card: React.FC<props> = ({ title, description, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Card;

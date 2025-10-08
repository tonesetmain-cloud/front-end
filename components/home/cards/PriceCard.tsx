import React from "react";
import styles from "./PriceCard.module.css";

const PriceCard = ({
  title,
  price,
  description,
  features,
}: {
  title: string;
  price: string;
  description?: string;
  features: string[];
}) => {
  const [mainPrice, period] = price.split(" /");
  return (
    <div className={styles.priceCard}>
      <div className={styles.circle + " " + styles.large}></div>
      <div className={styles.circle + " " + styles.medium}></div>
      <div className={styles.circle + " " + styles.small}></div>
      <div className={styles.circle + " " + styles.xsmall}></div>
      <div className={styles.priceRow}>
        <h4 className={styles.price}>
          {mainPrice} <span className={styles.period}>/{period}</span>
        </h4>
        <h5 className={styles.title}>{title}</h5>
      </div>

      <p className={styles.description}>{description}</p>
      <button className={styles.selectPlanButton}>Select Plan</button>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PriceCard;

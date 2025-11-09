import React from "react";
import styles from "./Cards.module.css"; // optional CSS for styling

type CardProps = {
  title: string;
  stack: Record<string, any>;
};

const Card: React.FC<CardProps> = ({ title, stack }) => {
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

        {isMaximized ? (
          <>
            <h3 className={styles.cardTitle}>{title}</h3>
            <ul className={styles.stackList}>
              {Object.entries(stack).map(([cat, details]) => (
                <li key={cat}>
                  <p>
                    <b>Name:</b> {details.name}
                  </p>
                  <p>
                    <b>Estimated Cost Per Month:</b>{" "}
                    {details.estimatedCostPerMonth}
                  </p>
                  {details.reason && <p>{details.reason}</p>}
                  {details.docs && <p>{details.docs}</p>}
                  {details.alternatives && <p>{details.alternatives}</p>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className={styles.cardTitle}>{title}</h3>
            <ul className={styles.stackList}>
              {Object.entries(stack).map(([cat, details]) => (
                <li key={cat}>
                  <p>
                    <b>Name:</b> {details.name}
                  </p>
                  <p>
                    <b>Estimated Cost Per Month:</b>{" "}
                    {details.estimatedCostPerMonth}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;

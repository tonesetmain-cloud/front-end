import React from "react";
import styles from "./Cards.module.css"; // optional CSS for styling

type CardProps = {
  title: string;
  stack: Record<string, any>;
};

const Card: React.FC<CardProps> = ({ title, stack }) => {
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [titleName, setTitleName] = React.useState("");
  return (
    <div className={styles.overlayWrapper}>
      {isMaximized && <div className={styles.pageBlur}></div>}
      <div className={`${styles.card} ${isMaximized ? styles.fullscreen : ""}`}>
        <div className="MacButtons">
          <button
            className="dissableButton"
            onClick={() => setIsMaximized(false)}
          />
          <button
            className="greenButton"
            onClick={() => setIsMaximized(!isMaximized)}
          />
          <p className="title">{title}</p>
        </div>

        {isMaximized ? (
          <div className={styles.cardContent}>
            <ul className={styles.stackList}>
              {Object.entries(stack)
                .filter(([key]) => key !== "id" && key !== "version_id")
                .map(([cat, details]) => (
                  <li key={cat}>
                    <h6>
                      <b> {cat}</b>
                    </h6>
                    <div className={styles.detailsBox}>
                      <p className={styles.name}>{details.name}</p>
                      <p className={styles.price}>
                        {details.estimatedCostPerMonth}
                      </p>
                    </div>
                    {details.reason && <p>{details.reason}</p>}
                    {details.docs && <p>{details.docs}</p>}
                    {details.alternatives && <p>{details.alternatives}</p>}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className={styles.cardContent}>
            <ul className={styles.stackList}>
              {Object.entries(stack)
                .filter(([key]) => key !== "id" && key !== "version_id")
                .map(([cat, details]) => (
                  <li key={cat}>
                    <h6>
                      <b> {cat}</b>
                    </h6>
                    <div className={styles.detailsBox}>
                      <p className={styles.name}>{details.name}</p>
                      <p className={styles.price}>
                        {details.estimatedCostPerMonth}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

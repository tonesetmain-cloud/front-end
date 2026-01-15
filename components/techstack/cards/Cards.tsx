import React from "react";
import styles from "./Cards.module.css"; // optional CSS for styling

type CardProps = {
  title: string;
  stack: Record<string, any>;
  dragHandleProps?: {
    attributes: any;
    listeners: any;
    setActivatorNodeRef: (node: HTMLElement | null) => void;
  };
};

const Card: React.FC<CardProps> = ({ title, stack, dragHandleProps }) => {
  const [isMaximized, setIsMaximized] = React.useState(false);

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

          <div
            className="MacButtonsDragArea"
            ref={dragHandleProps?.setActivatorNodeRef}
            {...dragHandleProps?.attributes}
            {...dragHandleProps?.listeners}
            style={{ cursor: "grab" }}>
            <p className="title">{title}</p>
          </div>
        </div>

        {isMaximized ? (
          <div className={styles.cardContent}>
            <ul className={styles.stackListMaximized}>
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
                    {details.reason && (
                      <p className={styles.maximizedPara}>
                        <b>Reason for picking this: </b>
                        {details.reason}
                      </p>
                    )}
                    {details.docs && (
                      <div className={styles.maximizedPara}>
                        <b>Documentation: </b>
                        <a
                          href={details.docs}
                          target="_blank"
                          rel="noopener noreferrer">
                          {details.docs}
                        </a>
                      </div>
                    )}
                    {details.alternatives && (
                      <p className={styles.maximizedPara}>
                        <b>Alternatives: </b>
                        {(details.alternatives as string[]).join(", ")}
                      </p>
                    )}
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

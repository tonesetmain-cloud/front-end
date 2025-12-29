import React from "react";
import { projects } from "@/types/types";
import Modal from "react-bootstrap/Modal";
import styles from "./EditDetails.module.css";
type props = {
  project: projects;
  show: boolean;
  onClose: React.Dispatch<React.SetStateAction<void>>;
};

const ProjectDetails: React.FC<props> = ({ project, show, onClose }) => {
  console.log("project details", project);
  const filtered = Object.entries(project).filter(
    ([key, value], i) =>
      key !== "updatedAt" &&
      key !== "user_id" &&
      key !== "id" &&
      key != "createdAt"
  );
  console.log("filterd array", filtered);

  return (
    <div>
      <Modal
        show={show}
        centered
        onHide={onClose}
        contentClassName={styles.darkModal}>
        <Modal.Header closeButton>
          <Modal.Title>Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre className={styles.Modal}>
            &#123;
            {filtered.map(([key, value], i) => {
              let valueClass = styles.jsonValue;

              if (typeof value === "boolean") {
                valueClass = value
                  ? styles.jsonBoolean
                  : styles.jsonBooleanFalse;
              }

              let displayValue = "";
              if (value === null) displayValue = "null";
              else if (value === undefined) displayValue = "undefined";
              else if (typeof value === "string") displayValue = `"${value}"`;
              else displayValue = value.toString();

              return (
                <div key={i}>
                  <span className={styles.jsonKey}>"{key}"</span>:{" "}
                  <span className={valueClass}>{displayValue}</span>
                  {i < filtered.length - 1 ? "," : ""}
                </div>
              );
            })}
            &#125;
          </pre>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectDetails;

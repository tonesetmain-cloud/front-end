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
          <div>
            <div key={project.id}>
              <p>Business Name: {project.business_name}</p>
              <p>Business Type: {project.business_type}</p>
              <p>Target Audience: {project.target_audience}</p>
              <p>Brand Personality: {project.brand_personality}</p>
              <p>Brand Style: {project.brand_style}</p>
              <p>Brand Emotion: {project.brand_emotion}</p>
              <p>Preferred Colors: {project.preferred_colors}</p>
              <p>Color Theme: {project.color_theme}</p>
              <p>Core Values: {project.core_values}</p>
              <p>Branding Purpose: {project.branding_purpose}</p>
              <p>Admired Competitors: {project.admired_competitors}</p>
              <p>Geographic Influences: {project.geographic_influences}</p>
              <p>
                Wants Secondary Colors:
                {project.wants_secondary_colors ? "Yes" : "No"}
              </p>
              <p>
                Differentiate Competitor Colors:
                {project.differentiate_competitor_colors}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectDetails;

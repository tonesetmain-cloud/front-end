import React, { useEffect } from "react";
import styles from "./TechStack.module.css";
import Card from "./cards/Cards";
import axios from "axios";

type props = { id: string; techStackVersion: any };

const TechStack: React.FC<props> = ({ id, techStackVersion }) => {
  const baseURLBusiness = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  console.log("ksghdabb iwbd", techStackVersion);

  return (
    <div className={`d-flex justify-content-center ${styles.techStackPage}`}>
      <Card title="Frontend" stack={techStackVersion.frontend} />
      <Card title="Backend" stack={techStackVersion.backend} />
      <Card
        title="Cloud Services Frontend"
        stack={techStackVersion.frontendCloudService}
      />
      <Card
        title="Cloud Services Backend"
        stack={techStackVersion.backendCloudService}
      />
      <Card title="DevOps" stack={techStackVersion.devOps} />
      <Card title="Testing" stack={techStackVersion.testing} />
      <Card
        title="Analytics & Productivity"
        stack={techStackVersion.analyticsTools}
      />
      <Card
        title="Communication Tools"
        stack={techStackVersion.communicationTools}
      />
      <Card title="Security" stack={techStackVersion.security} />
      <Card title="AI Automation" stack={techStackVersion.aiAutomation} />

      <Card title="Mobile" stack={techStackVersion.mobile} />
    </div>
  );
};

export default TechStack;

import React, { useEffect } from "react";
import styles from "./TechStack.module.css";
import Card from "./cards/Cards";
import { BestPracticeTechStack } from "./const";
import axios from "axios";

type props = { id: string };

const TechStack: React.FC<props> = ({ id }) => {
  const baseURLBusiness = process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURLBusiness}/business/get-tech-stack-all-versions/${id}`,
          { withCredentials: true }
        );
        console.log("TechStack Response:", response.data.data);
      } catch (error) {
        console.error("Error in TechStack component:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={`d-flex justify-content-center ${styles.techStackPage}`}>
      <Card title="Backend" stack={BestPracticeTechStack.backend} />
      <Card title="Frontend" stack={BestPracticeTechStack.frontend} />
      <Card title="Mobile" stack={BestPracticeTechStack.mobile} />
      <Card
        title="Cloud Services Frontend"
        stack={BestPracticeTechStack.cloud.frontend}
      />
      <Card
        title="Cloud Services Backend"
        stack={BestPracticeTechStack.cloud.backend}
      />
      <Card
        title="Analytics & Productivity"
        stack={BestPracticeTechStack.analyticsTools}
      />
      <Card
        title="Communication Tools"
        stack={BestPracticeTechStack.communicationTools}
      />
      <Card title="Development Tools" stack={BestPracticeTechStack.devOps} />
      <Card title="Security" stack={BestPracticeTechStack.security} />
    </div>
  );
};

export default TechStack;

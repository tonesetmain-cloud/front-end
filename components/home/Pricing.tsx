"use client";
import PriceCard from "./cards/PriceCard";
import React, { useState, useEffect } from "react";
import styles from "./Pricing.module.css";

type FeaturesData = {
  freeFeatures: string[];
  proFeatures: string[];
};

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState("Monthly");
  const [features, setFeatures] = useState<FeaturesData | null>(null);

  useEffect(() => {
    fetch("/data/features.json")
      .then((res) => res.json())
      .then((data: FeaturesData) => setFeatures(data));
  }, []);

  if (!features) return <p>Loading...</p>;

  return (
    <div id="pricing" className={styles.pricing}>
      <h2>Simple and Affordable Pricing</h2>
      <p className={styles.subtitle}>
        Get started for free, and choose the pricing plan that fits your needs,
        whether you're just starting or ready to scale.
      </p>

      <div className={styles.toggleContainer}>
        <p className={styles.toggleText}>Yearly</p>
        <input
          type="checkbox"
          className={styles.themeCheckbox}
          checked={pricingPlans === "Monthly"}
          id="custom-theme-switch"
          onChange={() =>
            setPricingPlans(pricingPlans === "Monthly" ? "Yearly" : "Monthly")
          }
        />
        <p className={styles.toggleText}>Monthly</p>
      </div>

      <div className={styles.priceCards}>
        <PriceCard
          title="Free Plan"
          price={`0 SEK /${pricingPlans === "Monthly" ? " month" : " year"}`}
          description="Perfect for individuals and small teams."
          features={features.freeFeatures} // array of strings
        />
        <PriceCard
          title="Pro Plan"
          price={
            pricingPlans === "Monthly" ? "100 SEK / month" : "1100 SEK / year"
          }
          description="Ideal for larger teams and businesses."
          features={features.proFeatures} // array of strings
        />
      </div>
    </div>
  );
};

export default Pricing;

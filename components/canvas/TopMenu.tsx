import React, { useState } from "react";
import styles from "./canvas.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import {
  UIElementsAttributes,
  TechStachVersionsAttributes,
} from "@/types/types";

type props = {
  uiElementsVersions: UIElementsAttributes[];
  techStackVersions: TechStachVersionsAttributes[];
  handleUIElementVersionClick: (version: any) => void;
  handleTechStackVersionClick: (version: any) => void;
  screen: string;
  setScreen: (value: string) => void;
};

const TopMenu: React.FC<props> = ({
  uiElementsVersions,
  techStackVersions,
  handleUIElementVersionClick,
  handleTechStackVersionClick,
  screen,
  setScreen,
}) => {
  const handleScreenChange = (value: string) => {
    setScreen(value);
  };
  return (
    <div className={styles.topBar}>
      <div className={styles.menuBar}>
        <button
          className={screen === "stack" ? styles.activeMenuItem : ""}
          onClick={() => handleScreenChange("stack")}>
          Tech stack
        </button>
        <button
          className={screen === "ui-stuff" ? styles.activeMenuItem : ""}
          onClick={() => handleScreenChange("ui-stuff")}>
          UI stuff
        </button>
        <button
          className={screen === "system-design" ? styles.activeMenuItem : ""}
          onClick={() => handleScreenChange("system-design")}>
          System design
        </button>
      </div>
      {screen == "ui-stuff" && (
        <div className={styles.versionScrollBar}>
          <Dropdown>
            <Dropdown.Toggle
              variant={`dark`}
              id="dropdown-basic"
              className={styles.versionBtn}>
              Version
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {uiElementsVersions?.map((i, key) => (
                <Dropdown.Item
                  key={key}
                  onClick={() => handleUIElementVersionClick(i)}>
                  Version {i.version}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      {screen == "stack" && (
        <div className={styles.versionScrollBar}>
          <Dropdown>
            <Dropdown.Toggle
              variant={`dark`}
              id="dropdown-basic"
              className={styles.versionBtn}>
              Version
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {techStackVersions?.map((i, key) => (
                <Dropdown.Item
                  key={key}
                  onClick={() => handleTechStackVersionClick(i)}>
                  Version {i.version}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default TopMenu;

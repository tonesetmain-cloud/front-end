"use client";
import React, { useState } from "react";
import styles from "./canvas.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { projects } from "@/types/types";

type props = { projectsData: projects[]; setSelectedId: (id: string) => void };
const Sidebar: React.FC<props> = ({ projectsData, setSelectedId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div
      className={`${styles.sidebar} ${open ? styles.open : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <nav className={styles.links}>
        {projectsData?.map((project, i) => (
          <p key={project.id} onClick={() => handleClick(project.id!)}>
            {open ? (
              project.business_name
            ) : (
              <>
                <FontAwesomeIcon icon={faFolder} style={{ marginRight: 4 }} />
                {i + 1}
              </>
            )}
          </p>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

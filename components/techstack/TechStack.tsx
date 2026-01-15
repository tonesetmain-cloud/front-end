import React, { useEffect, useState } from "react";
import styles from "./TechStack.module.css";
import Card from "./cards/Cards";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type props = { id: string; techStackVersion: Record<string, any> };

const CARD_ORDER = [
  { id: "frontend", title: "Frontend", key: "frontend" },
  { id: "backend", title: "Backend", key: "backend" },
  {
    id: "frontendCloud",
    title: "Cloud Services Frontend",
    key: "frontendCloudService",
  },
  {
    id: "backendCloud",
    title: "Cloud Services Backend",
    key: "backendCloudService",
  },
  { id: "devOps", title: "DevOps", key: "devOps" },
  { id: "testing", title: "Testing", key: "testing" },
  { id: "analytics", title: "Analytics & Productivity", key: "analyticsTools" },
  {
    id: "communication",
    title: "Communication Tools",
    key: "communicationTools",
  },
  { id: "security", title: "Security", key: "security" },
  { id: "ai", title: "AI Automation", key: "aiAutomation" },
  { id: "mobile", title: "Mobile", key: "mobile" },
];

// SortableCard wrapper
const SortableCard: React.FC<{ id: string; title: string; stack: any }> = ({
  id,
  title,
  stack,
}) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Pass the drag handle props to a header or handle element */}
      <Card
        title={title}
        stack={stack}
        dragHandleProps={{ attributes, listeners, setActivatorNodeRef }}
      />
    </div>
  );
};

const TechStack: React.FC<props> = ({ techStackVersion }) => {
  const [cards, setCards] = useState(CARD_ORDER);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCards((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={cards.map((c) => c.id)}>
        <div
          className={`d-flex justify-content-center ${styles.techStackPage}`}>
          {cards.map((card) => (
            <SortableCard
              key={card.id}
              id={card.id}
              title={card.title}
              stack={techStackVersion[card.key]}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TechStack;

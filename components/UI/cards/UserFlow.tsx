"use client";
import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  Position,
  MarkerType, // ✅ Add this
} from "reactflow";

import dagre from "dagre";
import "reactflow/dist/style.css";
import styles from "./UserFlow.module.css";

// Base data
const nodesData = [
  { id: "landing", label: "Landing Page", type: "input" },
  { id: "collections", label: "Collections Page" },
  { id: "product", label: "Product Detail Page" },
  { id: "cart", label: "Cart Page" },
  { id: "checkout", label: "Checkout Page" },
  { id: "confirmation", label: "Confirmation Page" },
  { id: "signin", label: "Sign In Page" },
  { id: "signup", label: "Sign Up Page" },
  { id: "dashboard", label: "Account Dashboard" },
  { id: "sustainability", label: "Sustainability Page" },
  { id: "blog", label: "Community Page" },
];

const edgesData = [
  { id: "e1", source: "landing", target: "collections", label: "Shop Now" },
  {
    id: "e2",
    source: "collections",
    target: "product",
    label: "Click Product",
  },
  { id: "e3", source: "product", target: "cart", label: "Add to Cart" },
  { id: "e4", source: "cart", target: "checkout", label: "Checkout" },
  {
    id: "e5",
    source: "checkout",
    target: "confirmation",
    label: "Payment Success",
  },
  {
    id: "e6",
    source: "checkout",
    target: "cart",
    label: "Payment Fail (Retry)",
  },
  { id: "e7", source: "landing", target: "signin", label: "Sign In" },
  { id: "e8", source: "landing", target: "signup", label: "Sign Up" },
  { id: "e9", source: "signin", target: "dashboard", label: "Success" },
  {
    id: "e10",
    source: "signup",
    target: "dashboard",
    label: "Complete Onboarding",
  },
  {
    id: "e11",
    source: "landing",
    target: "sustainability",
    label: "Learn More",
  },
  { id: "e12", source: "landing", target: "blog", label: "Community" },
  {
    id: "e13",
    source: "confirmation",
    target: "dashboard",
    label: "Track Order",
  },
];

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB"
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 180;
  const nodeHeight = 50;

  dagreGraph.setGraph({ rankdir: direction }); // "TB" = top-bottom

  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

const UserFlow: React.FC = () => {
  const initialNodes: Node[] = useMemo(
    () =>
      nodesData.map((n) => ({
        id: n.id,
        data: { label: n.label },
        position: { x: 0, y: 0 },
        type: n.type,
      })),
    []
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      edgesData.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed }, // ✅ correct type
      })),
    []
  );

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges, "TB"),
    []
  );

  const [nodes, setNodes] = React.useState(layoutedNodes);
  const [edges, setEdges] = React.useState(layoutedEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const [isMaximized, setIsMaximized] = React.useState(false);

  return (
    <div className={styles.overlayWrapper}>
      {isMaximized && <div className={styles.pageBlur}></div>}
      <div className={`${styles.card} ${isMaximized ? styles.fullscreen : ""}`}>
        <div className={styles.MacButtons}>
          <button
            className={styles.redButton}
            onClick={() => setIsMaximized(false)}></button>
          <button
            className={styles.greenButton}
            onClick={() => setIsMaximized(true)}></button>
        </div>

        <h4>User Flow </h4>
        <div className={styles.flowContainer}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView>
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default UserFlow;

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

type props = {
  nodesData: { id: string; label: string; type?: string }[];
  edgesData: { id: string; source: string; target: string; label: string }[];
};

const UserFlow: React.FC<props> = ({ nodesData, edgesData }) => {
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
        <div className="MacButtons">
          <button className="redButton" onClick={() => setIsMaximized(false)} />
          <button
            className="greenButton"
            onClick={() => setIsMaximized(true)}
          />
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

import { Loader } from "@mantine/core";
import ELK from "elkjs/lib/elk.bundled.js";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";
import { useMessage } from "~/features/chat-bot/hooks/useMessages";
import { useGraph } from "../api/useGraph";

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  "elk.nodePlacement.strategy": "BRANDES_KOEPF_RANDOM",
};

const getLayoutedElements = async (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 300,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow({ graphNodes = [], graphEdages = [] }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const onLayout = ({ direction }) => {
    const opts = { "elk.direction": direction, ...elkOptions };
    const ns = graphNodes;
    const es = graphEdages;

    getLayoutedElements(ns, es, opts).then(
      ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        window.requestAnimationFrame(() => fitView());
      }
    );
  };

  useLayoutEffect(() => {
    onLayout({ direction: "RIGHT" });
  }, [graphEdages, graphNodes]);
  return (
    <>
      {nodes && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <MiniMap
            style={{
              height: 100,
              width: 100,
            }}
            zoomable
            pannable
          />

          <Background
            id="1"
            gap={20}
            color="#228be6"
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>
      )}
    </>
  );
}
export function ReactFlowGraph() {
  const router = useRouter();

  const graphLocalKey = "graphdata/projects/" + router.query.id;

  const [updatedGraph, setUpdatedGraph] = useState([]);

  // load previous graph from localstorage
  useEffect(() => {
    const localGraphHistory = localStorage.getItem(graphLocalKey);
    let prevData = [];
    if (localGraphHistory) {
      prevData = JSON.parse(localGraphHistory);
    }

    // if (graphData) {
    //   const totalGraphData = [...prevData, ...graphData];
    //   convertedGraph = convertDataToNodesAndEdges(totalGraphData);
    //   setUpdatedGraph(convertedGraph);
    //   localStorage.setItem(graphLocalKey, JSON.stringify(totalGraphData));
    // } else {
    //   convertedGraph = convertDataToNodesAndEdges(prevData);
    //   setUpdatedGraph(convertedGraph);
    // }

    setUpdatedGraph(convertDataToNodesAndEdges(prevData));
  }, []);

  // when a response is recieved, convert the text to graph
  const { initialRender, chatMessages, markGraphGenerated } = useMessage();

  const { mutate: convertTextToGraph, isPending } = useGraph({
    onSuccess: (res) => {
      initialRender.current = true;

      // set lastMessage.graphGenerate = true
      markGraphGenerated();

      // merge the graph
      const prevGraphData =
        JSON.parse(localStorage.getItem(graphLocalKey)) || [];
      const totalGraphData = [...prevGraphData, ...res.answer];
      setUpdatedGraph(convertDataToNodesAndEdges(totalGraphData));

      // store to localStorage
      localStorage.setItem(graphLocalKey, JSON.stringify(totalGraphData));
    },
  });

  useEffect(() => {
    const lastMessage = chatMessages[chatMessages.length - 1];
    // if the last message is a response from RAG API
    if (lastMessage?.sender === false && lastMessage.graphGenerated === false) {
      convertTextToGraph(lastMessage.text);
    }
  }, [chatMessages]);

  return (
    <>
      {updatedGraph && (
        <div style={{ width: "100%", height: "100%" }}>
          <ReactFlowProvider>
            <LayoutFlow
              graphNodes={updatedGraph.nodes}
              graphEdages={updatedGraph.edges}
            />
            <Controls>{isPending && <Loader ml={4} mt={8} />}</Controls>
          </ReactFlowProvider>
        </div>
      )}
    </>
  );
}

function convertDataToNodesAndEdges(data) {
  const nodes = [];
  const edges = [];
  const position = { x: 0, y: 0 };

  data?.forEach(([source, relation, target], index) => {
    // Create nodes if not already created
    let sourceNode = nodes.find((node) => node.data.label === source);
    if (!sourceNode) {
      sourceNode = {
        id: `${nodes.length + 1}`,
        data: {
          label: source,
        },
        position,
      };
      nodes.push(sourceNode);
    }

    let targetNode = nodes.find((node) => node.data.label === target);
    if (!targetNode) {
      targetNode = {
        id: `${nodes.length + 1}`,
        data: { label: target },
        position,
      };
      nodes.push(targetNode);
    }

    // Create edge with numeric source and target IDs
    const edge = {
      id: `${index + 1}`,
      source: `${sourceNode.id}`,
      target: `${targetNode.id}`,
      label: relation,
      type: "straight",
    };

    edges.push(edge);
  });
  return { nodes, edges };
}

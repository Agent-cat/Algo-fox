"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Tldraw, createShapeId, Editor, toRichText, TLComponents } from "tldraw";
import "tldraw/tldraw.css";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Code2,
  PlayCircle,
  FastForward,
  CheckCircle,
  Loader2,
  Undo2,
  Trash2,
  HelpCircle
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

// PRESETS
const PRESETS = [
  {
    name: "Binary Search",
    language: "javascript",
    problem: "Find the index of target value in a sorted array.",
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  return -1; // Not found
}`
  },
  {
    name: "Bubble Sort",
    language: "javascript",
    problem: "Sort the array in ascending order.",
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
  },
  {
    name: "Stack Operations",
    language: "javascript",
    problem: "Push elements onto a stack and pop them.",
    code: `function stackDemo() {
  let stack = [];
  stack.push(10);
  stack.push(20);
  stack.push(30);
  
  let popped = stack.pop();
  return popped;
}`
  },
  {
    name: "Binary Search Tree (BST) Insert",
    language: "javascript",
    problem: "Insert values into a Binary Search Tree.",
    code: `function insertBST(root, val) {
  if (root === null) {
    return { val: val, left: null, right: null };
  }
  
  if (val < root.val) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}`
  }
];

// Hide all tldraw UI — clean canvas for AI drawing only
const cleanCanvasComponents: TLComponents = {
  Toolbar: null,
  StylePanel: null,
  PageMenu: null,
  NavigationPanel: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  ActionsMenu: null,
  QuickActions: null,
  HelperButtons: null,
  ContextMenu: null,
  DebugPanel: null,
  DebugMenu: null,
  MenuPanel: null,
  TopPanel: null,
  SharePanel: null,
  Minimap: null,
  RichTextToolbar: null,
  ImageToolbar: null,
  VideoToolbar: null,
  CursorChatBubble: null,
};

// Safely extract a display string from any value (handles objects, arrays, primitives)
function displayValue(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) return val.map(displayValue).join(", ");
  if (typeof val === "object") {
    // Try common properties the AI might use
    if ("val" in val) return String(val.val);
    if ("value" in val) return String(val.value);
    if ("id" in val) return String(val.id);
    return JSON.stringify(val);
  }
  return String(val);
}

export default function TldrawCanvas() {
  const [code, setCode] = useState(PRESETS[0].code);
  const [language, setLanguage] = useState(PRESETS[0].language);
  const [problemStatement, setProblemStatement] = useState(PRESETS[0].problem);
  const [isGenerating, setIsGenerating] = useState(false);

  // Playback & Animation State
  const [animationPlan, setAnimationPlan] = useState<any>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [voiceNarration, setVoiceNarration] = useState(true);

  // Tldraw Editor Instance Ref
  const [editor, setEditor] = useState<Editor | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Swap animation state
  const prevArrayRef = useRef<any[] | null>(null);
  const [swapPhase, setSwapPhase] = useState<"none" | "lift" | "drop">("none");
  const [swapIndices, setSwapIndices] = useState<[number, number] | null>(null);
  const swapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speakText = (text: string) => {
    if (!voiceNarration || !synthRef.current) return;
    synthRef.current.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05 * playbackSpeed;
    synthRef.current.speak(utterance);
  };

  const handleMount = (editorInstance: Editor) => {
    setEditor(editorInstance);
  };

  // Generate Simulation Action
  const handleGenerate = async () => {
    if (!code.trim()) {
      toast.error("Please enter some source code");
      return;
    }
    setIsGenerating(true);
    setIsPlaying(false);
    if (synthRef.current) synthRef.current.cancel();

    try {
      const res = await fetch("/api/canvas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, problemStatement }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAnimationPlan(data.data);
        setCurrentStepIdx(0);
        isFirstStepRef.current = true;
        toast.success("Animation script generated by AI!");

        if (data.data.steps && data.data.steps.length > 0) {
          speakText(data.data.steps[0].speech || data.data.steps[0].caption);
        }
      } else {
        toast.error(data.error || "Failed to generate animation plan.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error connecting to Gemini API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentStep = useMemo(() => {
    if (!animationPlan || !animationPlan.steps || animationPlan.steps.length === 0) return null;
    return animationPlan.steps[currentStepIdx];
  }, [animationPlan, currentStepIdx]);

  // Detect swaps and trigger multi-phase animation
  useEffect(() => {
    if (!currentStep) return;
    const arr = currentStep.state?.array;
    if (!arr || !Array.isArray(arr)) {
      setSwapIndices(null);
      setSwapPhase("none");
      prevArrayRef.current = arr;
      return;
    }

    const anims = currentStep.animation || [];
    let detected: [number, number] | null = null;

    // Check animation metadata for explicit swap
    for (const anim of anims) {
      if (anim.type === "swap" && anim.object === "array") {
        const i = anim.index ?? anim.fromIndex;
        const j = anim.toIndex ?? anim.with;
        if (i !== undefined && j !== undefined) {
          detected = [Math.min(i, j), Math.max(i, j)];
          break;
        }
      }
    }

    // Detect by comparing previous vs current array state
    if (!detected && prevArrayRef.current) {
      const prev = prevArrayRef.current;
      if (prev.length === arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== prev[i]) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[j] === prev[i] && arr[i] === prev[j]) {
                detected = [i, j];
                break;
              }
            }
            if (detected) break;
          }
        }
      }
    }

    prevArrayRef.current = [...arr];

    if (detected) {
      setSwapIndices(detected);
      setSwapPhase("lift");

      swapTimerRef.current = setTimeout(() => {
        setSwapPhase("drop");
        setTimeout(() => {
          setSwapPhase("none");
          setSwapIndices(null);
        }, 300);
      }, 400);
    } else {
      setSwapIndices(null);
      setSwapPhase("none");
    }

    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    };
  }, [currentStepIdx, currentStep]);

  // Whiteboard drawing-engine triggered on currentStepIdx or editor mount
  const isFirstStepRef = useRef(true);
  useEffect(() => {
    if (editor && currentStep) {
      drawStateToTldraw(editor, currentStep, isFirstStepRef.current);
      isFirstStepRef.current = false;
    }
  }, [editor, currentStepIdx, currentStep, swapPhase, swapIndices]);

  // Programmatic drawing core rules mapping state models to Tldraw vector shapes
  const drawStateToTldraw = (editorInstance: Editor, step: any, isFirstStep: boolean) => {
    // 1. Clean previous drawing shapes to avoid overlaps
    const shapeIds = editorInstance.getCurrentPageShapeIds();
    editorInstance.deleteShapes(Array.from(shapeIds));

    const shapesToCreate: any[] = [];
    const state = step?.state || {};
    const anims = step?.animation || [];

    const startX = 100;
    const startY = 150;

    // A. Draw Array Structure
    if (state.array && Array.isArray(state.array)) {
      const arr = state.array;
      const cellW = 70;
      const cellH = 70;
      const gap = 15;

      arr.forEach((val: any, idx: number) => {
        const x = startX + idx * (cellW + gap);
        const y = startY;

        // Custom styling colors based on active animations
        let color = "blue";
        let swapLift = 0;

        anims.forEach((anim: any) => {
          if (anim.object === "array") {
            if (anim.index === idx || (anim.name === "mid" && state.pointer?.mid === idx)) {
              if (anim.type === "compare") color = "yellow";
              else if (anim.type === "swap") color = "orange";
              else if (anim.type === "visit") color = "green";
              else if (anim.type === "highlight") color = "violet";
            }
          }
        });

        // Apply swap animation offset
        if (swapPhase === "lift" && swapIndices && (swapIndices[0] === idx || swapIndices[1] === idx)) {
          color = "orange";
          swapLift = -30;
        } else if (swapPhase === "drop" && swapIndices && (swapIndices[0] === idx || swapIndices[1] === idx)) {
          color = "orange";
          swapLift = -10;
        }

        // 1. Grid cell border box
        shapesToCreate.push({
          id: createShapeId(`arr-cell-${idx}`),
          type: "geo",
          x,
          y: y + swapLift,
          props: {
            geo: "rectangle",
            w: cellW,
            h: cellH,
            fill: "semi",
            color: color,
          },
        });

        // 2. Element string value
        shapesToCreate.push({
          id: createShapeId(`arr-val-${idx}`),
          type: "text",
          x: x + 20,
          y: y + swapLift + 16,
          props: {
            richText: toRichText(displayValue(val)),
            size: "m",
          },
        });

        // 3. Grid index label (header offset)
        shapesToCreate.push({
          id: createShapeId(`arr-idx-${idx}`),
          type: "text",
          x: x + 26,
          y: y - 30,
          props: {
            richText: toRichText(String(idx)),
            size: "s",
          },
        });
      });

      // Draw swap cross-arrow indicator during lift phase
      if (swapPhase === "lift" && swapIndices) {
        const [i, j] = swapIndices;
        const x1 = startX + i * (cellW + gap) + cellW / 2;
        const x2 = startX + j * (cellW + gap) + cellW / 2;
        const arrowY = startY - 50;

        // Cross arrow connecting the two swapping cells
        shapesToCreate.push({
          id: createShapeId("swap-arrow-1"),
          type: "arrow",
          x: 0,
          y: 0,
          props: {
            start: { x: x1, y: startY + 10 },
            end: { x: x2, y: arrowY },
            color: "orange",
          },
        });

        shapesToCreate.push({
          id: createShapeId("swap-arrow-2"),
          type: "arrow",
          x: 0,
          y: 0,
          props: {
            start: { x: x2, y: startY + 10 },
            end: { x: x1, y: arrowY },
            color: "orange",
          },
        });

        // SWAP label at the crossing point
        const midX = (x1 + x2) / 2;
        shapesToCreate.push({
          id: createShapeId("swap-label"),
          type: "text",
          x: midX - 18,
          y: arrowY - 15,
          props: {
            richText: toRichText("⇄ SWAP"),
            size: "s",
          },
        });
      }

      // B. Draw Pointers
      if (state.pointer) {
        Object.entries(state.pointer).forEach(([name, targetIdx]: [string, any], pIdx: number) => {
          const idx = Number(targetIdx);
          if (idx >= 0 && idx < arr.length) {
            const cellX = startX + idx * (cellW + gap);
            const ptrY = startY + cellH + 45 + pIdx * 45;

            // Pointer label bubble
            shapesToCreate.push({
              id: createShapeId(`ptr-card-${name}`),
              type: "geo",
              x: cellX + 5,
              y: ptrY,
              props: {
                geo: "rectangle",
                w: 60,
                h: 30,
                fill: "solid",
                color: "violet",
              },
            });

            // Pointer label text
            shapesToCreate.push({
              id: createShapeId(`ptr-lbl-${name}`),
              type: "text",
              x: cellX + 12,
              y: ptrY + 2,
              props: {
                richText: toRichText(name),
                size: "s",
              },
            });

            // Vector arrow connecting pointer label to array bottom
            shapesToCreate.push({
              id: createShapeId(`ptr-arrow-${name}`),
              type: "arrow",
              x: 0,
              y: 0,
              props: {
                start: { x: cellX + 35, y: ptrY },
                end: { x: cellX + 35, y: startY + cellH + 5 },
                color: "violet",
              },
            });
          }
        });
      }
    }

    // C. Draw Matrix Structure
    if (state.matrix && Array.isArray(state.matrix)) {
      const mat = state.matrix;
      const cellW = 55;
      const cellH = 55;
      const gap = 8;
      const matStartX = startX + 320;

      mat.forEach((row: any[], rIdx: number) => {
        if (!Array.isArray(row)) return;
        row.forEach((val: any, cIdx: number) => {
          const x = matStartX + cIdx * (cellW + gap);
          const y = startY + rIdx * (cellH + gap);

          let color = "blue";
          anims.forEach((anim: any) => {
            if (anim.object === "matrix" && anim.row === rIdx && anim.col === cIdx) {
              if (anim.type === "compare") color = "yellow";
              else if (anim.type === "visit") color = "green";
              else if (anim.type === "highlight") color = "violet";
            }
          });

          shapesToCreate.push({
            id: createShapeId(`mat-cell-${rIdx}-${cIdx}`),
            type: "geo",
            x,
            y,
            props: {
              geo: "rectangle",
              w: cellW,
              h: cellH,
              fill: "semi",
              color,
            },
          });

          shapesToCreate.push({
            id: createShapeId(`mat-val-${rIdx}-${cIdx}`),
            type: "text",
            x: x + 16,
            y: y + 10,
            props: {
              richText: toRichText(displayValue(val)),
              size: "s",
            },
          });
        });
      });
    }

    // D. Draw Stack Structure
    if (state.stack && Array.isArray(state.stack)) {
      const stack = state.stack;
      const stackX = startX + 500;
      const stackY = startY + 150;
      const itemW = 120;
      const itemH = 40;
      const itemGap = 6;

      // Draw Stack Frame Outline (Bucket shape)
      shapesToCreate.push({
        id: createShapeId("stack-outline"),
        type: "geo",
        x: stackX - 10,
        y: stackY - 180,
        props: {
          geo: "rectangle",
          w: itemW + 20,
          h: 240,
          fill: "none",
          color: "grey",
        },
      });

      stack.forEach((val: any, idx: number) => {
        const y = stackY + 40 - idx * (itemH + itemGap);

        shapesToCreate.push({
          id: createShapeId(`stack-item-${idx}`),
          type: "geo",
          x: stackX,
          y,
          props: {
            geo: "rectangle",
            w: itemW,
            h: itemH,
            fill: "semi",
            color: "orange",
          },
        });

        shapesToCreate.push({
          id: createShapeId(`stack-val-${idx}`),
          type: "text",
          x: stackX + 20,
          y: y + 5,
          props: {
            richText: toRichText(displayValue(val)),
            size: "s",
          },
        });
      });
    }

    // E. Draw Queue Structure
    if (state.queue && Array.isArray(state.queue)) {
      const queue = state.queue;
      const queueX = startX + 480;
      const queueY = startY + 300;
      const itemW = 60;
      const itemH = 60;
      const gap = 8;

      // Horizontal pipe guide lines
      shapesToCreate.push({
        id: createShapeId("q-track-top"),
        type: "arrow",
        x: 0,
        y: 0,
        props: {
          start: { x: queueX - 15, y: queueY - 4 },
          end: { x: queueX + 280, y: queueY - 4 },
          color: "grey",
        },
      });
      shapesToCreate.push({
        id: createShapeId("q-track-bottom"),
        type: "arrow",
        x: 0,
        y: 0,
        props: {
          start: { x: queueX - 15, y: queueY + itemH + 4 },
          end: { x: queueX + 280, y: queueY + itemH + 4 },
          color: "grey",
        },
      });

      queue.forEach((val: any, idx: number) => {
        const x = queueX + idx * (itemW + gap);

        shapesToCreate.push({
          id: createShapeId(`q-item-${idx}`),
          type: "geo",
          x,
          y: queueY,
          props: {
            geo: "rectangle",
            w: itemW,
            h: itemH,
            fill: "semi",
            color: "light-blue",
          },
        });

        shapesToCreate.push({
          id: createShapeId(`q-val-${idx}`),
          type: "text",
          x: x + 16,
          y: queueY + 12,
          props: {
            richText: toRichText(displayValue(val)),
            size: "s",
          },
        });
      });
    }

    // F. Draw Binary Tree Nodes & Edges
    const treeRoot = state.tree || state.binaryTree || state.bst || state.heap;
    if (treeRoot) {
      const treeStartX = startX + 540;
      const treeStartY = startY + 50;

      const drawTreeRecursive = (node: any, x: number, y: number, dx: number, depth: number) => {
        if (!node) return;
        const nodeId = `t-node-${node.val ?? node.value}-${x}-${y}`;

        let color = "blue";
        anims.forEach((anim: any) => {
          if (anim.object === "tree" && anim.value === node.val) {
            if (anim.type === "compare") color = "yellow";
            else if (anim.type === "visit") color = "green";
            else if (anim.type === "highlight") color = "violet";
          }
        });

        // Circle outline
        shapesToCreate.push({
          id: createShapeId(nodeId),
          type: "geo",
          x: x - 25,
          y: y - 25,
          props: {
            geo: "ellipse",
            w: 50,
            h: 50,
            fill: "semi",
            color,
          },
        });

        // Text value
        shapesToCreate.push({
          id: createShapeId(`t-val-${nodeId}`),
          type: "text",
          x: x - 10,
          y: y - 13,
          props: {
            richText: toRichText(displayValue(node.val ?? node.value)),
            size: "s",
          },
        });

        if (node.left) {
          const lx = x - dx;
          const ly = y + 70;
          shapesToCreate.push({
            id: createShapeId(`t-arrow-l-${nodeId}`),
            type: "arrow",
            x: 0,
            y: 0,
            props: {
              start: { x: x - 15, y: y + 20 },
              end: { x: lx + 15, y: ly - 20 },
              color: "grey",
            },
          });
          drawTreeRecursive(node.left, lx, ly, dx / 1.8, depth + 1);
        }

        if (node.right) {
          const rx = x + dx;
          const ry = y + 70;
          shapesToCreate.push({
            id: createShapeId(`t-arrow-r-${nodeId}`),
            type: "arrow",
            x: 0,
            y: 0,
            props: {
              start: { x: x + 15, y: y + 20 },
              end: { x: rx - 15, y: ry - 20 },
              color: "grey",
            },
          });
          drawTreeRecursive(node.right, rx, ry, dx / 1.8, depth + 1);
        }
      };

      drawTreeRecursive(treeRoot, treeStartX, treeStartY, 100, 1);
    }

    // G. Draw Graph Structures
    if (state.graph) {
      const graph = state.graph;
      let nodes: any[] = [];
      let edges: any[] = [];

      if (Array.isArray(graph.nodes)) nodes = graph.nodes;
      if (Array.isArray(graph.edges)) edges = graph.edges;

      // Circular layout arrangement
      if (nodes.length > 0) {
        const radius = 100 + nodes.length * 8;
        const cx = startX + 540;
        const cy = startY + 180;
        const positions = new Map<string, { x: number; y: number }>();

        nodes.forEach((node, idx) => {
          const angle = (idx / nodes.length) * 2 * Math.PI;
          const nx = cx + radius * Math.cos(angle);
          const ny = cy + radius * Math.sin(angle);
          const nodeId = String(node.id || node.val || node);
          positions.set(nodeId, { x: nx, y: ny });

          let color = "blue";
          anims.forEach((anim: any) => {
            if (anim.object === "graph" && (anim.node === nodeId || anim.value === nodeId)) {
              if (anim.type === "visit") color = "green";
              else if (anim.type === "compare") color = "yellow";
              else if (anim.type === "highlight") color = "violet";
            }
          });

          shapesToCreate.push({
            id: createShapeId(`g-node-${nodeId}`),
            type: "geo",
            x: nx - 22,
            y: ny - 22,
            props: {
              geo: "ellipse",
              w: 44,
              h: 44,
              fill: "semi",
              color,
            },
          });

          shapesToCreate.push({
            id: createShapeId(`g-lbl-${nodeId}`),
            type: "text",
            x: nx - 8,
            y: ny - 10,
            props: {
              richText: toRichText(nodeId),
              size: "s",
            },
          });
        });

        edges.forEach((edge, idx) => {
          const fromPos = positions.get(String(edge.from));
          const toPos = positions.get(String(edge.to));
          if (fromPos && toPos) {
            let color = "grey";
            anims.forEach((anim: any) => {
              if (anim.type === "connect" && anim.from === edge.from && anim.to === edge.to) {
                color = "orange";
              }
            });

            shapesToCreate.push({
              id: createShapeId(`g-edge-${idx}`),
              type: "arrow",
              x: 0,
              y: 0,
              props: {
                start: { x: fromPos.x, y: fromPos.y },
                end: { x: toPos.x, y: toPos.y },
                color,
              },
            });
          }
        });
      }
    }

    // H. Draw Run Variables Card
    if (state.variables && Object.keys(state.variables).length > 0) {
      const varX = startX;
      const varY = startY + 280;
      const varW = 220;
      const rowH = 40;

      shapesToCreate.push({
        id: createShapeId("var-box"),
        type: "geo",
        x: varX,
        y: varY,
        props: {
          geo: "rectangle",
          w: varW,
          h: 35 + Object.keys(state.variables).length * rowH,
          fill: "semi",
          color: "grey",
        },
      });

      shapesToCreate.push({
        id: createShapeId("var-box-title"),
        type: "text",
        x: varX + 15,
        y: varY + 8,
        props: {
          richText: toRichText("Variables"),
          size: "s",
        },
      });

      Object.entries(state.variables).forEach(([key, val]: [string, any], idx: number) => {
        shapesToCreate.push({
          id: createShapeId(`var-row-${key}`),
          type: "text",
          x: varX + 15,
          y: varY + 36 + idx * rowH,
          props: {
            richText: toRichText(`${key}: ${displayValue(val)}`),
            size: "s",
          },
        });
      });
    }

    // Load shapes onto the board
    editorInstance.createShapes(shapesToCreate);

    // Only zoom-to-fit on the very first step; keep camera stable afterwards
    if (isFirstStep) {
      setTimeout(() => {
        editorInstance.zoomToFit({ animation: { duration: 200 } });
      }, 60);
    }
  };

  // Timeline playback loop
  useEffect(() => {
    if (isPlaying && animationPlan && animationPlan.steps) {
      const intervalDuration = Math.max(1200 / playbackSpeed, 1800 / playbackSpeed);
      timerRef.current = setTimeout(() => {
        if (currentStepIdx < animationPlan.steps.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, intervalDuration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, animationPlan, playbackSpeed]);

  // Voice narration triggers on step updates
  useEffect(() => {
    if (currentStep) {
      speakText(currentStep.speech || currentStep.caption);
    }
  }, [currentStepIdx, currentStep]);

  // Playback Control Handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (animationPlan && currentStepIdx < animationPlan.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    isFirstStepRef.current = true;
    if (synthRef.current) synthRef.current.cancel();
  };

  // Syntax highlighting active line tracker
  const highlightLineProps = (lineNumber: number) => {
    if (currentStep && currentStep.line === lineNumber) {
      return {
        style: {
          display: "block",
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          borderLeft: "4px solid rgb(249, 115, 22)",
          paddingLeft: "4px"
        }
      };
    }
    return {};
  };

  const selectPreset = (preset: typeof PRESETS[0]) => {
    setCode(preset.code);
    setLanguage(preset.language);
    setProblemStatement(preset.problem);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafafa] dark:bg-[#1D1E23]">

      {/* LEFT PANEL: Code input & trace */}
      <div className="w-[380px] border-r border-gray-200 dark:border-white/10 flex flex-col h-full bg-white dark:bg-[#1C1D21] shrink-0 min-w-0 shadow-sm z-10">

        {/* Header Title */}
        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-100 dark:bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-200 dark:border-orange-500/20">
            <Sparkles className="w-4.5 h-4.5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-gray-100">AI Whiteboard Animator</h2>
            <p className="text-[11px] text-gray-500">Run code directly on the drawing board</p>
          </div>
        </div>

        {/* Dynamic Panels */}
        {!animationPlan ? (
          /* CODE INPUT FORM */
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

            {/* Presets Row */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Presets</label>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => selectPreset(preset)}
                    className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 dark:border-white/5 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium transition-colors cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Problem / Objective</label>
              <input
                type="text"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="e.g. Find index of target inside sorted list"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            {/* Code Textarea */}
            <div className="flex-1 flex flex-col space-y-1 min-h-[220px]">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Source Code</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your DSA code here..."
                className="flex-1 w-full p-3 font-mono text-xs rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:text-white resize-none"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating animation frames...
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  Compile & Animate Whiteboard
                </>
              )}
            </button>
          </div>
        ) : (
          /* RUNNING CODE TRACE VIEWER */
          <div className="flex-1 flex flex-col min-h-0 bg-[#282C34] text-white">

            {/* Editor Header Bar */}
            <div className="bg-[#21252B] px-4 py-2.5 flex items-center justify-between border-b border-gray-900 select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="text-[10px] text-gray-400 font-mono ml-2">trace_code.{language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : "js"}</span>
              </div>
              <button
                onClick={() => { setAnimationPlan(null); isFirstStepRef.current = true; }}
                className="flex items-center gap-1 text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded-lg border border-white/5 transition-all text-gray-300 hover:text-white cursor-pointer"
              >
                <Undo2 className="w-3 h-3" />
                Edit Code
              </button>
            </div>

            {/* Code Syntax Highlight Tracing panel */}
            <div className="flex-1 overflow-auto text-xs py-2 custom-scrollbar font-mono leading-relaxed">
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                showLineNumbers
                wrapLines
                lineProps={(lineNum) => highlightLineProps(lineNum)}
                customStyle={{
                  margin: 0,
                  padding: "0 0",
                  background: "transparent",
                  fontFamily: "monospace"
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>

            {/* Complexity Footer info */}
            {animationPlan.complexity && (
              <div className="bg-[#21252B] p-3 border-t border-gray-900 grid grid-cols-2 gap-2 text-[10.5px] font-mono text-gray-400 shrink-0">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                  <span>Time: {animationPlan.complexity.time || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Space: {animationPlan.complexity.space || "N/A"}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Full canvas area */}
      <div className="flex-1 h-full relative overflow-hidden">

        {/* Tldraw canvas — clean, no UI controls */}
        <div className="absolute inset-0 z-0">
          <Tldraw onMount={handleMount} components={cleanCanvasComponents} />
        </div>

        {/* TOP FLOATING CONTROLLER (ONLY IF ACTIVE ANIMATION ROUTE) */}
        {animationPlan && (
          <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 dark:bg-[#1C1D21]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-lg max-w-4xl mx-auto">

            {/* Playback Button Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleBack}
                disabled={currentStepIdx === 0}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg disabled:opacity-30 transition-colors cursor-pointer"
                title="Previous step"
              >
                <SkipBack className="w-4.5 h-4.5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors shadow-sm cursor-pointer"
                title={isPlaying ? "Pause" : "Play auto trace"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button
                onClick={handleNext}
                disabled={currentStepIdx === animationPlan.steps.length - 1}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg disabled:opacity-30 transition-colors cursor-pointer"
                title="Next step"
              >
                <SkipForward className="w-4.5 h-4.5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer ml-0.5"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            {/* Timeline Progress Slider */}
            <div className="flex-1 min-w-[150px] max-w-sm px-2 text-center md:text-left hidden sm:block">
              <div className="flex justify-between items-center text-[10px] font-bold text-orange-500 mb-1 tracking-wider uppercase">
                <span>{animationPlan.title || "Step-by-Step Visualization"}</span>
                <span>{currentStepIdx + 1} / {animationPlan.steps.length}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStepIdx + 1) / animationPlan.steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Right Speeds & Narration */}
            <div className="flex items-center gap-2">

              {/* Playback speed multiplier selector */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-xl px-2 py-1 border border-gray-200/50 dark:border-white/5">
                <FastForward className="w-3 h-3 text-gray-400" />
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-transparent text-[11px] font-bold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
                >
                  <option value="0.5">0.5x</option>
                  <option value="1">1.0x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x</option>
                </select>
              </div>

              {/* TTS Speech narration switcher */}
              <button
                onClick={() => setVoiceNarration(!voiceNarration)}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer ${voiceNarration
                  ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400"
                  : "bg-transparent border-gray-200 dark:border-white/5 text-gray-400 hover:text-gray-600"
                  }`}
                title={voiceNarration ? "Disable Voice" : "Enable Voice"}
              >
                {voiceNarration ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM FLOATING EXPLANATION CARD (ONLY IF ACTIVE) */}
        {currentStep && (
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 dark:bg-[#1C1D21]/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-lg max-w-2xl mx-auto flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/15 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                {currentStep.caption || "Analyzing Step..."}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                {currentStep.speech || ""}
              </p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!animationPlan && (
          <div className="absolute bottom-4 left-4 z-10 bg-white/80 dark:bg-[#1C1D21]/80 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs text-gray-500 pointer-events-none max-w-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300 block mb-0.5">AI Whiteboard</span>
            Compile code on the left to start tracing!
          </div>
        )}
      </div>
    </div>
  );
}

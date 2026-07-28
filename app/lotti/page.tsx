"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  ArrowDown,
  CheckCircle2,
  Zap,
  Info,
} from "lucide-react";

const ARRAY = [8, 1, 7, 11, 15, 2, 9, 5];
const TARGET = 14;

function ArrayNode({ data }: NodeProps) {
  const { value, index, state } = data as {
    value: number;
    index: number;
    state: "idle" | "picked" | "scanned" | "found" | "past";
  };

  const colors: Record<string, string> = {
    idle: "bg-white dark:bg-[#2a2b31] border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200",
    picked: "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30",
    scanned: "bg-violet-500 border-violet-500 text-white shadow-lg shadow-violet-500/30",
    found: "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30",
    past: "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-600",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center font-mono text-base sm:text-lg font-bold transition-all duration-300 ${colors[state as string]}`}
      >
        {value as number}
      </div>
      <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
        [{index as number}]
      </span>
    </div>
  );
}

function PointerNode({ data }: NodeProps) {
  const { label, color, visible } = data as {
    label: string;
    color: string;
    visible: boolean;
  };

  if (!visible) return null;

  const colorMap: Record<string, string> = {
    orange: "bg-orange-500 text-white",
    violet: "bg-violet-500 text-white",
    emerald: "bg-emerald-500 text-white",
  };

  return (
    <div className="flex flex-col items-center">
      <span
        className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${colorMap[color as string]}`}
      >
        {label as string}
      </span>
      <div
        className={`w-0.5 h-3 ${
          color === "orange"
            ? "bg-orange-500"
            : color === "violet"
            ? "bg-violet-500"
            : "bg-emerald-500"
        }`}
      />
      <div
        className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent ${
          color === "orange"
            ? "border-t-orange-500"
            : color === "violet"
            ? "border-t-violet-500"
            : "border-t-emerald-500"
        }`}
      />
    </div>
  );
}

function SumNode({ data }: NodeProps) {
  const { left, right, sum, visible, isMatch } = data as {
    left: number;
    right: number;
    sum: number;
    visible: boolean;
    isMatch: boolean;
  };

  if (!visible) return null;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-sm font-bold ${
        isMatch
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          : "bg-white dark:bg-[#2a2b31] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
      }`}
    >
      <span className="text-orange-500">{left}</span>
      <span className="text-gray-400">+</span>
      <span className="text-violet-500">{right}</span>
      <span className="text-gray-400">=</span>
      <span className={isMatch ? "text-emerald-500" : "text-gray-700 dark:text-gray-300"}>
        {sum}
      </span>
      {isMatch && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
    </div>
  );
}

function ResultNode({ data }: NodeProps) {
  const { indices, values, visible } = data as {
    indices: [number, number];
    values: [number, number];
    visible: boolean;
  };

  if (!visible) return null;

  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      <div className="font-mono text-sm">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
          nums[{indices[0]}] + nums[{indices[1]}]
        </span>
        <span className="text-gray-400"> = </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
          {values[0]} + {values[1]} = 14
        </span>
      </div>
    </div>
  );
}

const nodeTypes = {
  arrayNode: ArrayNode,
  pointerNode: PointerNode,
  sumNode: SumNode,
  resultNode: ResultNode,
};

interface Step {
  description: string;
  arrayStates: ("idle" | "picked" | "scanned" | "found" | "past")[];
  pointerI: number;
  pointerJ: number;
  showPointerI: boolean;
  showPointerJ: boolean;
  showSum: boolean;
  sumLeft: number;
  sumRight: number;
  sumValue: number;
  isMatch: boolean;
  showResult: boolean;
  resultIndices?: [number, number];
  resultValues?: [number, number];
}

function generateSteps(): Step[] {
  const steps: Step[] = [];

  steps.push({
    description: "Given an array of integers, find two numbers that add up to the target.",
    arrayStates: Array(ARRAY.length).fill("idle"),
    pointerI: -1,
    pointerJ: -1,
    showPointerI: false,
    showPointerJ: false,
    showSum: false,
    sumLeft: 0,
    sumRight: 0,
    sumValue: 0,
    isMatch: false,
    showResult: false,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const states: Step["arrayStates"] = Array(ARRAY.length).fill("idle");
    for (let k = 0; k < i; k++) states[k] = "past";
    states[i] = "picked";

    steps.push({
      description: `Pick element at index ${i} with value ${ARRAY[i]}. Scan every element after it.`,
      arrayStates: [...states],
      pointerI: i,
      pointerJ: -1,
      showPointerI: true,
      showPointerJ: false,
      showSum: false,
      sumLeft: 0,
      sumRight: 0,
      sumValue: 0,
      isMatch: false,
      showResult: false,
    });

    for (let j = i + 1; j < ARRAY.length; j++) {
      const sum = ARRAY[i] + ARRAY[j];
      const states: Step["arrayStates"] = Array(ARRAY.length).fill("idle");
      for (let k = 0; k < i; k++) states[k] = "past";
      states[i] = "picked";
      states[j] = "scanned";

      steps.push({
        description: `Check index ${j} (value ${ARRAY[j]}). ${ARRAY[i]} + ${ARRAY[j]} = ${sum}${sum === TARGET ? " — Match found!" : sum > TARGET ? " — Too large." : ""}`,
        arrayStates: [...states],
        pointerI: i,
        pointerJ: j,
        showPointerI: true,
        showPointerJ: true,
        showSum: true,
        sumLeft: ARRAY[i],
        sumRight: ARRAY[j],
        sumValue: sum,
        isMatch: sum === TARGET,
        showResult: false,
      });

      if (sum === TARGET) {
        const foundStates: Step["arrayStates"] = Array(ARRAY.length).fill("idle");
        for (let k = 0; k < i; k++) foundStates[k] = "past";
        foundStates[i] = "found";
        foundStates[j] = "found";

        steps.push({
          description: `Found the answer! nums[${i}] + nums[${j}] = ${ARRAY[i]} + ${ARRAY[j]} = ${TARGET}`,
          arrayStates: foundStates,
          pointerI: i,
          pointerJ: j,
          showPointerI: false,
          showPointerJ: false,
          showSum: true,
          sumLeft: ARRAY[i],
          sumRight: ARRAY[j],
          sumValue: sum,
          isMatch: true,
          showResult: true,
          resultIndices: [i, j],
          resultValues: [ARRAY[i], ARRAY[j]],
        });
        return steps;
      }
    }
  }

  return steps;
}

const ALL_STEPS = generateSteps();

export default function LottiePage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const step = ALL_STEPS[stepIdx];

  const next = useCallback(() => {
    setStepIdx((s) => Math.min(s + 1, ALL_STEPS.length - 1));
  }, []);

  const prev = useCallback(() => {
    setStepIdx((s) => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setStepIdx(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= ALL_STEPS.length - 1) {
      setIsPlaying(false);
      return;
    }
    const t = setTimeout(next, 1400);
    return () => clearTimeout(t);
  }, [isPlaying, stepIdx, next]);

  const arrayNodes: Node[] = useMemo(() => {
    const spacing = 130;
    const startX = -(ARRAY.length * spacing) / 2 + spacing / 2;

    const nodes: Node[] = ARRAY.map((num, idx) => ({
      id: `arr-${idx}`,
      type: "arrayNode",
      position: { x: startX + idx * spacing, y: 0 },
      data: { value: num, index: idx, state: step.arrayStates[idx] },
    }));

    if (step.showPointerI && step.pointerI >= 0) {
      nodes.push({
        id: "ptr-i",
        type: "pointerNode",
        position: { x: startX + step.pointerI * spacing + 24, y: 80 },
        data: { label: "i", color: "orange", visible: true },
      });
    }

    if (step.showPointerJ && step.pointerJ >= 0) {
      nodes.push({
        id: "ptr-j",
        type: "pointerNode",
        position: { x: startX + step.pointerJ * spacing + 24, y: 80 },
        data: { label: "j", color: "violet", visible: true },
      });
    }

    if (step.showSum) {
      nodes.push({
        id: "sum-line",
        type: "sumNode",
        position: { x: -140, y: 160 },
        data: {
          left: step.sumLeft,
          right: step.sumRight,
          sum: step.sumValue,
          visible: true,
          isMatch: step.isMatch,
        },
      });
    }

    if (step.showResult && step.resultIndices && step.resultValues) {
      nodes.push({
        id: "result",
        type: "resultNode",
        position: { x: -180, y: 230 },
        data: {
          indices: step.resultIndices,
          values: step.resultValues,
          visible: true,
        },
      });
    }

    return nodes;
  }, [step]);

  const arrayEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    if (step.showPointerI && step.pointerI >= 0 && step.pointerJ >= 0) {
      edges.push({
        id: "i-j-connection",
        source: `arr-${step.pointerI}`,
        target: `arr-${step.pointerJ}`,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2 },
      });
    }

    return edges;
  }, [step]);

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] dark:bg-[#1D1E23]">
      {/* Top Bar */}
      <div className="shrink-0 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#222328]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <h1 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                Two Sum
              </h1>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                React Flow
              </span>
            </div>
            <p className="font-mono text-xs text-gray-500">
              nums = <span className="text-gray-900 dark:text-white font-bold">[8, 1, 7, 11, 15, 2, 9, 5]</span>, target = <span className="text-orange-500 font-bold">{TARGET}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={stepIdx === 0}
              className="h-8 px-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 w-8 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <button
              onClick={reset}
              className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all flex items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={next}
              disabled={stepIdx >= ALL_STEPS.length - 1}
              className="h-8 px-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Step Description */}
      <div className="shrink-0 px-4 sm:px-6 py-3 bg-white dark:bg-[#222328] border-b border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="shrink-0 w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <span className="text-xs font-black text-orange-500">{stepIdx + 1}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIdx}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {step.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 min-h-0">
        <ReactFlow
          nodes={arrayNodes}
          edges={arrayEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        >
          <Background
            gap={24}
            size={1}
            color="currentColor"
            className="opacity-[0.03] dark:opacity-[0.05]"
          />
        </ReactFlow>
      </div>

      {/* Step Dots */}
      <div className="shrink-0 px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#222328]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-1">
          {ALL_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setStepIdx(idx);
                setIsPlaying(false);
              }}
              className={`h-1 rounded-full transition-all duration-200 ${
                idx === stepIdx
                  ? "w-6 bg-orange-500"
                  : idx < stepIdx
                  ? "w-1.5 bg-orange-400/40"
                  : "w-1.5 bg-gray-300 dark:bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

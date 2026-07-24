"use client";

import { useState, useEffect, useRef, useMemo, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeftRight,
} from "lucide-react";

interface AnimationStep {
  id: number;
  line?: number;
  caption?: string;
  speech?: string;
  animation?: {
    type: string;
    object: string;
    index?: number;
    name?: string;
    value?: any;
    key?: any;
    found?: boolean;
    foundKey?: any;
    expression?: string;
  }[];
  state?: {
    array?: any[];
    stack?: any[];
    queue?: any[];
    pointer?: Record<string, number>;
    variables?: Record<string, any>;
    tree?: any;
    graph?: any;
    matrix?: any[][];
  };
}

interface AnimationScript {
  title?: string;
  problem?: string;
  algorithm?: string;
  complexity?: { time?: string; space?: string };
  steps: AnimationStep[];
}

interface AnimationPlayerProps {
  animationScript: AnimationScript | string;
  language?: string;
  code?: string;
  compact?: boolean;
}

function parseScript(script: AnimationScript | string): AnimationScript | null {
  if (!script) return null;
  if (typeof script === "string") {
    try {
      return JSON.parse(script);
    } catch {
      return null;
    }
  }
  if (script && script.steps && Array.isArray(script.steps)) {
    return script;
  }
  return null;
}

// Parses stringified map data such as "{8:0, 1:1}" into a structured dictionary
function parseMapString(str: any): Record<string, string> | null {
  if (typeof str !== "string") return null;
  const trimmed = str.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    const content = trimmed.slice(1, -1).trim();
    if (!content) return {};
    const result: Record<string, string> = {};
    const pairs = content.split(",");
    for (const pair of pairs) {
      const parts = pair.split(":");
      if (parts.length === 2) {
        const k = parts[0].trim().replace(/^['"]|['"]$/g, "");
        const v = parts[1].trim().replace(/^['"]|['"]$/g, "");
        result[k] = v;
      }
    }
    return result;
  }
  return null;
}

// Configures text and arrow colors based on the pointer name (sky-blue for j, orange for i)
function getPointerColor(name: string) {
  const n = name.toLowerCase();
  if (n.includes("i") || n.includes("left")) {
    return {
      text: "text-orange-500",
      triangle: "text-orange-500",
    };
  }
  if (n.includes("j") || n.includes("right")) {
    return {
      text: "text-sky-400",
      triangle: "text-sky-400",
    };
  }
  return {
    text: "text-amber-500",
    triangle: "text-amber-500",
  };
}

// Extracts return indices from a string representation like "[6,7]" or "6,7"
function getReturnIndices(val: string): number[] {
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed.map(Number);
  } catch {}
  
  const matches = val.match(/-?\d+/g);
  if (matches) return matches.map(Number);
  return [];
}

// Dynamically substitutes variable values in mathematical expressions
function getFormattedExpression(expr: string, variables: Record<string, any>) {
  if (expr === "target-current") {
    const target = variables.target;
    const current = variables.current;
    const remainder = variables.remainder;
    if (target !== undefined && current !== undefined && remainder !== undefined) {
      return `${target} - ${current} = ${remainder}`;
    }
    return "target - current";
  }
  return expr;
}

export default function AnimationPlayer({
  animationScript,
  language = "javascript",
  code,
  compact = false,
}: AnimationPlayerProps) {
  const script = useMemo(() => parseScript(animationScript), [animationScript]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [voiceNarration, setVoiceNarration] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [swapIndices, setSwapIndices] = useState<[number, number] | null>(null);
  const prevArrayRef = useRef<any[] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (!voiceNarration) return;
    if (!synthRef.current && typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    if (!synthRef.current) return;
    
    try {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05 * playbackSpeed;
      synthRef.current.speak(utterance);
    } catch (err) {
      console.warn("SpeechSynthesis error:", err);
    }
  };

  const currentStep = useMemo(() => {
    if (!script || !script.steps || script.steps.length === 0) return null;
    return script.steps[currentStepIdx];
  }, [script, currentStepIdx]);

  const speechText = currentStep?.speech || currentStep?.caption || "";
  const captionText = currentStep?.caption || `Step ${currentStepIdx + 1} / ${script?.steps.length || 0}`;

  // Parse rich animation properties from the current step DSL
  const activeAnimations = useMemo(() => {
    if (!currentStep) {
      return {
        lookup: null,
        insert: null,
        highlightedKeys: new Set<number>(),
        pulsingKeys: new Set<number>(),
        highlightedVars: new Set<string>(),
        calculation: null,
        retVal: null,
        focusObj: null,
      };
    }
    
    const anims = currentStep.animation || [];
    
    let lookup: { key: number; found: boolean; foundKey?: number } | null = null;
    let insert: { key: number; value: number } | null = null;
    const highlightedKeys = new Set<number>();
    const pulsingKeys = new Set<number>();
    const highlightedVars = new Set<string>();
    let calculation: string | null = null;
    let retVal: string | null = null;
    let focusObj: string | null = null;

    for (const anim of anims) {
      switch (anim.type) {
        case "mapLookup":
          lookup = {
            key: Number(anim.key),
            found: !!anim.found,
            foundKey: anim.foundKey !== undefined ? Number(anim.foundKey) : undefined,
          };
          break;
        case "mapInsert":
          insert = {
            key: Number(anim.key),
            value: Number(anim.value),
          };
          break;
        case "mapHighlight":
          if (anim.key !== undefined) highlightedKeys.add(Number(anim.key));
          break;
        case "mapPulse":
          if (anim.key !== undefined) pulsingKeys.add(Number(anim.key));
          break;
        case "variableHighlight":
          if (anim.name) highlightedVars.add(anim.name);
          break;
        case "calculate":
          if (anim.expression) calculation = anim.expression;
          break;
        case "return":
          if (anim.value !== undefined) retVal = String(anim.value);
          break;
        case "focus":
          if (anim.object) focusObj = anim.object;
          break;
      }
    }

    return {
      lookup,
      insert,
      highlightedKeys,
      pulsingKeys,
      highlightedVars,
      calculation,
      retVal,
      focusObj,
    };
  }, [currentStep]);

  // Extract result indices for cell bouncing celebration
  const returnIndices = useMemo(() => {
    return activeAnimations.retVal ? getReturnIndices(activeAnimations.retVal) : [];
  }, [activeAnimations.retVal]);

  // Process swap animations
  useEffect(() => {
    let nextSwap: [number, number] | null = null;

    if (currentStep) {
      const arr = currentStep.state?.array;
      if (arr && Array.isArray(arr)) {
        const anims = currentStep.animation || [];

        for (const anim of anims) {
          if (anim.type === "swap" && anim.object === "array") {
            const i = anim.index;
            const j = (anim as any).toIndex ?? (anim as any).with;
            if (i !== undefined && j !== undefined) {
              nextSwap = [Math.min(i, j), Math.max(i, j)];
              break;
            }
          }
        }

        if (!nextSwap && prevArrayRef.current) {
          const prev = prevArrayRef.current;
          if (prev.length === arr.length) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] !== prev[i]) {
                for (let j = i + 1; j < arr.length; j++) {
                  if (arr[j] === prev[i] && arr[i] === prev[j]) {
                    nextSwap = [i, j];
                    break;
                  }
                }
                if (nextSwap) break;
              }
            }
          }
        }

        prevArrayRef.current = [...arr];
      } else {
        prevArrayRef.current = null;
      }
    }

    setSwapIndices(nextSwap);

    if (nextSwap) {
      const timeout = setTimeout(() => setSwapIndices(null), 600);
      return () => clearTimeout(timeout);
    }
  }, [currentStepIdx, currentStep]);

  // Autoplay progression effect
  useEffect(() => {
    if (isPlaying && script && script.steps) {
      const stepDuration = Math.max(2000 / playbackSpeed, 2500 / playbackSpeed);
      timerRef.current = setTimeout(() => {
        if (currentStepIdx < script.steps.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, stepDuration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, script, playbackSpeed]);

  // Narrate on step change
  useEffect(() => {
    if (currentStep && voiceNarration) {
      speakText(currentStep.speech || currentStep.caption || "");
    }
  }, [currentStepIdx, currentStep, voiceNarration]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setIsPlaying(false);
    if (script && currentStepIdx < script.steps.length - 1) {
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
    if (synthRef.current) synthRef.current.cancel();
  };

  // Jump to closest notch on timeline click
  const handleTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !script?.steps || script.steps.length <= 1) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = Math.max(0, Math.min(1, clickX / width));
    const stepIdx = Math.round(ratio * (script.steps.length - 1));
    setCurrentStepIdx(stepIdx);
    setIsPlaying(false);
  };

  // Extract pointer positions
  const pointerList = useMemo(() => {
    if (!currentStep || !currentStep.state) return [];
    const pointers = currentStep.state.pointer || {};
    return Object.entries(pointers).map(([name, index]: [string, any]) => ({
      name,
      index: Number(index),
    }));
  }, [currentStep]);

  // Format problem input block values
  const inputString = useMemo(() => {
    if (!script || !script.steps || script.steps.length === 0) return "";
    const firstStep = script.steps[0];
    const arr = firstStep?.state?.array;
    const target = firstStep?.state?.variables?.target;

    if (
      script.title?.toLowerCase().includes("two sum") ||
      script.problem?.toLowerCase().includes("two sum")
    ) {
      if (arr && target !== undefined) {
        return `nums = [${arr.join(", ")}], target = ${target}`;
      }
    }

    const vars = firstStep?.state?.variables || {};
    const varParts = Object.entries(vars)
      .filter(([k]) => k !== "map")
      .map(([k, v]) => `${k} = ${typeof v === "object" ? JSON.stringify(v) : v}`);

    if (arr) {
      return `array = [${arr.join(", ")}]${
        varParts.length > 0 ? `, ${varParts.join(", ")}` : ""
      }`;
    }

    return varParts.join(", ");
  }, [script]);

  if (!script) return null;

  const displayVal = (val: any) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "object") {
      if ("val" in val) return String(val.val);
      if ("value" in val) return String(val.value);
      return JSON.stringify(val);
    }
    return String(val);
  };

  const isElementVisited = (idx: number) => {
    return currentStep?.animation?.some(
      (a: any) => a.type === "visit" && a.object === "array" && a.index === idx
    );
  };

  const isElementHighlighted = (idx: number) => {
    return currentStep?.animation?.some(
      (a: any) => a.type === "highlight" && a.object === "array" && a.index === idx
    );
  };

  const isElementCompared = (idx: number) => {
    return currentStep?.animation?.some(
      (a: any) => a.type === "compare" && a.object === "array" && a.index === idx
    );
  };

  const isMapHighlighted = currentStep?.animation?.some(
    (a: any) => a.object === "map"
  );

  const isMapCompared = currentStep?.animation?.some(
    (a: any) => a.type === "compare" && a.object === "map"
  );

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#24262C] text-[#171717] dark:text-[#f5f5f5] overflow-hidden font-sans">
      
      {/* 1. Header Layout */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-black/10">
        <div>
          <h3 className="text-[13px] font-extrabold flex items-center gap-2 tracking-tight">
            {script.title || "Execution Visualizer"}
            {script.complexity?.time && (
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
                Time: {script.complexity.time}
              </span>
            )}
          </h3>
          <p className="text-[9px] text-gray-500 dark:text-[#a3a3a3] mt-0.5 font-medium">
            {script.steps.length} steps algorithm walk
          </p>
        </div>
        
        <div className="text-[10px] font-mono font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-200 dark:border-white/5">
          Step {currentStepIdx + 1} / {script.steps.length}
        </div>
      </div>

      {/* 2. Playback Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-black/5">
        
        {/* Playback Controls (SkipBack, Play/Pause, SkipForward, Reset) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={currentStepIdx === 0}
            className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200/60 dark:border-white/5 disabled:opacity-20 disabled:hover:bg-transparent disabled:scale-100 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="p-3 bg-orange-600 hover:bg-orange-500 active:scale-90 text-white rounded-full transition-all flex items-center justify-center hover:scale-105 cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIdx === script.steps.length - 1}
            className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200/60 dark:border-white/5 disabled:opacity-20 disabled:hover:bg-transparent disabled:scale-100 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl border border-gray-200/60 dark:border-white/5 transition-all active:scale-95 ml-1 flex items-center justify-center cursor-pointer"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed selectors and audio */}
        <div className="flex items-center gap-3">
          
          {/* Segmented Speed Selector Control with Framer Motion background sliding */}
          <div className="relative flex bg-gray-100 dark:bg-black/25 p-1 rounded-xl border border-gray-200 dark:border-white/5">
            {[0.5, 1, 2].map((speed) => {
              const isActive = playbackSpeed === speed;
              return (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-extrabold transition-colors duration-200 z-10 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-speed-pill"
                      className="absolute inset-0 bg-orange-600 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  {speed}x
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setVoiceNarration(!voiceNarration)}
            className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              voiceNarration
                ? "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400"
                : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
            title="Toggle voice speech"
          >
            {voiceNarration ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Sleek Slider Timeline with Internal Dots */}
      <div className="px-4 py-3 bg-gray-50/30 dark:bg-black/5 border-b border-gray-200 dark:border-white/5">
        <div
          ref={timelineRef}
          onClick={handleTimelineClick}
          className="relative w-full h-6 flex items-center group cursor-pointer"
        >
          {/* Track Line */}
          <div className="absolute left-0 right-0 h-1.5 bg-gray-200 dark:bg-white/5 rounded-full" />

          {/* Progress fill */}
          <div
            className="absolute left-0 h-1.5 bg-orange-500 rounded-full transition-all duration-200"
            style={{
              width: `${
                script.steps.length > 1
                  ? (currentStepIdx / (script.steps.length - 1)) * 100
                  : 100
              }%`,
            }}
          />

          {/* Notch indicator dots inside track */}
          {script.steps.map((_, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const percentage =
              script.steps.length > 1 ? (idx / (script.steps.length - 1)) * 100 : 0;
            return (
              <div
                key={idx}
                className={`absolute -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 pointer-events-none ${
                  idx === currentStepIdx
                    ? "bg-white scale-125 border border-orange-500"
                    : isCompleted
                    ? "bg-orange-200 dark:bg-orange-400"
                    : "bg-gray-300 dark:bg-white/20"
                }`}
                style={{ left: `${percentage}%` }}
              />
            );
          })}

          {/* Interactive thumb bubble */}
          <motion.div
            className="absolute -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 border-2 border-white dark:border-[#24262C] pointer-events-none flex items-center justify-center hover:scale-110 transition-transform"
            animate={{
              left: `${
                script.steps.length > 1
                  ? (currentStepIdx / (script.steps.length - 1)) * 100
                  : 100
              }%`,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            <div className="w-1 h-1 bg-white rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* 4. Input Display Card */}
      {inputString && (
        <div className="px-4 py-2 bg-gray-50/80 dark:bg-black/15 border-b border-gray-200 dark:border-white/5 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-gray-400 dark:text-[#a3a3a3] tracking-wider uppercase font-mono bg-gray-200/50 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-300/40 dark:border-white/5 select-none">
              INPUT
            </span>
            <code className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-bold select-all whitespace-pre-wrap">
              {inputString}
            </code>
          </div>
          
          {/* Active Math Formula calculation overlay badge */}
          {activeAnimations.calculation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-[0_0_8px_rgba(245,158,11,0.05)] select-none"
            >
              <span className="text-[8px] text-amber-500/60 font-sans uppercase font-black">Math:</span>
              {getFormattedExpression(activeAnimations.calculation, currentStep?.state?.variables || {})}
            </motion.div>
          )}
        </div>
      )}

      {/* 5. Main Visualizer Workspace */}
      <div className="px-4 py-4 bg-white dark:bg-[#1D1E23] flex flex-col items-center justify-center gap-6">
        
        {currentStep && currentStep.state && (
          <div className="w-full flex flex-col items-center gap-6">
            
            {/* Array Grid with Indices & Sliding Pointers */}
            {currentStep.state.array && Array.isArray(currentStep.state.array) && (
              <div 
                className={`flex flex-col items-center gap-1 w-full max-w-full overflow-x-auto pb-2 custom-scrollbar no-scrollbar transition-all duration-300 ${
                  activeAnimations.focusObj && activeAnimations.focusObj !== 'array' ? 'opacity-40 filter blur-[0.3px]' : 'opacity-100'
                }`}
              >
                <div className="flex justify-center items-center gap-3 px-4 min-w-max relative py-3.5">
                  
                  {/* Pointer index -1 spacer */}
                  {pointerList.some((p) => p.index === -1) && (
                    <div className="flex flex-col items-center relative w-14 select-none opacity-40">
                      <div className="w-14 h-14 border border-dashed border-gray-300 dark:border-white/10 rounded-xl flex items-center justify-center text-xs text-gray-400 font-mono">
                        -
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 mt-2 font-bold">
                        [-1]
                      </span>
                      <div className="h-12 flex flex-col items-center justify-start mt-2.5 relative w-full">
                        <AnimatePresence>
                          {pointerList
                            .filter((p) => p.index === -1)
                            .map((ptr) => {
                              const colors = getPointerColor(ptr.name);
                              return (
                                <motion.div
                                  key={ptr.name}
                                  layoutId={`pointer-${ptr.name}`}
                                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                  className="absolute flex flex-col items-center"
                                >
                                  <span className={`text-[13px] font-black font-mono leading-none ${colors.text}`}>
                                    {ptr.name}
                                  </span>
                                  <span className={`text-[10px] leading-none mt-0.5 ${colors.triangle}`}>
                                    ▲
                                  </span>
                                </motion.div>
                              );
                            })}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Array Cells */}
                  {currentStep.state.array.map((val: any, idx: number) => {
                    const visiting = isElementVisited(idx);
                    const highlighted = isElementHighlighted(idx);
                    const compared = isElementCompared(idx);
                    const isSwapping =
                      swapIndices !== null &&
                      (swapIndices[0] === idx || swapIndices[1] === idx);
                    const isReturnedResult = returnIndices.includes(idx);

                    return (
                      <div key={idx} className="flex flex-col items-center relative w-14 select-none">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={
                            isReturnedResult
                              ? {
                                  scale: [1.1, 1.2, 1.15, 1.1],
                                  y: [0, -12, 0, -6, 0],
                                  opacity: 1,
                                  transition: { 
                                    y: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
                                    scale: { duration: 0.3 }
                                  }
                                }
                              : isSwapping
                              ? {
                                  scale: [1, 1.25, 1.1, 1],
                                  y: [0, -10, -10, 0],
                                  opacity: 1,
                                  transition: { duration: 0.5, ease: "easeInOut" },
                                }
                              : { scale: 1, y: 0, opacity: 1 }
                          }
                          transition={{ duration: 0.15 }}
                          className={`
                            w-14 h-14 flex items-center justify-center rounded-xl font-sans font-bold text-xl border transition-all
                            ${
                              isReturnedResult
                                ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-[3px_3px_0px_#10b981]"
                                : isSwapping
                                ? "bg-amber-500/10 border-2 border-amber-500 text-amber-600 dark:text-amber-400 shadow-[3px_3px_0px_#f59e0b]"
                                : visiting
                                ? "bg-orange-500/10 border-2 border-orange-500 text-orange-600 dark:text-orange-400 shadow-[3px_3px_0px_#f97316] scale-105"
                                : compared
                                ? "bg-amber-500/10 border-2 border-amber-500 text-amber-600 dark:text-amber-400 shadow-[3px_3px_0px_#f59e0b] scale-105"
                                : highlighted
                                ? "bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-[3px_3px_0px_#10b981] scale-105"
                                : "bg-gray-100/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:border-gray-300 dark:hover:border-white/10"
                            }
                          `}
                        >
                          {displayVal(val)}
                          {isSwapping && (
                            <motion.div
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              className="absolute -top-3.5 bg-amber-500 text-white p-1 rounded-full shadow-md flex items-center justify-center border-2 border-white dark:border-[#1D1E23] z-20"
                            >
                              <ArrowLeftRight className="w-3 h-3 animate-pulse" />
                            </motion.div>
                          )}
                        </motion.div>

                        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 mt-2 font-bold">
                          [{idx}]
                        </span>

                        {/* Floating Pointer tags (Inverted: letter on top, triangle at the bottom) */}
                        <div className="h-12 flex flex-col items-center justify-start mt-2.5 relative w-full">
                          <AnimatePresence>
                            {pointerList
                              .filter((p) => p.index === idx)
                              .map((ptr) => {
                                const colors = getPointerColor(ptr.name);
                                return (
                                  <motion.div
                                    key={ptr.name}
                                    layoutId={`pointer-${ptr.name}`}
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    className="absolute flex flex-col items-center"
                                  >
                                    <span className={`text-[13px] font-black font-mono leading-none ${colors.text}`}>
                                      {ptr.name}
                                    </span>
                                    <span className={`text-[10px] leading-none mt-0.5 ${colors.triangle}`}>
                                      ▲
                                    </span>
                                  </motion.div>
                                );
                              })}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stack Visualizer */}
            {currentStep.state.stack && Array.isArray(currentStep.state.stack) && (
              <div 
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                  activeAnimations.focusObj && activeAnimations.focusObj !== 'stack' ? 'opacity-40 filter blur-[0.3px]' : 'opacity-100'
                }`}
              >
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Stack
                </div>
                <div className="border border-t-transparent border-gray-300 dark:border-white/10 w-20 h-36 flex flex-col-reverse p-1 gap-1 rounded-b-2xl bg-gray-50/50 dark:bg-black/20 overflow-hidden">
                  <AnimatePresence>
                    {currentStep.state.stack.map((val: any, idx: number) => (
                      <motion.div
                        key={`${idx}-${val}`}
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="w-full h-7 bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center font-bold font-mono text-xs"
                      >
                        {displayVal(val)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Queue Visualizer */}
            {currentStep.state.queue && Array.isArray(currentStep.state.queue) && (
              <div 
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                  activeAnimations.focusObj && activeAnimations.focusObj !== 'queue' ? 'opacity-40 filter blur-[0.3px]' : 'opacity-100'
                }`}
              >
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Queue
                </div>
                <div className="border border-gray-300 dark:border-white/10 w-56 h-12 flex items-center p-1 gap-1 bg-gray-50/50 dark:bg-black/20 overflow-hidden rounded-md">
                  <AnimatePresence>
                    {currentStep.state.queue.map((val: any, idx: number) => (
                      <motion.div
                        key={`${idx}-${val}`}
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -80, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="w-9 h-9 bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center font-bold font-mono text-xs shrink-0"
                      >
                        {displayVal(val)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Variables and Structured Maps Layout */}
            {currentStep.state.variables && Object.keys(currentStep.state.variables).length > 0 && (
              <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                
                {/* 1. Symbol Table Variable Card */}
                <div 
                  className={`bg-gray-50/50 dark:bg-black/10 border border-gray-200 dark:border-white/5 rounded-xl p-3 flex flex-col h-[190px] transition-all duration-300 ${
                    activeAnimations.focusObj && activeAnimations.focusObj !== 'variables' ? 'opacity-40 filter blur-[0.3px]' : 'opacity-100'
                  }`}
                >
                  <div className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 font-mono border-b border-gray-200 dark:border-white/5 pb-1">
                    Symbol Table (Local Variables)
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
                    {Object.entries(currentStep.state.variables)
                      .filter(([key]) => key !== "map")
                      .map(([key, val]: [string, any]) => {
                        const isVarHighlighted = activeAnimations.highlightedVars.has(key);
                        return (
                          <div
                            key={key}
                            className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg border transition-all ${
                              isVarHighlighted
                                ? "bg-orange-500/10 border-orange-500 scale-[1.02] text-orange-600 dark:text-orange-400 font-bold"
                                : "bg-white dark:bg-black/15 border-gray-100 dark:border-white/5"
                            } text-[11px]`}
                          >
                            <span className="font-mono font-semibold text-gray-500 dark:text-gray-400">{key}</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400 font-mono">
                              {displayVal(val)}
                            </span>
                          </div>
                        );
                      })}
                    {Object.keys(currentStep.state.variables).filter(([key]) => key !== "map").length === 0 && (
                      <div className="text-[10px] italic text-gray-500 font-mono p-2">empty</div>
                    )}
                  </div>
                </div>

                {/* 2. Structured HashMap Card (Table) */}
                {Object.keys(currentStep.state.variables).includes("map") && (
                  <div
                    className={`bg-gray-50/50 dark:bg-black/10 border rounded-xl p-3 flex flex-col h-[190px] transition-all duration-300 ${
                      activeAnimations.focusObj && activeAnimations.focusObj !== 'map' ? 'opacity-40 filter blur-[0.3px]' : 'opacity-100'
                    } ${
                      isMapCompared || activeAnimations.lookup
                        ? "border-amber-500/50"
                        : isMapHighlighted || activeAnimations.insert
                        ? "border-orange-500/50"
                        : "border-gray-200 dark:border-white/5"
                    }`}
                  >
                    <div className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 font-mono border-b border-gray-200 dark:border-white/5 pb-1 flex justify-between items-center select-none">
                      <span>HashMap</span>
                      {activeAnimations.lookup && (
                        <span className={`text-[8px] font-black animate-pulse font-mono uppercase tracking-wider ${
                          activeAnimations.lookup.found ? "text-amber-500 dark:text-amber-400" : "text-rose-500"
                        }`}>
                          {activeAnimations.lookup.found ? `Found Key ${activeAnimations.lookup.foundKey ?? activeAnimations.lookup.key}` : `Lookup Fail: ${activeAnimations.lookup.key}`}
                        </span>
                      )}
                      {activeAnimations.insert && !activeAnimations.lookup && (
                        <span className="text-[8px] font-black text-orange-500 dark:text-orange-400 animate-pulse font-mono uppercase tracking-wider">
                          Insert: {activeAnimations.insert.key}
                        </span>
                      )}
                    </div>
                    
                    {(() => {
                      const mapString = currentStep.state.variables.map;
                      const parsedMap = parseMapString(mapString);

                      if (!parsedMap) {
                        return (
                          <div className="bg-white dark:bg-black/15 p-2 rounded-lg border border-gray-200 dark:border-white/5 text-[11px] font-mono text-gray-700 dark:text-gray-300 overflow-x-auto flex-1">
                            {displayVal(mapString)}
                          </div>
                        );
                      }

                      const entries = Object.entries(parsedMap);
                      return (
                        <div className="flex-1 flex flex-col min-h-0">
                          {entries.length === 0 ? (
                            <div className="text-[10px] italic text-gray-500 font-mono p-2 bg-white dark:bg-black/15 rounded border border-dashed border-gray-200 dark:border-white/5 select-none">
                              Empty HashMap
                            </div>
                          ) : (
                            <div className="flex-1 overflow-y-auto custom-scrollbar border border-gray-200 dark:border-white/5 rounded-lg bg-white dark:bg-black/15">
                              <table className="w-full text-left border-collapse text-[11px] font-mono">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-black/30 text-[8px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-bold select-none">
                                    <th className="px-2.5 py-1.5 border-r border-gray-200 dark:border-white/5">Key (Num)</th>
                                    <th className="px-2.5 py-1.5">Value (Idx)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {entries.map(([k, v]) => {
                                    const keyNum = Number(k);
                                    const isLookupMatch = activeAnimations.lookup && (activeAnimations.lookup.key === keyNum || activeAnimations.lookup.foundKey === keyNum);
                                    const isInsertMatch = activeAnimations.insert && activeAnimations.insert.key === keyNum;
                                    const isHighlighted = activeAnimations.highlightedKeys.has(keyNum);
                                    const isPulsing = activeAnimations.pulsingKeys.has(keyNum);

                                    return (
                                      <tr 
                                        key={k} 
                                        className={`
                                          border-b last:border-0 border-gray-200 dark:border-white/5 transition-all
                                          ${
                                            isInsertMatch
                                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border-l-2 border-l-emerald-500 animate-pulse"
                                              : isLookupMatch
                                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border-l-2 border-l-amber-500 scale-[1.01]"
                                              : isHighlighted
                                              ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border-l-2 border-l-orange-500"
                                              : isPulsing
                                              ? "animate-pulse bg-gray-50 dark:bg-white/5 scale-[1.01]"
                                              : "hover:bg-gray-50/50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                                          }
                                        `}
                                      >
                                        <td className="px-2.5 py-1 border-r border-gray-200 dark:border-white/5">{k}</td>
                                        <td className="px-2.5 py-1">{v}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </div>

      {/* 6. Caption / Explanation Block (Transparent bg, merges with parent container) */}
      {currentStep && (
        <div className="px-4 py-3.5 border-t border-gray-200 dark:border-white/5 bg-transparent">
          <div className="flex flex-col items-center text-center gap-1.5">
            
            {/* Step Caption label */}
            <div className="flex items-center gap-2 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest font-mono">
                {captionText}
              </span>
            </div>

            {/* Step speech text description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStepIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl font-medium"
              >
                {speechText}
              </motion.p>
            </AnimatePresence>

          </div>
        </div>
      )}

    </div>
  );
}

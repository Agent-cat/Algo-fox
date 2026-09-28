"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [swapIndices, setSwapIndices] = useState<[number, number] | null>(null);
  const prevArrayRef = useRef<any[] | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const speakText = useCallback(async (text: string): Promise<void> => {
    if (!voiceNarration || typeof window === "undefined") return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (!text || text.trim().length === 0) return;

    try {
      const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&_t=${Date.now()}`;

      const audio = new Audio(ttsUrl);
      audioRef.current = audio;
      audio.volume = 1.0;
      audio.onerror = () => {
        console.warn("[TTS] audio error code:", audio.error?.code, "msg:", audio.error?.message);
      };

      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.load();
        audio.play().catch(() => resolve());
      });
    } catch (err) {
      console.warn("Google TTS fetch failed:", err);
    }
  }, [voiceNarration]);

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

  // Autoplay: advance step by step, waiting for narration to finish
  useEffect(() => {
    if (!isPlaying || !script || !script.steps) return;

    const speech = currentStep?.speech || currentStep?.caption || "";

    const advance = async () => {
      if (voiceNarration && speech) {
        await speakText(speech);
      } else {
        await new Promise((r) => setTimeout(r, Math.max(2000 / playbackSpeed, 2500 / playbackSpeed)));
      }

      if (!isPlaying) return;

      if (currentStepIdx < script.steps.length - 1) {
        setCurrentStepIdx((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    advance();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying, currentStepIdx, script, playbackSpeed, voiceNarration, speakText]);

  // No narration on manual step changes — narration only happens during autoplay

  const handlePlayPause = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    if (script && currentStepIdx < script.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
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
    <div className="bg-white dark:bg-[#24262C] overflow-hidden font-sans">
      
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {script.title || "Execution Visualizer"}
          </h3>
          {script.complexity?.time && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
              {script.complexity.time}
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-gray-400">
          {currentStepIdx + 1} / {script.steps.length}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 px-5 py-2.5 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 disabled:opacity-20 transition-all cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all flex items-center justify-center cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIdx === script.steps.length - 1}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 disabled:opacity-20 transition-all cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all cursor-pointer ml-1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-white/5 p-0.5 rounded-lg">
            {[0.5, 1, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`relative px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  playbackSpeed === speed
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setVoiceNarration(!voiceNarration)}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              voiceNarration
                ? "text-orange-500"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            {voiceNarration ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Step Dots */}
      <div className="px-5 py-3 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-center gap-1.5">
          {script.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStepIdx(idx);
                setIsPlaying(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                idx === currentStepIdx
                  ? "w-6 bg-orange-500"
                  : idx < currentStepIdx
                  ? "w-1.5 bg-orange-400/40"
                  : "w-1.5 bg-gray-300 dark:bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Input */}
      {inputString && (
        <div className="px-5 py-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <code className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-bold select-all">
            {inputString}
          </code>
          {activeAnimations.calculation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold"
            >
              {getFormattedExpression(activeAnimations.calculation, currentStep?.state?.variables || {})}
            </motion.div>
          )}
        </div>
      )}

      {/* Visualizer */}
      <div className="px-5 py-6 bg-white dark:bg-[#1D1E23] flex flex-col items-center justify-center gap-6 min-h-[200px]">
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

      {/* Caption */}
      {currentStep && (
        <div className="px-5 py-4 border-t border-gray-100 dark:border-white/5">
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider font-mono">
                {captionText}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStepIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium max-w-lg"
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

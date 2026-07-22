"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Volume2, Sparkles, Code2, PlayCircle, FastForward, CheckCircle, BarChart3, AlertCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

// Sample default algorithm: Binary Search
const DEFAULT_CODE = `function binarySearch(arr, target) {
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
}`;

const DEFAULT_PROBLEM = "Find the index of target value in a sorted array.";

export default function AnimationCanvas() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [language, setLanguage] = useState("javascript");
    const [problemStatement, setProblemStatement] = useState(DEFAULT_PROBLEM);
    const [isGenerating, setIsGenerating] = useState(false);
    
    // Animation data
    const [animationPlan, setAnimationPlan] = useState<any>(null);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1); // multiplier
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Swap animation state
    const prevArrayRef = useRef<any[] | null>(null);
    const [swapIndices, setSwapIndices] = useState<[number, number] | null>(null);

    // Audio text-to-speech simulation (or standard browser SpeechSynthesis)
    const [voiceNarration, setVoiceNarration] = useState(true);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    const speakText = (text: string) => {
        if (!voiceNarration || !synthRef.current) return;
        synthRef.current.cancel(); // Stop current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1 * playbackSpeed;
        synthRef.current.speak(utterance);
    };

    const handleGenerate = async () => {
        if (!code.trim()) {
            toast.error("Please enter some source code");
            return;
        }
        setIsGenerating(true);
        setIsPlaying(false);
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
                toast.success("Animation generated successfully!");
                if (data.data.steps && data.data.steps.length > 0) {
                    speakText(data.data.steps[0].speech || data.data.steps[0].caption);
                }
            } else {
                toast.error(data.error || "Failed to parse code.");
            }
        } catch (e) {
            console.error(e);
            toast.error("Error connecting to Gemini");
        } finally {
            setIsGenerating(false);
        }
    };

    const currentStep = useMemo(() => {
        if (!animationPlan || !animationPlan.steps || animationPlan.steps.length === 0) return null;
        return animationPlan.steps[currentStepIdx];
    }, [animationPlan, currentStepIdx]);

    // Detect and trigger swap animation
    useEffect(() => {
        if (!currentStep) return;
        const arr = currentStep.state?.array;
        if (!arr || !Array.isArray(arr)) {
            setSwapIndices(null);
            prevArrayRef.current = arr;
            return;
        }

        const anims = currentStep.animation || [];
        let detected: [number, number] | null = null;

        // 1. Check animation metadata for explicit swap
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

        // 2. Detect by comparing previous vs current array state
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

        setSwapIndices(detected);
        prevArrayRef.current = [...arr];

        if (detected) {
            const timeout = setTimeout(() => setSwapIndices(null), 600);
            return () => clearTimeout(timeout);
        }
    }, [currentStepIdx, currentStep]);

    // Handle auto play loop
    useEffect(() => {
        if (isPlaying && animationPlan && animationPlan.steps) {
            const stepDuration = Math.max(1500 / playbackSpeed, 2000 / playbackSpeed);
            timerRef.current = setTimeout(() => {
                if (currentStepIdx < animationPlan.steps.length - 1) {
                    setCurrentStepIdx(prev => prev + 1);
                } else {
                    setIsPlaying(false);
                }
            }, stepDuration);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, currentStepIdx, animationPlan, playbackSpeed]);

    // Speak when step changes
    useEffect(() => {
        if (currentStep) {
            speakText(currentStep.speech || currentStep.caption);
        }
    }, [currentStepIdx, currentStep]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setIsPlaying(false);
        if (animationPlan && currentStepIdx < animationPlan.steps.length - 1) {
            setCurrentStepIdx(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setIsPlaying(false);
        if (currentStepIdx > 0) {
            setCurrentStepIdx(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStepIdx(0);
        if (synthRef.current) synthRef.current.cancel();
    };

    // Helper to get variable pointer alignments
    const pointerList = useMemo(() => {
        if (!currentStep || !currentStep.state) return [];
        const pointers = currentStep.state.pointer || {};
        return Object.entries(pointers).map(([name, index]: [string, any]) => ({
            name,
            index: Number(index)
        }));
    }, [currentStep]);

    // Helper to render active code line highlighting
    const highlightLineProps = (lineNumber: number) => {
        if (currentStep && currentStep.line === lineNumber) {
            return { style: { display: "block", backgroundColor: "rgba(249, 115, 22, 0.2)", borderLeft: "4px solid rgb(249, 115, 22)" } };
        }
        return {};
    };

    return (
        <div className="w-full flex flex-col gap-6 bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-white/10 p-5 md:p-6 shadow-sm overflow-hidden">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-200 dark:border-orange-500/20">
                        <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">Visual Learn Canvas</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Convert standard code into beautiful animations using AI planners</p>
                    </div>
                </div>
            </div>

            {/* Split layout: Input / Visualizer */}
            {!animationPlan ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
                    {/* Code Inputs */}
                    <div className="flex flex-col gap-4 bg-white dark:bg-[#24262C] p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">
                            <Code2 className="w-4 h-4 text-orange-500" />
                            Input Algorithm Details
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Problem Statement / Goal (optional)</label>
                            <input
                                type="text"
                                value={problemStatement}
                                onChange={(e) => setProblemStatement(e.target.value)}
                                placeholder="e.g. Find index of target in sorted list"
                                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500">Language</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:outline-none dark:text-white"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="cpp">C++</option>
                                    <option value="java">Java</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col space-y-1 min-h-[250px]">
                            <label className="text-xs font-semibold text-gray-500">Source Code</label>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Paste your DSA code here..."
                                className="flex-1 w-full p-4 font-mono text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:text-white resize-none"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isGenerating ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    AI Planning Canvas...
                                </>
                            ) : (
                                <>
                                    <PlayCircle className="w-4 h-4" />
                                    Generate Visual Simulation
                                </>
                            )}
                        </button>
                    </div>

                    {/* Pre-run Visual Info */}
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#1D1E23] rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-center">
                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-200 dark:border-orange-500/20 mb-4 animate-pulse">
                            <Sparkles className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2">Algorithm Canvas Planner</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-6">
                            Submit any algorithm code block. Gemini AI plans animation states, tracing running arrays, stack pointers, loops, and variables step-by-step.
                        </p>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Dynamic Arrays
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Stack & Queue States
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> AI Speech Synthesis
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                /* Interactive Animation Canvas Area */
                <div className="flex flex-col gap-5 min-h-[550px]">
                    {/* Control Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#24262C] p-4 rounded-xl border border-gray-200 dark:border-white/5">
                        {/* Playback Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleBack}
                                disabled={currentStepIdx === 0}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg disabled:opacity-30 transition-colors"
                                title="Previous Step"
                            >
                                <SkipBack className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={handlePlayPause}
                                className="p-3.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
                                title={isPlaying ? "Pause" : "Play Animation"}
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentStepIdx === animationPlan.steps.length - 1}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg disabled:opacity-30 transition-colors"
                                title="Next Step"
                            >
                                <SkipForward className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={handleReset}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors ml-1"
                                title="Reset Timeline"
                            >
                                <RotateCcw className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Title, Progress & Details */}
                        <div className="flex-1 min-w-[200px] px-2 text-center md:text-left">
                            <div className="text-xs font-semibold text-orange-500 dark:text-orange-400 mb-0.5 tracking-wider uppercase">
                                {animationPlan.title} — Step {currentStepIdx + 1} of {animationPlan.steps.length}
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-orange-500 h-full transition-all duration-300"
                                    style={{ width: `${((currentStepIdx + 1) / animationPlan.steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Settings & Options */}
                        <div className="flex items-center gap-3">
                            {/* Speed Selector */}
                            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 rounded-xl px-2.5 py-1.5 border border-gray-200/50 dark:border-white/5">
                                <FastForward className="w-3.5 h-3.5 text-gray-400" />
                                <select
                                    value={playbackSpeed}
                                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                                    className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
                                >
                                    <option value="0.5">0.5x</option>
                                    <option value="1">1.0x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2.0x</option>
                                </select>
                            </div>

                            {/* Speech Toggle */}
                            <button
                                onClick={() => setVoiceNarration(!voiceNarration)}
                                className={`p-2 rounded-xl border transition-all ${
                                    voiceNarration 
                                        ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400" 
                                        : "bg-transparent border-gray-200 dark:border-white/5 text-gray-400"
                                }`}
                                title="Speech Narration"
                            >
                                <Volume2 className="w-4 h-4" />
                            </button>

                            {/* Back to Edit Button */}
                            <button
                                onClick={() => setAnimationPlan(null)}
                                className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl border border-gray-200 dark:border-white/5 transition-all cursor-pointer"
                            >
                                Edit Code
                            </button>
                        </div>
                    </div>

                    {/* Simulation Split Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Visual Canvas Area (7 cols) */}
                        <div className="lg:col-span-7 bg-white dark:bg-[#24262C] p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm flex flex-col justify-between min-h-[400px]">
                            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
                                {/* Visual structures based on active state */}
                                {currentStep && currentStep.state && (
                                    <div className="w-full flex flex-col items-center justify-center gap-12">
                                        {/* Array Rendering */}
                                        {currentStep.state.array && Array.isArray(currentStep.state.array) && (
                                            <div className="flex flex-col items-center gap-6 w-full max-w-md">
                                                <div className="flex items-center gap-2 self-start text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    Array Index
                                                </div>
                                                <div className="flex justify-center items-center gap-2.5 w-full relative py-8 border-y border-dashed border-gray-200 dark:border-white/5">
                                                    {currentStep.state.array.map((val: any, idx: number) => {
                                                        const isCompared = currentStep.animation?.some((anim: any) => anim.type === 'compare' && anim.object === 'array' && currentStep.state.pointer?.mid === idx);
                                                        const isSwapping = swapIndices !== null && (swapIndices[0] === idx || swapIndices[1] === idx);

                                                        return (
                                                            <motion.div
                                                                key={`${idx}-${String(val)}`}
                                                                layout
                                                                initial={false}
                                                                animate={
                                                                    isSwapping
                                                                        ? { scale: [1, 1.2, 1.1, 1], y: [0, -12, -12, 0], transition: { duration: 0.55, ease: "easeInOut" } }
                                                                        : { scale: 1, y: 0 }
                                                                }
                                                                className={`
                                                                    relative w-12 h-12 flex flex-col items-center justify-center rounded-xl font-bold border-2 text-sm shadow-sm
                                                                    ${isSwapping
                                                                        ? "bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-500/20 dark:border-orange-400 dark:text-orange-300 shadow-orange-200 dark:shadow-orange-500/20 shadow-lg"
                                                                        : isCompared
                                                                            ? "bg-yellow-50 border-yellow-400 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                                            : "bg-gray-50 border-gray-200 text-gray-800 dark:bg-white/5 dark:border-white/10 dark:text-gray-100"}
                                                                `}
                                                            >
                                                                {/* Index Badge */}
                                                                <span className="absolute -top-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 font-mono">
                                                                    {idx}
                                                                </span>

                                                                {String(val)}

                                                                {/* Pointer Badges inside Array Items */}
                                                                <AnimatePresence>
                                                                    {pointerList.filter(p => p.index === idx).map(ptr => (
                                                                        <motion.div
                                                                            key={ptr.name}
                                                                            initial={{ scale: 0, y: 15 }}
                                                                            animate={{ scale: 1, y: 35 }}
                                                                            exit={{ scale: 0, y: 15 }}
                                                                            className="absolute text-[9px] px-1.5 py-0.5 rounded bg-purple-500 text-white font-mono uppercase font-black tracking-widest shadow-sm whitespace-nowrap z-10"
                                                                        >
                                                                            {ptr.name}
                                                                        </motion.div>
                                                                    ))}
                                                                </AnimatePresence>
                                                            </motion.div>
                                                        );
                                                    })}

                                                    {/* Swap cross-arrow indicator */}
                                                    <AnimatePresence>
                                                        {swapIndices && (
                                                            <motion.div
                                                                key="swap-arrow"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                                                className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                                                            >
                                                                <div className="flex items-center gap-1 bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap uppercase tracking-wider">
                                                                    <span className="text-[11px]">⇄</span> SWAP
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        )}

                                        {/* Stack Rendering */}
                                        {currentStep.state.stack && Array.isArray(currentStep.state.stack) && (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Stack (LIFO)</div>
                                                <div className="border-2 border-t-transparent border-gray-300 dark:border-white/10 w-24 h-48 flex flex-col-reverse p-1.5 gap-1.5 rounded-b-xl bg-gray-50/50 dark:bg-white/1 overflow-hidden">
                                                    <AnimatePresence>
                                                        {currentStep.state.stack.map((val: any, idx: number) => (
                                                            <motion.div
                                                                key={`${idx}-${val}`}
                                                                initial={{ y: -100, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                exit={{ y: -50, opacity: 0 }}
                                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                                className="w-full h-8 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center font-bold text-xs"
                                                            >
                                                                {val}
                                                            </motion.div>
                                                        ))}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        )}

                                        {/* Queue Rendering */}
                                        {currentStep.state.queue && Array.isArray(currentStep.state.queue) && (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Queue (FIFO)</div>
                                                <div className="border-y-2 border-gray-300 dark:border-white/10 w-64 h-14 flex items-center p-1.5 gap-1.5 bg-gray-50/50 dark:bg-white/1 overflow-hidden">
                                                    <AnimatePresence>
                                                        {currentStep.state.queue.map((val: any, idx: number) => (
                                                            <motion.div
                                                                key={`${idx}-${val}`}
                                                                initial={{ x: 100, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                exit={{ x: -100, opacity: 0 }}
                                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                                className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                                                            >
                                                                {val}
                                                            </motion.div>
                                                        ))}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        )}

                                        {/* Running Variables Box */}
                                        {currentStep.state.variables && Object.keys(currentStep.state.variables).length > 0 && (
                                            <div className="flex flex-col gap-2 w-full max-w-sm bg-gray-50 dark:bg-white/2 rounded-xl p-3 border border-gray-200 dark:border-white/5">
                                                <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Running Variables</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {Object.entries(currentStep.state.variables).map(([key, val]: [string, any]) => (
                                                        <div key={key} className="flex justify-between items-center bg-white dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-white/5">
                                                            <span className="text-xs font-mono font-bold text-gray-500">{key}</span>
                                                            <span className="text-xs font-bold text-gray-800 dark:text-white font-mono">{String(val)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Caption & Speech Narration Bubble */}
                            <div className="mt-4 bg-orange-50/50 dark:bg-orange-500/5 p-4 rounded-xl border border-orange-200/50 dark:border-orange-500/10 flex items-start gap-3">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-orange-700 dark:text-orange-400 uppercase tracking-wide">
                                        {currentStep?.caption || "Executing..."}
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                        {currentStep?.speech || ""}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Code Editor Panel (5 cols) */}
                        <div className="lg:col-span-5 bg-[#282C34] rounded-2xl border border-gray-800 shadow-lg overflow-hidden flex flex-col min-h-[400px]">
                            {/* Editor Header */}
                            <div className="bg-[#21252B] px-4 py-3 flex items-center gap-2 border-b border-gray-900">
                                <div className="flex gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono ml-2">code_tracer.{language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : "js"}</span>
                            </div>

                            {/* Highlighter */}
                            <div className="flex-1 overflow-auto text-sm">
                                <SyntaxHighlighter
                                    language={language}
                                    style={oneDark}
                                    showLineNumbers
                                    wrapLines
                                    lineProps={(lineNum) => highlightLineProps(lineNum)}
                                    customStyle={{
                                        margin: 0,
                                        padding: "16px 0",
                                        background: "transparent",
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>

                            {/* Complexity Details Footer */}
                            {animationPlan.complexity && (
                                <div className="bg-[#21252B] p-3 border-t border-gray-900 grid grid-cols-2 gap-2 text-xs font-mono text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <BarChart3 className="w-3.5 h-3.5 text-orange-500" />
                                        <span>Time: {animationPlan.complexity.time || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                                        <span>Space: {animationPlan.complexity.space || "N/A"}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

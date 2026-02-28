"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircle2, XCircle, Terminal, Lock, Clock, AlertCircle, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { ProblemTestCase, TestCase } from '@prisma/client';
import PeerComparisonCard from '@/components/analytics/PeerComparisonCard';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface TestCasesProps {
    cases?: ProblemTestCase[];
    results?: TestCase[];
    mode?: "RUN" | "SUBMIT" | null;
    status?: string | null;
    problemId?: string;
}

const tabButtonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03, y: -1 },
    tap: { scale: 0.96 }
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 6, filter: "blur(2px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
        opacity: 0,
        y: -4,
        filter: "blur(2px)",
        transition: { duration: 0.15 }
    }
};

const bannerVariants: Variants = {
    hidden: { opacity: 0, x: -12, scale: 0.97 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export default function TestCases({ cases, results, mode, status, problemId }: TestCasesProps) {
    const [activeTab, setActiveTab] = useState<number | "console">(0);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Check if there's any compilation error or error message
    const hasError = useMemo(() => {
        if (status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") return true;
        if (!results || results.length === 0) return false;
        const hasErr = results.some(r =>
            r.status === "COMPILE_ERROR" ||
            r.status === "RUNTIME_ERROR" ||
            (r.errorMessage && r.errorMessage.trim().length > 0)
        );
        return hasErr;
    }, [results, status]);

    const errorMessage = useMemo(() => {
        if ((status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") && (!results || results.length === 0)) {
            return "Execution failed. The server might be unreachable or the code caused a fatal system error.";
        }
        if (!results || results.length === 0) return null;
        const compileError = results.find(r => r.status === "COMPILE_ERROR" && r.errorMessage && r.errorMessage.trim().length > 0);
        if (compileError?.errorMessage) return compileError.errorMessage.trim();
        const runtimeError = results.find(r => r.status === "RUNTIME_ERROR" && r.errorMessage && r.errorMessage.trim().length > 0);
        if (runtimeError?.errorMessage) return runtimeError.errorMessage.trim();
        const anyError = results.find(r => r.errorMessage && r.errorMessage.trim().length > 0);
        if (anyError?.errorMessage) return anyError.errorMessage.trim();
        return null;
    }, [results, status]);

    // Get error details for console
    const errorDetails = useMemo(() => {
        if ((status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") && (!results || results.length === 0)) {
            return {
                type: status === "COMPILE_ERROR" ? "Compilation Error" : "Runtime Error",
                status: status,
                message: "System Error: The execution environment returned an error without test case details.",
                testCaseIndex: undefined,
                time: undefined,
                memory: undefined
            };
        }
        if (!results || results.length === 0) return null;

        const compileError = results.find(r => r.status === "COMPILE_ERROR");
        if (compileError) {
            return {
                type: "Compilation Error",
                status: "COMPILE_ERROR",
                message: compileError.errorMessage || "Compilation failed",
                testCaseIndex: compileError.index,
                time: undefined,
                memory: undefined
            };
        }

        const runtimeError = results.find(r => r.status === "RUNTIME_ERROR");
        if (runtimeError) {
            const errorMsg = runtimeError.errorMessage?.trim();
            const defaultMsg = errorMsg
                ? errorMsg
                : "A runtime error occurred. This usually means:\n- Division by zero\n- Array index out of bounds\n- Null pointer exception\n- Stack overflow";

            return {
                type: "Runtime Error",
                status: "RUNTIME_ERROR",
                message: defaultMsg,
                testCaseIndex: runtimeError.index,
                time: runtimeError.time,
                memory: runtimeError.memory
            };
        }

        const anyError = results.find(r => r.errorMessage && r.errorMessage.trim().length > 0);
        if (anyError) {
            return {
                type: "Error",
                status: anyError.status,
                message: anyError.errorMessage,
                testCaseIndex: anyError.index,
                time: anyError.time,
                memory: anyError.memory
            };
        }

        const anyErrorStatus = results.find(r =>
            r.status !== "ACCEPTED" &&
            r.status !== "PENDING" &&
            (r.status === "WRONG_ANSWER" || r.status === "TIME_LIMIT_EXCEEDED" || r.status === "MEMORY_LIMIT_EXCEEDED")
        );
        if (anyErrorStatus) {
            return {
                type: anyErrorStatus.status.replace(/_/g, " "),
                status: anyErrorStatus.status,
                message: anyErrorStatus.errorMessage || `${anyErrorStatus.status.replace(/_/g, " ")} occurred`,
                testCaseIndex: anyErrorStatus.index,
                time: anyErrorStatus.time,
                memory: anyErrorStatus.memory
            };
        }
        return null;
    }, [results, status]);

    // Auto-switch to console tab when error is first detected
    useEffect(() => {
        if (!results || results.length === 0) {
            setActiveTab(0);
        } else if (hasError) {
            setActiveTab("console");
        }
    }, [hasError, results]);

    // Auto-expand when results come in
    useEffect(() => {
        if (results && results.length > 0) {
            setIsCollapsed(false);
        }
    }, [results]);

    // Calculate runtime and memory
    const { submissionRuntime, submissionMemory } = useMemo(() => {
        if (!results || status !== "ACCEPTED") return { submissionRuntime: 0, submissionMemory: 0 };
        const time = results.reduce((acc, curr) => acc + (curr.time || 0), 0);
        const mem = results.reduce((max, curr) => Math.max(max, curr.memory || 0), 0);
        return { submissionRuntime: time, submissionMemory: mem };
    }, [results, status]);

    const safeCases = cases || [];
    const publicCases = safeCases.filter(tc => !tc.hidden);

    let displayCases: ProblemTestCase[];
    let totalCount: number;
    let resultsMap: Map<number, TestCase> | null = null;

    if (results && results.length > 0) {
        resultsMap = new Map(results.map(r => [r.index, r]));
        if (mode === "SUBMIT") {
            displayCases = safeCases;
            totalCount = safeCases.length;
        } else {
            displayCases = publicCases;
            totalCount = publicCases.length;
        }
    } else {
        displayCases = publicCases;
        totalCount = publicCases.length;
    }

    const indices = Array.from({ length: totalCount }, (_, i) => i);

    // Count passed/failed
    const passedCount = results ? results.filter(r => r.status === "ACCEPTED").length : 0;
    const totalResults = results ? results.length : 0;

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#0a0a0a] border-t border-gray-200/80 dark:border-[#1e1e1e]">
            {/* Header - Always visible, acts as toggle */}
            <motion.div
                className="flex items-center justify-between gap-3 px-4 py-2 bg-gray-50/50 dark:bg-[#0d0d0d] border-b border-gray-100/80 dark:border-[#1a1a1a] cursor-pointer select-none group"
                onClick={() => setIsCollapsed(!isCollapsed)}
                whileTap={{ scale: 0.998 }}
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Terminal className="w-4 h-4 text-orange-500" />
                        Test Cases
                    </div>

                    {/* Status summary pill */}
                    {results && results.length > 0 && status && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`
                                inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide
                                ${status === "ACCEPTED"
                                    ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30"
                                    : hasError
                                        ? "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30"
                                        : "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
                                }
                            `}
                        >
                            {status === "ACCEPTED" && <CheckCircle2 className="w-3 h-3" />}
                            {hasError && <XCircle className="w-3 h-3" />}
                            {status === "ACCEPTED" ? `${passedCount}/${totalResults} Passed` : status.replace(/_/g, " ")}
                        </motion.div>
                    )}
                </div>

                <motion.div
                    animate={{ rotate: isCollapsed ? 0 : 180 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                >
                    <ChevronUp className="w-4 h-4" />
                </motion.div>
            </motion.div>

            {/* Collapsible Content */}
            <AnimatePresence initial={false}>
                {!isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex-1 overflow-hidden flex flex-col"
                    >
                        {/* Tabs and Content */}
                        <div className="px-4 py-3 flex-1 flex flex-col overflow-hidden">
                            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 custom-scrollbar">
                                {/* Console Tab */}
                                {hasError && (
                                    <motion.button
                                        onClick={() => setActiveTab("console")}
                                        variants={tabButtonVariants}
                                        initial="idle"
                                        whileHover="hover"
                                        whileTap="tap"
                                        className={`
                                            flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border
                                            ${activeTab === "console"
                                                ? 'bg-red-100 dark:bg-red-500/15 text-red-800 dark:text-red-300 border-red-300 dark:border-red-500/40 shadow-sm shadow-red-500/10'
                                                : 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10'
                                            }
                                        `}
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <AlertCircle className="w-3.5 h-3.5" />
                                        </motion.div>
                                        Console
                                    </motion.button>
                                )}
                                {indices.map((displayIndex) => {
                                    const testCase = displayCases[displayIndex];
                                    const originalIndex = safeCases.findIndex(tc => tc.id === testCase.id);
                                    const result = resultsMap?.get(originalIndex);
                                    const isHidden = testCase.hidden;
                                    const caseStatus = result?.status;

                                    const getStatusStyles = () => {
                                        if (!caseStatus) return '';
                                        switch (caseStatus) {
                                            case 'ACCEPTED': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30';
                                            case 'PROCESSING': return 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30';
                                            case 'PENDING': return '';
                                            default: return 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30';
                                        }
                                    };

                                    return (
                                        <motion.button
                                            key={displayIndex}
                                            onClick={() => setActiveTab(displayIndex)}
                                            variants={tabButtonVariants}
                                            initial="idle"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className={`
                                                flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border
                                                ${activeTab === displayIndex
                                                    ? 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 border-gray-200 dark:border-[#2a2a2a] shadow-sm'
                                                    : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-[#141414] hover:text-gray-700 dark:hover:text-gray-300'
                                                }
                                                ${getStatusStyles()}
                                            `}
                                        >
                                            {caseStatus === 'ACCEPTED' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                </motion.div>
                                            )}
                                            {caseStatus && caseStatus !== 'ACCEPTED' && caseStatus !== 'PENDING' && caseStatus !== 'PROCESSING' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                >
                                                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                                                </motion.div>
                                            )}
                                            {caseStatus === 'PENDING' && <Clock className="w-3.5 h-3.5 text-gray-400 animate-pulse" />}
                                            {caseStatus === 'PROCESSING' && <div className="w-3 h-3 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />}

                                            {mode === "SUBMIT" && isHidden ? `Case ${originalIndex + 1}` : (isHidden ? "Hidden Case" : `Case ${originalIndex + 1}`)}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Peer Comparison */}
                            {status === "ACCEPTED" && mode === "SUBMIT" && problemId && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-3"
                                >
                                    <PeerComparisonCard
                                        problemId={problemId}
                                        runtime={submissionRuntime}
                                        memory={submissionMemory}
                                    />
                                </motion.div>
                            )}

                            {/* Content */}
                            <div className="flex-1 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {activeTab === "console" && hasError ? (
                                        errorDetails ? (
                                            <motion.div
                                                key="console"
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="h-full flex flex-col bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-[#1e1e1e] overflow-hidden shadow-sm"
                                            >
                                                {/* Console Header */}
                                                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-[#1e1e1e]">
                                                    <Code2 className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Console Output</span>
                                                    <div className="ml-auto flex items-center gap-2">
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR"
                                                                ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30"
                                                                : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
                                                            }`}
                                                        >
                                                            {errorDetails.type}
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                {/* Console Content */}
                                                <div className="flex-1 overflow-auto p-4">
                                                    <div className="space-y-4">
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -8 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <AlertCircle className={`w-4 h-4 ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "text-red-500" : "text-amber-500"}`} />
                                                            <span className={`text-sm font-semibold ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "text-red-700 dark:text-red-400" : "text-amber-700 dark:text-amber-400"}`}>
                                                                {errorDetails.type}
                                                            </span>
                                                        </motion.div>

                                                        {errorDetails.testCaseIndex !== undefined && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.15 }}
                                                                className="text-xs text-gray-500 dark:text-gray-400"
                                                            >
                                                                <span className="font-medium text-gray-700 dark:text-gray-300">Test Case:</span> {errorDetails.testCaseIndex + 1}
                                                            </motion.div>
                                                        )}

                                                        {((errorDetails.time !== null && errorDetails.time !== undefined) || (errorDetails.memory !== null && errorDetails.memory !== undefined)) && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.2 }}
                                                                className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400"
                                                            >
                                                                {errorDetails.time !== null && errorDetails.time !== undefined && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Clock className="w-3 h-3" />
                                                                        Time: {errorDetails.time}s
                                                                    </span>
                                                                )}
                                                                {errorDetails.memory && (
                                                                    <span>Memory: {errorDetails.memory}KB</span>
                                                                )}
                                                            </motion.div>
                                                        )}

                                                        <motion.div
                                                            initial={{ opacity: 0, y: 6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.25 }}
                                                            className="mt-4"
                                                        >
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-semibold">Error Details</div>
                                                            <div className="bg-red-50/50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-xl p-4 font-mono text-sm text-red-900 dark:text-red-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                                                                {errorDetails.message}
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.3 }}
                                                            className="text-xs text-gray-500 dark:text-gray-400"
                                                        >
                                                            <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>{" "}
                                                            <span className="font-mono text-gray-600 dark:text-gray-400">
                                                                {errorDetails.status.replace(/_/g, " ")}
                                                            </span>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="console-fallback"
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="h-full flex flex-col bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-[#1e1e1e] overflow-hidden shadow-sm"
                                            >
                                                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-[#1e1e1e]">
                                                    <Code2 className="w-4 h-4 text-amber-500" />
                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Console</span>
                                                    <div className="ml-auto">
                                                        <div className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
                                                            Error Detected
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 overflow-auto p-4">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2">
                                                            <AlertCircle className="w-4 h-4 text-amber-500" />
                                                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Runtime or Compilation Error</span>
                                                        </div>
                                                        <div className="bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl p-4">
                                                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Error Information</div>
                                                            <div className="text-sm space-y-2">
                                                                {results && results.length > 0 && (
                                                                    <>
                                                                        {results.some(r => r.status === "RUNTIME_ERROR") && (
                                                                            <div>
                                                                                <span className="text-gray-500">Status: </span>
                                                                                <span className="text-red-600 dark:text-red-400 font-mono font-medium">RUNTIME_ERROR</span>
                                                                            </div>
                                                                        )}
                                                                        {results.some(r => r.status === "COMPILE_ERROR") && (
                                                                            <div>
                                                                                <span className="text-gray-500">Status: </span>
                                                                                <span className="text-red-600 dark:text-red-400 font-mono font-medium">COMPILE_ERROR</span>
                                                                            </div>
                                                                        )}
                                                                        {results.filter(r => (r.status === "RUNTIME_ERROR" || r.status === "COMPILE_ERROR") && r.errorMessage).map((errorResult, idx) => (
                                                                            <div key={idx} className="mt-3 p-3 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-lg">
                                                                                <div className="text-xs text-gray-500 mb-1">Test Case {errorResult.index + 1}:</div>
                                                                                <div className="text-sm text-red-700 dark:text-red-300 font-mono whitespace-pre-wrap">{errorResult.errorMessage}</div>
                                                                            </div>
                                                                        ))}
                                                                        {!results.some(r => (r.status === "RUNTIME_ERROR" || r.status === "COMPILE_ERROR") && r.errorMessage) && (
                                                                            <div className="mt-4 text-xs text-gray-500">
                                                                                No detailed error message available.
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    ) : (() => {
                                        if (typeof activeTab !== "number") return null;
                                        const displayIndex = activeTab;
                                        if (displayIndex >= totalCount) return <div className='text-gray-400 text-sm'>Select a case</div>;

                                        const testCase = displayCases[displayIndex];
                                        const originalIndex = safeCases.findIndex(tc => tc.id === testCase.id);
                                        const result = resultsMap?.get(originalIndex);
                                        const isHidden = testCase.hidden;
                                        const hideContents = mode === "SUBMIT";

                                        return (
                                            <motion.div
                                                key={`case-${displayIndex}`}
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="space-y-4"
                                            >
                                                {/* Result Status Banner */}
                                                {result && (
                                                    <motion.div
                                                        variants={bannerVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        className={`
                                                            p-3 rounded-xl border text-sm font-medium flex items-center justify-between
                                                            ${result.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                                                            result.status === 'PENDING' ? 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' :
                                                            result.status === 'PROCESSING' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' :
                                                                'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}
                                                        `}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {result.status === 'ACCEPTED' && <CheckCircle2 className="w-4 h-4" />}
                                                            {result.status === 'PROCESSING' && <div className="w-3.5 h-3.5 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />}
                                                            {result.status === 'PENDING' ? 'IN QUEUE' :
                                                             result.status === 'PROCESSING' ? 'EXECUTING...' :
                                                             result.status.replace(/_/g, " ")}
                                                        </span>
                                                        <div className="flex items-center gap-4 text-xs opacity-80">
                                                            {result.time !== null && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {result.time}s
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {(isHidden || hideContents) ? (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="flex flex-col items-center justify-center p-8 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-xl bg-gray-50/50 dark:bg-[#0d0d0d]"
                                                    >
                                                        <Lock className="w-8 h-8 mb-2 opacity-50" />
                                                        <span className="text-sm font-medium">
                                                            {hideContents ? "Test case contents are hidden" : "This test case is hidden"}
                                                        </span>
                                                    </motion.div>
                                                ) : (
                                                    <>
                                                        {/* Input */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.05 }}
                                                        >
                                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Input</div>
                                                            <div className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#1e1e1e] rounded-xl p-3.5 font-mono text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                                                                {testCase.input}
                                                            </div>
                                                        </motion.div>

                                                        {/* Output Grid */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.1 }}
                                                            className="grid grid-cols-2 gap-3"
                                                        >
                                                            <div>
                                                                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Expected Output</div>
                                                                <div className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#1e1e1e] rounded-xl p-3.5 font-mono text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap h-full">
                                                                    {testCase.output}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Your Output</div>
                                                                <div className={`
                                                                    border rounded-xl p-3.5 font-mono text-sm whitespace-pre-wrap h-full transition-colors duration-300
                                                                    ${result?.status === 'ACCEPTED'
                                                                        ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300'
                                                                        : result?.status === 'WRONG_ANSWER'
                                                                            ? 'bg-red-50/50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20 text-red-900 dark:text-red-300'
                                                                            : 'bg-gray-50 dark:bg-[#0d0d0d] border-gray-200 dark:border-[#1e1e1e] text-gray-800 dark:text-gray-300'
                                                                    }
                                                                `}>
                                                                    {(result as any)?.stdout || (result?.status === 'PENDING' ? '...' : 'No output')}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </motion.div>
                                        );
                                    })()}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

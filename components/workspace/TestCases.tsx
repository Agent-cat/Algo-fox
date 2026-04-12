"use client";

import React, { useState, useMemo, useEffect, memo } from 'react';
import { CheckCircle2, XCircle, Terminal, Lock, Clock, AlertCircle, Code2, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { ProblemTestCase, TestCase } from '@prisma/client';
import SubmissionPerformance from './SubmissionPerformance';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { TestCaseView } from './TestCaseView';
import { ConsoleErrorView } from './ConsoleErrorView';

interface TestCasesProps {
    cases?: ProblemTestCase[];
    customCases?: { input: string; output: string }[];
    onAddCustomCase?: () => void;
    onUpdateCustomCase?: (index: number, updates: { input?: string; output?: string }) => void;
    onRemoveCustomCase?: (index: number) => void;
    results?: TestCase[];
    mode?: "RUN" | "SUBMIT" | null;
    status?: string | null;
    problemId?: string;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    onErrorLineDetected?: (line: number | null) => void;
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

const TestCases = memo(({
    cases,
    customCases = [],
    onAddCustomCase,
    onUpdateCustomCase,
    onRemoveCustomCase,
    results,
    mode,
    status,
    isCollapsed,
    onToggleCollapse,
    problemId,
    onErrorLineDetected,
}: TestCasesProps) => {
    const [activeTab, setActiveTab] = useState<number | "console">(0);

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
        const errorCase = results?.find(r => r.status === "COMPILE_ERROR" || r.status === "RUNTIME_ERROR");
        if (!errorCase) return null;

        const message = errorCase.errorMessage || "";

        // Extract line number from message
        // Patterns: "line 12", ":12:5", "at 12"
        let line: number | null = null;
        const linePatterns = [
            /line\s+(\d+)/i,
            /:(\d+):/,
            /at\s+(\d+)/i
        ];

        for (const pattern of linePatterns) {
            const match = message.match(pattern);
            if (match && match[1]) {
                line = parseInt(match[1], 10);
                break;
            }
        }

        return {
            type: errorCase.status === "COMPILE_ERROR" ? "Compilation Error" : "Runtime Error",
            message: message,
            status: errorCase.status,
            testCaseIndex: errorCase.index,
            time: errorCase.time,
            memory: errorCase.memory,
            line: line
        };
    }, [results]);

    useEffect(() => {
        if (activeTab === "console") {
            if (errorDetails?.line) {
                onErrorLineDetected?.(errorDetails.line);
            } else {
                // Clear highlight if we're on console but no specific line is found
                onErrorLineDetected?.(null);
            }
        } else {
            // Not on console tab, clear any existing highlight
            onErrorLineDetected?.(null);
        }

        return () => {
            // Clear on unmount
            onErrorLineDetected?.(null);
        };
    }, [activeTab, errorDetails?.line, onErrorLineDetected]);

    // Auto-switch to console tab when error is first detected
    useEffect(() => {
        if (!results || results.length === 0) {
            setActiveTab(0);
        } else if (hasError) {
            setActiveTab("console");
        }
    }, [hasError, results]);

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
    const customIndices = Array.from({ length: customCases.length }, (_, i) => i);

    // Count passed/failed
    const passedCount = results ? results.filter(r => r.status === "ACCEPTED").length : 0;
    const totalResults = results ? results.length : 0;

    return (
        <div className="h-full flex flex-col bg-[#fafafa] dark:bg-[#121212] border-t border-gray-200/80 dark:border-[#1e1e1e]">
            {/* Header - Always visible, acts as toggle */}
            <motion.div
                className="flex items-center justify-between gap-3 px-4 py-2 bg-gray-50/50 dark:bg-[#0d0d0d] border-b border-gray-100/80 dark:border-[#1a1a1a] cursor-pointer select-none group h-10 shrink-0"
                onClick={onToggleCollapse}
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

            {/* Panel Content (Visible when NOT collapsed) */}
            {!isCollapsed && (
                <div className="flex-1 overflow-hidden flex flex-col">
                        {/* Tabs and Content */}
                        <div className="px-4 py-4 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 shrink-0 custom-scrollbar">
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
                                            key={`problem-case-${displayIndex}`}
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

                                {/* Custom Cases Tabs */}
                                {customIndices.map((customIdx) => {
                                    const displayIndex = safeCases.length + customIdx;
                                    const result = resultsMap?.get(displayIndex);
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
                                            key={`custom-case-${customIdx}`}
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
                                            {caseStatus === 'ACCEPTED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                            {caseStatus && caseStatus !== 'ACCEPTED' && caseStatus !== 'PENDING' && caseStatus !== 'PROCESSING' && <XCircle className="w-3.5 h-3.5 text-red-500" />}
                                            {caseStatus === 'PENDING' && <Clock className="w-3.5 h-3.5 text-gray-400 animate-pulse" />}
                                            {caseStatus === 'PROCESSING' && <div className="w-3 h-3 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />}

                                            Custom {customIdx + 1}

                                            {activeTab === displayIndex && onRemoveCustomCase && (
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onRemoveCustomCase(customIdx);
                                                        setActiveTab(0);
                                                    }}
                                                    className="ml-1 p-0.5 hover:bg-red-500/20 rounded-md transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3 text-red-500" />
                                                </div>
                                            )}
                                        </motion.button>
                                    );
                                })}

                                {/* Add Custom Case Button */}
                                {onAddCustomCase && mode !== "SUBMIT" && (
                                    <motion.button
                                        onClick={onAddCustomCase}
                                        variants={tabButtonVariants}
                                        initial="idle"
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="flex items-center justify-center p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 transition-all"
                                        title="Add custom test case"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </div>

                            {/* Peer Comparison */}
                            {status === "ACCEPTED" && mode === "SUBMIT" && problemId && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-3"
                                >
                                    <SubmissionPerformance
                                        problemId={problemId}
                                        runtime={submissionRuntime}
                                        memory={submissionMemory}
                                    />
                                </motion.div>
                            )}

                             {/* Content */}
                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    {activeTab === "console" && hasError && (
                                        <ConsoleErrorView
                                            key="error-view"
                                            errorDetails={errorDetails}
                                            results={results}
                                        />
                                    )}
                                    {typeof activeTab === "number" && (() => {
                                        const displayIndex = activeTab;
                                        const isCustom = displayIndex >= safeCases.length;

                                        let testCase: { input: string; output: string; hidden?: boolean; id?: string };
                                        let originalIndex: number;
                                        let result: TestCase | undefined;
                                        let isHidden: boolean;
                                        let hideContents: boolean = mode === "SUBMIT";

                                        if (isCustom) {
                                            const customIdx = displayIndex - safeCases.length;
                                            testCase = customCases[customIdx];
                                            originalIndex = displayIndex;
                                            result = resultsMap?.get(displayIndex);
                                            isHidden = false;
                                            hideContents = false;
                                        } else {
                                            if (displayIndex >= totalCount) return <div key="select-case" className='text-gray-400 text-sm'>Select a case</div>;
                                            const problemCase = displayCases[displayIndex];
                                            testCase = problemCase;
                                            originalIndex = safeCases.findIndex(tc => tc.id === problemCase.id);
                                            result = resultsMap?.get(originalIndex);
                                            isHidden = !!problemCase.hidden;
                                        }

                                        return (
                                            <TestCaseView
                                                key={`case-${displayIndex}`}
                                                displayIndex={displayIndex}
                                                testCase={testCase}
                                                result={result}
                                                isHidden={isHidden}
                                                hideContents={hideContents}
                                                isCustom={isCustom}
                                                onUpdateCustomCase={onUpdateCustomCase}
                                                customIdx={isCustom ? displayIndex - safeCases.length : undefined}
                                            />
                                        )
                                    })()}
                                </AnimatePresence>
                            </div>
                        </div>
                </div>
            )}
        </div>
    );
});

export default TestCases;

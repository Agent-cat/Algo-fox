"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Check, X, Trophy, RotateCcw, Lock, Type, AlignLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Problem } from "@prisma/client";
import { markConceptAsCompleted } from "@/actions/submission.action";

interface AptitudeTextPanelProps {
    problem: Problem;
    isSolved: boolean;
    onSolved: (firstSolved?: boolean, points?: number) => void;
    onRevealSolution: () => void;
    nextProblemSlug?: string | null;
    userRole?: string;
    courseId?: string | null;
    contestMode?: boolean;
}

interface ValidationRules {
    minWords: number;
    requiredWords: string[];
}

function parseRules(answer: string | null): ValidationRules {
    if (!answer) return { minWords: 0, requiredWords: [] };
    try {
        const obj = JSON.parse(answer);
        if (obj && typeof obj === "object") {
            return {
                minWords: typeof obj.minWords === "number" ? obj.minWords : 0,
                requiredWords: Array.isArray(obj.requiredWords) ? obj.requiredWords : [],
            };
        }
    } catch {}
    return { minWords: 0, requiredWords: [] };
}

function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function findMissingKeywords(text: string, keywords: string[]): string[] {
    const lower = text.toLowerCase();
    return keywords.filter(kw => !lower.includes(kw.toLowerCase()));
}

const AptitudeTextPanel = memo(({ problem, isSolved, onSolved, onRevealSolution, nextProblemSlug, userRole, courseId, contestMode }: AptitudeTextPanelProps) => {
    const [userInput, setUserInput] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const router = useRouter();

    const rules = parseRules(problem.answer);
    const isLong = (problem as any).questionType === "TEXT_LONG";
    const wordCount = countWords(userInput);
    const missingKeywords = findMissingKeywords(userInput, rules.requiredWords);

    useEffect(() => {
        if (isSolved) {
            setStatus("correct");
        } else {
            setStatus("idle");
        }
    }, [problem.id, isSolved]);

    const validate = useCallback((): string[] => {
        const errors: string[] = [];
        if (rules.minWords > 0 && wordCount < rules.minWords) {
            errors.push(`Minimum ${rules.minWords} word${rules.minWords !== 1 ? "s" : ""} required (currently ${wordCount})`);
        }
        if (missingKeywords.length > 0) {
            errors.push(`Missing required: ${missingKeywords.map(k => `"${k}"`).join(", ")}`);
        }
        return errors;
    }, [rules.minWords, wordCount, missingKeywords]);

    const handleCheckAnswer = async () => {
        if (!userInput.trim()) {
            toast.error("Please enter your answer first!");
            return;
        }

        if (userRole === "USER") {
            toast.error("Subscription required to submit answers");
            return;
        }

        const errors = validate();
        setValidationErrors(errors);

        if (errors.length > 0) {
            setStatus("incorrect");
            toast.error("Answer does not meet all requirements");
            return;
        }

        // All validation passed
        setStatus("correct");
        toast.success("Answer accepted!");

        if (!isSolved) {
            setIsLoading(true);
            try {
                const res = await markConceptAsCompleted(problem.id);
                if (res.success) {
                    onSolved('firstSolved' in res ? res.firstSolved : false, 'points' in res ? res.points : 0);
                    setTimeout(() => {
                        onRevealSolution();
                    }, 1000);
                }
            } catch (error) {
                console.error("Failed to mark as completed:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setTimeout(() => {
                onRevealSolution();
            }, 1000);
        }
    };

    const handleClearAnswer = () => {
        setUserInput("");
        setStatus("idle");
        setValidationErrors([]);
        toast.info("Answer cleared", { duration: 1500 });
    };

    const handleNextProblem = () => {
        if (nextProblemSlug) {
            router.push(`/problems/${nextProblemSlug}${courseId ? `?courseId=${courseId}` : ''}`);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-start p-4 md:p-6 custom-scrollbar overflow-y-auto bg-transparent py-6">
            <div className="max-w-4xl mx-auto w-full flex flex-col items-center">

                {/* Answer Input Area */}
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            {isLong ? <AlignLeft className="w-4 h-4" /> : <Type className="w-4 h-4" />}
                            Your Answer
                        </label>
                        {!contestMode && (
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                            rules.minWords > 0 && wordCount < rules.minWords
                                ? "text-amber-600 bg-amber-50 dark:bg-amber-500/10"
                                : "text-gray-400 dark:text-gray-600"
                        }`}>
                            {wordCount} word{wordCount !== 1 ? "s" : ""}
                        </span>
                        )}
                    </div>

                    {isLong ? (
                        <textarea
                            value={userInput}
                            onChange={(e) => {
                                setUserInput(e.target.value);
                                if (status !== "idle") setStatus("idle");
                                setValidationErrors([]);
                            }}
                            rows={12}
                            placeholder="Type your answer here..."
                            disabled={status === "correct" || isLoading}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-mono text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-y min-h-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    ) : (
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => {
                                setUserInput(e.target.value);
                                if (status !== "idle") setStatus("idle");
                                setValidationErrors([]);
                            }}
                            placeholder="Type your answer here..."
                            disabled={status === "correct" || isLoading}
                            className="w-full h-12 px-4 bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-mono text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    )}

                    {/* Validation Rules Display - hidden in contest mode */}
                    {!contestMode && (rules.minWords > 0 || rules.requiredWords.length > 0) && (
                        <div className="flex flex-wrap gap-3 text-[11px]">
                            {rules.minWords > 0 && (
                                <span className={`px-2 py-1 rounded-full border font-semibold ${
                                    wordCount >= rules.minWords
                                        ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                                        : "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
                                }`}>
                                    {wordCount >= rules.minWords ? "✓" : "○"} {rules.minWords}+ words
                                </span>
                            )}
                            {rules.requiredWords.map((kw) => {
                                const found = userInput.toLowerCase().includes(kw.toLowerCase());
                                return (
                                    <span key={kw} className={`px-2 py-1 rounded-full border font-semibold ${
                                        found
                                            ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                                            : "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
                                    }`}>
                                        {found ? "✓" : "○"} "{kw}"
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Validation Errors - hidden in contest mode */}
                <AnimatePresence>
                    {!contestMode && validationErrors.length > 0 && status === "incorrect" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full mt-4 p-4 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30"
                        >
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Requirements not met</span>
                            </div>
                            <ul className="space-y-1">
                                {validationErrors.map((err, i) => (
                                    <li key={i} className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                                        <span className="text-rose-400">•</span> {err}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status Message Area - hidden in contest mode */}
                {!contestMode && (
                <div className="h-10 flex items-center justify-center mt-5 w-full">
                    <AnimatePresence mode="wait">
                        {status === "correct" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-full border border-emerald-500/20"
                            >
                                <Trophy className="w-3.5 h-3.5" />
                                <span className="text-xs font-bold uppercase tracking-wider">Answer Accepted</span>
                            </motion.div>
                        ) : status === "incorrect" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3.5 py-1.5 rounded-full border border-rose-500/20"
                            >
                                <span className="text-xs font-bold uppercase tracking-wider">Requirements not met</span>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
                )}

                {/* Control Actions Bottom Bar */}
                {!contestMode ? (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 w-full">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleClearAnswer}
                                disabled={!userInput || isLoading}
                                className="px-4 py-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 group disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform" />
                                Clear
                            </button>

                            <button
                                onClick={handleCheckAnswer}
                                disabled={!userInput.trim() || status === "correct" || isLoading}
                                className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all shadow-md hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed flex items-center gap-1.5 ${
                                    userRole === "USER" ? "bg-gray-100 dark:bg-[#1D1E23] text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-white/10 shadow-none" : "bg-gray-900 dark:bg-white text-white dark:text-black"
                                } ${
                                    status === "correct" ? "hidden" : ""
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                                        Checking...
                                    </div>
                                ) : userRole === "USER" ? (
                                    <><Lock className="w-3.5 h-3.5 text-orange-500" aria-label="locked" /> Check Answer</>
                                ) : "Check Answer"}
                            </button>
                        </div>
                    </div>
                ) : status !== "correct" ? (
                    <div className="mt-6 flex justify-center w-full">
                        <button
                            onClick={handleCheckAnswer}
                            disabled={!userInput.trim() || isLoading}
                            className="px-8 py-2.5 rounded-lg font-bold text-xs transition-all shadow-md hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed bg-gray-900 dark:bg-white text-white dark:text-black flex items-center gap-1.5"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3.5 h-3.5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </div>
                            ) : "Submit"}
                        </button>
                    </div>
                ) : null}

                {!contestMode && (status === "correct" || status === "incorrect") && (
                    <div className="mt-4 w-full flex justify-center">
                        <button
                            onClick={onRevealSolution}
                            className={`px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg font-bold text-xs transition-all ${
                                status === "correct" ? "bg-transparent opacity-40 hover:opacity-100" : "bg-transparent w-full sm:w-auto text-[10px] opacity-60"
                            }`}
                        >
                            View Solution Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default AptitudeTextPanel;

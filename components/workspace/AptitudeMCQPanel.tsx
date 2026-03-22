"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Check, X, Info, Trophy, LayoutList, RotateCcw, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Problem } from "@prisma/client";
import { markConceptAsCompleted } from "@/actions/submission.action";

interface AptitudeMCQPanelProps {
    problem: Problem;
    isSolved: boolean;
    onSolved: () => void;
    onRevealSolution: () => void;
    nextProblemSlug?: string | null;
}

export default function AptitudeMCQPanel({ problem, isSolved, onSolved, onRevealSolution, nextProblemSlug }: AptitudeMCQPanelProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Sync status if already solved
    useEffect(() => {
        if (isSolved && problem.answer) {
            setSelectedOption(problem.answer);
            setStatus("correct");
        } else {
            setSelectedOption(null);
            setStatus("idle");
        }
    }, [problem.id, isSolved, problem.answer]);

    const options = problem.options ? (problem.options as string[]) : [];

    const handleCheckAnswer = async () => {
        if (!selectedOption) {
            toast.error("Please select an option first!");
            return;
        }

        if (selectedOption === problem.answer) {
            setStatus("correct");
            toast.success("Correct Answer! 🎉");

            if (!isSolved) {
                setIsLoading(true);
                try {
                    const res = await markConceptAsCompleted(problem.id);
                    if (res.success) {
                        onSolved();
                        // Smoothly switch to solutions tab after a brief delay
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
        } else {
            setStatus("incorrect");
            toast.error("Incorrect answer. Try again!");
        }
    };

    const handleClearAnswer = () => {
        setSelectedOption(null);
        setStatus("idle");
        toast.info("Selection cleared", {
            duration: 1500
        });
    };

    const handleNextProblem = () => {
        if (nextProblemSlug) {
            router.push(`/problems/aptitude/${nextProblemSlug}`);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 md:p-10 custom-scrollbar overflow-y-auto bg-transparent">
            <div className="max-w-3xl mx-auto w-full flex flex-col items-center">

                {/* Options Grid - No Card Surrounding it */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = status === "correct" && isSelected;
                        const isIncorrect = status === "incorrect" && isSelected;

                        let stateClasses = "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] hover:bg-white/80 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/20";
                        if (isSelected) stateClasses = "border-orange-500/50 bg-orange-500/5 ring-1 ring-orange-500/20";
                        if (isCorrect) stateClasses = "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20";
                        if (isIncorrect) stateClasses = "border-rose-500/50 bg-rose-500/5 ring-1 ring-rose-500/20";

                        return (
                            <motion.button
                                key={idx}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.985 }}
                                disabled={isLoading}
                                onClick={() => {
                                    if (selectedOption === option) {
                                        setSelectedOption(null);
                                        setStatus("idle");
                                    } else {
                                        setSelectedOption(option);
                                        if (status === "incorrect" || status === "correct") setStatus("idle");
                                    }
                                }}
                                className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 group flex items-center justify-between gap-4 shadow-sm ${stateClasses}`}
                            >
                                <span className={`text-[15px] font-medium transition-colors ${
                                    isCorrect ? "text-emerald-600 dark:text-emerald-400 font-bold" :
                                    isIncorrect ? "text-rose-600 dark:text-rose-400 font-bold" :
                                    isSelected ? "text-orange-600 dark:text-orange-400 font-bold" :
                                    "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                }`}>
                                    {option}
                                </span>

                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                                    isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
                                    isIncorrect ? "border-rose-500 bg-rose-500 text-white" :
                                    isSelected ? "border-orange-500 bg-orange-500 text-white" : "border-gray-300 dark:border-white/20"
                                } shadow-inner`}>
                                    {isCorrect ? <Check className="w-4 h-4" strokeWidth={4} /> :
                                     isIncorrect ? <X className="w-4 h-4" strokeWidth={4} /> :
                                     isSelected ? <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" /> : null}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Status Message Area */}
                <div className="h-12 flex items-center justify-center mt-8 w-full">
                    <AnimatePresence mode="wait">
                        {status === "correct" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20"
                            >
                                <Trophy className="w-4 h-4" />
                                <span className="text-sm font-bold uppercase tracking-wider">Correct Answer identified</span>
                            </motion.div>
                        ) : status === "incorrect" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-full border border-rose-500/20"
                            >
                                <span className="text-sm font-bold tracking-tight uppercase tracking-wider">Incorrect, try again</span>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                {/* Control Actions Bottom Bar */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-6 w-full">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleClearAnswer}
                            disabled={!selectedOption || isLoading}
                            className="px-6 py-3.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-bold text-sm transition-all flex items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <RotateCcw className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                            Clear
                        </button>

                        <button
                            onClick={handleCheckAnswer}
                            disabled={!selectedOption || status === "correct" || isLoading}
                            className={`px-10 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm transition-all shadow-xl hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed ${
                                status === "correct" ? "hidden" : ""
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                                    Checking...
                                </div>
                            ) : "Check Answer"}
                        </button>
                    </div>

                    {nextProblemSlug && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={handleNextProblem}
                            className={`px-10 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 active:scale-95 shadow-lg ${
                                status === "correct"
                                    ? "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/20"
                                    : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#262626]"
                            }`}
                        >
                            NEXT
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>

                {(status === "correct" || status === "incorrect") && (
                    <div className="mt-8 w-full flex justify-center">
                        <button
                            onClick={onRevealSolution}
                            className={`px-8 py-3.5 border border-gray-200 dark:border-[#262626] text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-xl font-bold text-sm transition-all ${
                                status === "correct" ? "bg-transparent opacity-40 hover:opacity-100" : "bg-transparent w-full sm:w-auto text-xs opacity-60"
                            }`}
                        >
                            View Solution Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

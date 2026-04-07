"use client";

import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, LayoutGrid, List, LogOut, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { finishContestAction } from "@/actions/contest";
import { toast } from "sonner";

interface ContestSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    contest: any;
    currentProblemId: string;
    solvedProblemIds: string[];
}

const ContestSidebar = memo(({ isOpen, onClose, contest, currentProblemId, solvedProblemIds }: ContestSidebarProps) => {
    const router = useRouter();
    const [visitedProblemIds, setVisitedProblemIds] = useState<string[]>([]);
    const [showEndModal, setShowEndModal] = useState(false);
    const [endConfirmText, setEndConfirmText] = useState("");
    const [isEnding, setIsEnding] = useState(false);

    useEffect(() => {
        // Track visited problems in localStorage
        const visitedKey = `contest-visited-${contest.id}`;
        const stored = localStorage.getItem(visitedKey);
        const visited = stored ? JSON.parse(stored) : [];

        if (!visited.includes(currentProblemId)) {
            visited.push(currentProblemId);
            localStorage.setItem(visitedKey, JSON.stringify(visited));
        }
        setVisitedProblemIds(visited);
    }, [currentProblemId, contest.id]);

    const getStatusColor = (problemId: string) => {
        if (solvedProblemIds.includes(problemId)) return "bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500";
        if (visitedProblemIds.includes(problemId)) return "bg-amber-400 text-white border-amber-500 dark:border-amber-400";
        return "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-[#333] hover:border-gray-400 dark:hover:border-gray-500 hover:bg-[#fafafa] dark:hover:bg-[#262626]";
    };

    const handleEndContest = () => {
        setShowEndModal(true);
    };

    const confirmEndContest = async () => {
        if (endConfirmText.toLowerCase() !== "end") {
            toast.error("Please type 'end' to confirm");
            return;
        }

        setIsEnding(true);
        try {
            const res = await finishContestAction(contest.id);
            if (res.success) {
                // Exit fullscreen if active
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                }
                router.push(`/contest/${contest.id}`);
                toast.success("Contest ended successfully");
            } else {
                toast.error(res.error || "Failed to end contest");
                setIsEnding(false);
            }
        } catch (err) {
            toast.error("An error occurred while ending the contest");
            setIsEnding(false);
        }
        setShowEndModal(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 bottom-0 w-[380px] max-w-[90vw] z-50 shadow-2xl bg-[#fafafa] dark:bg-[#121212] border-r border-gray-200 dark:border-[#262626] flex flex-col overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100/10 dark:border-white/5 bg-[#fafafa] dark:bg-[#121212] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_-5px_rgba(249,115,22,0.3)]">
                                    <LayoutGrid className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                                </div>
                                <span className="text-base font-bold uppercase tracking-tight text-gray-900 dark:text-gray-100">Contest Navigator</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 shrink-0 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#222] rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-all shadow-sm group active:scale-95"
                                title="Close Sidebar"
                            >
                                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Problems Selection</div>
                            <div className="grid grid-cols-4 gap-4 justify-items-center">
                                {contest.problems.map((cp: any, index: number) => {
                                    const isCurrent = cp.problem.id === currentProblemId;
                                    const isSolved = solvedProblemIds.includes(cp.problem.id);

                                    return (
                                        <Link
                                            key={cp.problem.id}
                                            href={isSolved ? "#" : `/problems/${cp.problem.slug}?contestId=${contest.id}`}
                                            onClick={(e) => {
                                                if (isSolved) {
                                                    e.preventDefault();
                                                    toast.success("Problem Solved!", { description: "You have already completed this challenge." });
                                                }
                                                // Automatic close on selection for better UX in mobile/small desktops
                                                if (!isSolved) onClose();
                                            }}
                                            className={`
                                                w-full aspect-square flex flex-col items-center justify-center rounded-2xl border-2 text-sm font-black transition-all transform active:scale-90 relative
                                                ${isCurrent ? 'ring-4 ring-orange-500/20 border-orange-500 dark:border-orange-500 scale-105 z-10' : ''}
                                                ${getStatusColor(cp.problem.id)}
                                                ${isSolved ? 'cursor-not-allowed opacity-90' : 'cursor-pointer hover:shadow-lg'}
                                            `}
                                        >
                                            {index + 1}
                                            {isSolved && <CheckCircle2 className="w-3 h-3 absolute -top-1 -right-1 bg-white dark:bg-[#1a1a1a] rounded-full text-emerald-500" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-6 space-y-6 bg-gray-50/50 dark:bg-[#111] border-t border-gray-100/10 dark:border-white/5">
                            <div>
                                <div className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-widest flex justify-between">
                                    <span>Session Progress</span>
                                    <span>{Math.round((solvedProblemIds.length / contest.problems.length) * 100)}%</span>
                                </div>
                                <div className="flex items-center justify-between text-base font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    <span>{solvedProblemIds.length} / {contest.problems.length} Challenges Done</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-[#333] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-600 dark:bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-700 ease-out"
                                        style={{ width: `${(solvedProblemIds.length / contest.problems.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleEndContest}
                                className="w-full py-3.5 px-4 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-500/30 flex items-center justify-center gap-3 transition-all group font-bold shadow-sm"
                            >
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
                            </button>
                        </div>

                        {/* End Contest Confirmation Modal */}
                        {showEndModal && (
                            <div className="fixed inset-0 z-'100' flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="bg-[#fafafa] dark:bg-[#121212] rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 dark:border-white/5"
                                >
                                    <div className="flex items-center gap-4 mb-6 text-red-600 dark:text-red-500">
                                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                                            <ShieldAlert className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">End Contest?</h3>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                        Are you sure you want to finalize your submission? You will <strong className="text-gray-900 dark:text-gray-100">permanently</strong> lose the ability to submit more solutions for this arena.
                                        <br /><br />
                                        Type <span className="font-mono font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/5 px-2 py-0.5 rounded">end</span> below to confirm.
                                    </p>

                                    <input
                                        type="text"
                                        placeholder="Type 'end' to confirm"
                                        value={endConfirmText}
                                        onChange={(e) => setEndConfirmText(e.target.value)}
                                        className="w-full px-6 py-4 border rounded-xl mb-8 bg-gray-50 dark:bg-[#111] border-gray-200 dark:border-[#262626] text-gray-900 dark:text-white focus:bg-white dark:focus:bg-[#1a1a1a] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-mono text-center uppercase tracking-widest text-lg placeholder:normal-case placeholder:tracking-normal placeholder:text-sm"
                                        autoFocus
                                    />

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => { setShowEndModal(false); setEndConfirmText(""); }}
                                            className="flex-1 px-6 py-4 border rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] border-gray-200 dark:border-[#262626] transition-all active:scale-95"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmEndContest}
                                            disabled={endConfirmText.toLowerCase() !== "end" || isEnding}
                                            className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-500/30 active:scale-95"
                                        >
                                            {isEnding ? "ENDING..." : "FINALIZE"}
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

export default ContestSidebar;

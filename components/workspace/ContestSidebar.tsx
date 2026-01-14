"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, LayoutGrid, List, LogOut, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { finishContestAction } from "@/actions/contest";
import { toast } from "sonner";

interface ContestSidebarProps {
    contest: any;
    currentProblemId: string;
    solvedProblemIds: string[];
}

export default function ContestSidebar({ contest, currentProblemId, solvedProblemIds }: ContestSidebarProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [visitedProblemIds, setVisitedProblemIds] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
    const [endConfirmText, setEndConfirmText] = useState("");
    const [isEnding, setIsEnding] = useState(false);

    useEffect(() => {
        // Persist sidebar state
        const stored = localStorage.getItem("contest-sidebar-open");
        if (stored !== null) {
            setIsOpen(stored === "true");
        }
        setIsMounted(true);
    }, []);

    const toggleSidebar = (val: boolean) => {
        setIsOpen(val);
        localStorage.setItem("contest-sidebar-open", val.toString());
    };

    useEffect(() => {
        // Track visited problems in localStorage
        const visitedKey = `contest-visited-${contest.id}`;
        const stored = localStorage.getItem(visitedKey);
        let visited = stored ? JSON.parse(stored) : [];

        if (!visited.includes(currentProblemId)) {
            visited.push(currentProblemId);
            localStorage.setItem(visitedKey, JSON.stringify(visited));
        }
        setVisitedProblemIds(visited);
    }, [currentProblemId, contest.id]);

    const getStatusColor = (problemId: string) => {
        if (solvedProblemIds.includes(problemId)) return "bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500";
        if (visitedProblemIds.includes(problemId)) return "bg-amber-400 text-white border-amber-500 dark:border-amber-400";
        return "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-[#333] hover:border-orange-300 dark:hover:border-orange-500/50 hover:bg-white dark:hover:bg-[#262626]";
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
        <div className="relative flex h-full">
            {isOpen ? (
                <motion.div
                    initial={false}
                    animate={{ width: 280, opacity: 1 }}
                    transition={isMounted ? { duration: 0.3 } : { duration: 0 }}
                    className="h-full bg-white dark:bg-[#0a0a0a] border-r border-dashed border-gray-200 dark:border-[#262626] flex flex-col overflow-hidden"
                >
                    <div className="p-4 border-b border-dashed border-gray-100 dark:border-[#262626] bg-orange-50/50 dark:bg-orange-500/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                            <span className="text-sm font-black uppercase tracking-tighter text-gray-900 dark:text-gray-100">Navigator</span>
                        </div>
                        <button
                            onClick={() => toggleSidebar(false)}
                            className="p-1 hover:bg-orange-100 dark:hover:bg-orange-500/10 rounded-md text-orange-600 dark:text-orange-500 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="grid grid-cols-4 gap-3">
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
                                        }}
                                        className={`
                                            aspect-square flex flex-col items-center justify-center rounded-xl border-2 text-sm font-black transition-all transform active:scale-90 relative
                                            ${isCurrent ? 'ring-2 ring-orange-500 ring-offset-2 scale-105 z-10' : ''}
                                            ${getStatusColor(cp.problem.id)}
                                            ${isSolved ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}
                                        `}
                                    >
                                        {index + 1}
                                        {isSolved && <CheckCircle2 className="w-2.5 h-2.5 absolute bottom-1 right-1" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-4 space-y-4 bg-gray-50 dark:bg-[#111] border-t border-dashed border-gray-200 dark:border-[#262626]">
                        <div>
                            <div className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase mb-1 tracking-widest">Contest Progress</div>
                            <div className="flex items-center justify-between text-xs font-bold text-gray-900 dark:text-gray-100 mb-2">
                                <span>{solvedProblemIds.length} / {contest.problems.length} Solved</span>
                                <span>{Math.round((solvedProblemIds.length / contest.problems.length) * 100)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-[#333] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-500"
                                    style={{ width: `${(solvedProblemIds.length / contest.problems.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleEndContest}
                            className="w-full py-2.5 px-4 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-500/30 flex items-center justify-center gap-2 transition-all group"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-tight">End Contest</span>
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={false}
                    animate={{ width: 48 }}
                    transition={isMounted ? { duration: 0.3 } : { duration: 0 }}
                    className="h-full bg-white dark:bg-[#0a0a0a] border-r border-dashed border-gray-200 dark:border-[#262626] flex flex-col items-center py-4 gap-4 overflow-hidden"
                >
                    <button
                        onClick={() => toggleSidebar(true)}
                        className="p-2 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500 transition-colors"
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <div className="flex-1" />
                    <button
                        onClick={handleEndContest}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-red-600 dark:text-red-400 transition-colors mb-2"
                        title="End Contest"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </motion.div>
            )}

            {/* End Contest Confirmation Modal */}
            {showEndModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#141414] rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100 dark:border-[#262626] transform scale-100 transition-all">
                        <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-500">
                            <ShieldAlert className="w-8 h-8" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">End Contest Session?</h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to end your session? You will <strong>NOT</strong> be able to submit more solutions.
                            <br /><br />
                            Type <span className="font-mono font-bold text-red-600 dark:text-red-400">end</span> below to confirm.
                        </p>

                        <input
                            type="text"
                            placeholder="Type 'end' to confirm"
                            value={endConfirmText}
                            onChange={(e) => setEndConfirmText(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg mb-6 bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:bg-white dark:focus:bg-[#0a0a0a] focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-mono text-center uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                            autoFocus
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowEndModal(false); setEndConfirmText(""); }}
                                className="flex-1 px-4 py-3 border rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] border-gray-200 dark:border-[#333] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmEndContest}
                                disabled={endConfirmText.toLowerCase() !== "end" || isEnding}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                            >
                                {isEnding ? "Ending..." : "End Contest"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

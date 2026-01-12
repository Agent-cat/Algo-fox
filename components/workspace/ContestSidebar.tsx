"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, LayoutGrid, List, LogOut } from "lucide-react";
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
        if (solvedProblemIds.includes(problemId)) return "bg-emerald-500 text-white border-emerald-600";
        if (visitedProblemIds.includes(problemId)) return "bg-amber-400 text-white border-amber-500";
        return "bg-gray-100 text-gray-500 border-gray-200 hover:border-orange-300 hover:bg-white";
    };

    const handleEndContest = async () => {
        if (window.confirm("Are you sure you want to end the contest? You won't be able to submit more solutions once you exit this session.")) {
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
                }
            } catch (err) {
                toast.error("An error occurred while ending the contest");
            }
        }
    };

    return (
        <div className="relative flex h-full">
            {isOpen ? (
                <motion.div
                    initial={false}
                    animate={{ width: 280, opacity: 1 }}
                    transition={isMounted ? { duration: 0.3 } : { duration: 0 }}
                    className="h-full bg-white border-r border-dashed border-gray-200 flex flex-col overflow-hidden"
                >
                    <div className="p-4 border-b border-dashed border-gray-100 bg-orange-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-black uppercase tracking-tighter text-gray-900">Navigator</span>
                        </div>
                        <button
                            onClick={() => toggleSidebar(false)}
                            className="p-1 hover:bg-orange-100 rounded-md text-orange-600 transition-colors"
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
                                        href={`/problems/${cp.problem.slug}?contestId=${contest.id}`}
                                        className={`
                                            aspect-square flex flex-col items-center justify-center rounded-xl border-2 text-sm font-black transition-all transform active:scale-90 relative
                                            ${isCurrent ? 'ring-2 ring-orange-500 ring-offset-2 scale-105 z-10' : ''}
                                            ${getStatusColor(cp.problem.id)}
                                        `}
                                    >
                                        {index + 1}
                                        {isSolved && <CheckCircle2 className="w-2.5 h-2.5 absolute bottom-1 right-1" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-4 space-y-4 bg-gray-50 border-t border-dashed border-gray-200">
                        <div>
                            <div className="text-[10px] font-black text-orange-600 uppercase mb-1 tracking-widest">Contest Progress</div>
                            <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-2">
                                <span>{solvedProblemIds.length} / {contest.problems.length} Solved</span>
                                <span>{Math.round((solvedProblemIds.length / contest.problems.length) * 100)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-500"
                                    style={{ width: `${(solvedProblemIds.length / contest.problems.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleEndContest}
                            className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 flex items-center justify-center gap-2 transition-all group"
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
                    className="h-full bg-white border-r border-dashed border-gray-200 flex flex-col items-center py-4 gap-4 overflow-hidden"
                >
                    <button
                        onClick={() => toggleSidebar(true)}
                        className="p-2 hover:bg-orange-50 rounded-lg text-orange-600 transition-colors"
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <div className="flex-1" />
                    <button
                        onClick={handleEndContest}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors mb-2"
                        title="End Contest"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </div>
    );
}

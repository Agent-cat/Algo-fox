"use client";

import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, LayoutGrid, List, LogOut, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { finishContestAction, submitContestSectionAction } from "@/actions/contest";
import { toast } from "sonner";
import { ContestEndModal } from "./ContestEndModal";

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
    const [isSubmittingSection, setIsSubmittingSection] = useState(false);

    // Active Section UI state
    const activeSectionTarget = contest.sections?.find((s: any) => s.isUnlocked && !s.isSubmitted)?.id || contest.sections?.[0]?.id;
    const [activeSectionId, setActiveSectionId] = useState<string>(activeSectionTarget);

    // Sync activeSectionId when contest data changes (e.g. after router.refresh())
    useEffect(() => {
        if (activeSectionTarget && activeSectionTarget !== activeSectionId) {
            setActiveSectionId(activeSectionTarget);
        }
    }, [activeSectionTarget, activeSectionId]);

    const isParallel = contest.mode === "PARALLEL";

    const currentSection = contest.sections?.find((s: any) => s.id === activeSectionId);
    const displayedProblems = contest.problems?.filter((p: any) => !p.sectionId || p.sectionId === activeSectionId) || [];


    const progressPercent = contest.problems.length ? (solvedProblemIds.length / contest.problems.length) * 100 : 0;

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

    const handleSectionSubmit = async () => {
        if (!currentSection || isSubmittingSection) return;
        setIsSubmittingSection(true);
        try {
            const res = await submitContestSectionAction(contest.id, currentSection.id);
            if (res.success) {
                toast.success(`${currentSection.title} submitted successfully`);
                // Auto-refresh the page to load next section if sequential
                if (!isParallel) {
                    window.location.reload();
                } else {
                    router.refresh(); // Soft refresh
                }
            } else {
                // @ts-ignore
                toast.error(res.error || "Failed to submit section");
            }
        } catch (err) {
            toast.error("Error submitting section");
        } finally {
            setIsSubmittingSection(false);
        }
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
                            {/* Section Switcher for Parallel Mode */}
                            {contest.sections && contest.sections.length > 1 && isParallel && (
                                <div className="mb-6 space-y-2">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sections</div>
                                    <div className="flex flex-wrap gap-2">
                                        {contest.sections.map((sec: any) => (
                                            <button
                                                key={sec.id}
                                                onClick={() => setActiveSectionId(sec.id)}
                                                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                                                    activeSectionId === sec.id
                                                    ? "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30"
                                                    : "bg-gray-50 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#333]"
                                                }`}
                                            >
                                                {sec.title}
                                                {sec.isSubmitted && " 🔒"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentSection && !isParallel && (
                                <div className="mb-4 text-center p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#262626]">
                                    <div className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{currentSection.title}</div>
                                </div>
                            )}

                            <div className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Challenges</div>
                            <div className="grid grid-cols-4 gap-4 justify-items-center">
                                {displayedProblems.length === 0 && (
                                    <div className="col-span-4 text-xs text-gray-500">No problems available in this section.</div>
                                )}
                                {displayedProblems.map((cp: any, index: number) => {
                                    const isCurrent = cp.problem.id === currentProblemId;
                                    const isSolved = solvedProblemIds.includes(cp.problem.id) || cp.isLocked;

                                    return (
                                        <Link
                                            key={cp.problem.id}
                                            href={isSolved ? "#" : `/problems/${cp.problem.slug}?contestId=${contest.id}`}
                                            onClick={(e) => {
                                                if (isSolved) {
                                                    e.preventDefault();
                                                    if (cp.isLocked) {
                                                        toast.error("Section Locked", { description: "This section has been submitted." });
                                                    } else {
                                                        toast.success("Problem Solved!", { description: "You have already completed this challenge." });
                                                    }
                                                }
                                                if (!isSolved) onClose();
                                            }}
                                            className={`
                                                w-full aspect-square flex flex-col items-center justify-center rounded-2xl border-2 text-sm font-black transition-all transform active:scale-90 relative
                                                ${isCurrent ? 'ring-4 ring-orange-500/20 border-orange-500 dark:border-orange-500 scale-105 z-10' : ''}
                                                ${getStatusColor(cp.problem.id)}
                                                ${isSolved ? 'cursor-not-allowed opacity-90 grayscale' : 'cursor-pointer hover:shadow-lg'}
                                            `}
                                        >
                                            {index + 1}
                                            {isSolved && <CheckCircle2 className="w-3 h-3 absolute -top-1 -right-1 bg-white dark:bg-[#1a1a1a] rounded-full text-emerald-500" />}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Sequential Section Submission */}
                            {currentSection && !currentSection.isSubmitted && displayedProblems.length > 0 && (
                                <button
                                    onClick={handleSectionSubmit}
                                    disabled={isSubmittingSection}
                                    className="mt-8 w-full py-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 rounded-xl font-black uppercase text-xs tracking-widest transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSubmittingSection ? "Submitting..." : `Submit Section`}
                                </button>
                            )}
                        </div>

                        <div className="p-6 space-y-6 bg-gray-50/50 dark:bg-[#111] border-t border-gray-100/10 dark:border-white/5">
                            <div>
                                <div className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-widest flex justify-between">
                                    <span>Session Progress</span>
                                    <span>{Math.round(progressPercent)}%</span>
                                </div>
                                <div className="flex items-center justify-between text-base font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    <span>{solvedProblemIds.length} / {contest.problems.length} Challenges Done</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-[#333] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-600 dark:bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-700 ease-out"
                                        style={{ width: `${progressPercent}%` }}
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

                        <ContestEndModal
                            isOpen={showEndModal}
                            onClose={() => { setShowEndModal(false); setEndConfirmText(""); }}
                            onConfirm={confirmEndContest}
                            confirmText={endConfirmText}
                            setConfirmText={setEndConfirmText}
                            isEnding={isEnding}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

export default ContestSidebar;

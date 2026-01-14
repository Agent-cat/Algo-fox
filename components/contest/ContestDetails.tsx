"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronRight, Lock, AlertCircle, Medal, ChevronLeft, X, CheckCircle2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContestEntryModal from "./ContestEntryModal";
import ContestProtection from './ContestProtection';
import ContestNavigationGuard from './ContestNavigationGuard';

import { finishContestAction } from "@/actions/contest";

interface ContestDetailsProps {
    contest: any;
    user: any;
}

const PROBLEMS_PER_PAGE = 20;

export default function ContestDetails({ contest, user }: ContestDetailsProps) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showRulesPopup, setShowRulesPopup] = useState(false);
    const [hasAcceptedRules, setHasAcceptedRules] = useState(contest.hasAcceptedRules || false);
    const [isSubmittingContest, setIsSubmittingContest] = useState(false);
    const isFinished = contest.isFinished || false;

    // Protection State
    const [sessionId, setSessionId] = useState<string | null>(contest.sessionId || null);

    // DEBUG: Log protection conditions
    useEffect(() => {
        console.log('[ContestProtection Debug]', {
            hasAcceptedRules,
            sessionId,
            isFinished,
            willRenderProtection: hasAcceptedRules && sessionId && !isFinished
        });
    }, [hasAcceptedRules, sessionId, isFinished, contest.canManage]);

    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    const hasStarted = now >= startTime;
    const hasEnded = now > endTime;

    const [showEndModal, setShowEndModal] = useState(false);
    const [endConfirmText, setEndConfirmText] = useState("");

    const handleContestFinish = () => {
        setShowEndModal(true);
    };

    const confirmEndContest = async () => {
        if (endConfirmText.toLowerCase() !== "end") {
            toast.error("Please type 'end' to confirm");
            return;
        }

        setIsSubmittingContest(true);
        try {
            const res = await finishContestAction(contest.id);
            if (res.success) {
                toast.success("Contest submitted successfully!");
                router.push("/");
            } else {
                toast.error("Failed to submit contest");
                setIsSubmittingContest(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setIsSubmittingContest(false);
        }
        setShowEndModal(false);
    };

    useEffect(() => {
        if (isFinished) return;
        const accepted = localStorage.getItem(`contest-rules-${contest.id}`);
        // If we have local storage record AND the server says we accepted rules (or we rely on server only)
        // But let's trust server state 'hasAcceptedRules' primarily if available
        if (hasAcceptedRules) {
             if (hasStarted && !hasEnded) {
                // Already started logic
             }
        } else if (hasStarted && !hasEnded) {
            setShowRulesPopup(true);
        }
    }, [contest.id, hasStarted, hasEnded, hasAcceptedRules, isFinished]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const target = hasStarted ? endTime : startTime;
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft(hasStarted ? "Contest Ended" : "Starting Now");
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${days > 0 ? `${days}d ` : ""}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [hasStarted, startTime, endTime]);

    const handleContestStart = (newSessionId: string) => {
        localStorage.setItem(`contest-rules-${contest.id}`, "true");
        setHasAcceptedRules(true);
        setShowRulesPopup(false);
        setSessionId(newSessionId);

        // Reload page to refresh questions (if shuffled) or unlock content
        window.location.reload();
    };

    const totalPages = Math.ceil(contest.problems.length / PROBLEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
    const endIndex = startIndex + PROBLEMS_PER_PAGE;
    const currentProblems = contest.problems.slice(startIndex, endIndex);

    const getStatusBadge = () => {
        if (isFinished) {
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">Completed</span>;
        }
        if (hasEnded) {
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400">Ended</span>;
        }
        if (hasStarted) {
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">Live</span>;
        }
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">Upcoming</span>;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
            case "MEDIUM": return "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400";
            case "HARD": return "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400";
            default: return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400";
        }
    };

    return (
        <>
            <ContestEntryModal
                contestId={contest.id}
                contestTitle={contest.title}
                requiresPassword={contest.requiresPassword}
                isOpen={showRulesPopup}
                onClose={() => setShowRulesPopup(false)}
                onStart={handleContestStart}
            />

            {/* Contest Protection on Dashboard - Active for all participants during live contest */}
            {hasAcceptedRules && sessionId && !isFinished && (
                <>
                    <ContestProtection
                        contestId={contest.id}
                        sessionId={sessionId}
                        paused={isSubmittingContest || showEndModal}
                    />
                    <ContestNavigationGuard
                        contestId={contest.id}
                        allowedPaths={[
                            `/problems/`,
                            `/contest/${contest.id}`,
                        ]}
                    />
                </>
            )}

            <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#262626] text-gray-700 dark:text-gray-300">
                                {contest.visibility}
                            </span>
                            {getStatusBadge()}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {contest.title}
                        </h1>

                        <p className="text-gray-600 dark:text-gray-400">
                            {contest.description || "Test your skills in this competitive programming arena."}
                        </p>
                    </div>

                    {isFinished && (
                        <div className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-400">Contest Session Completed</h3>
                                <p className="text-emerald-700 dark:text-emerald-500 text-sm">
                                    You have successfully ended your session. Your submissions have been recorded and you can view the final standings once the contest ends.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Stats Bar */}
                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-[#262626] text-sm">
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Start:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">{startTime.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">End:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">{endTime.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Problems:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">{contest._count.problems}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Time:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium font-mono">{timeLeft}</span>
                        </div>


                        <div className="ml-auto flex gap-2">
                            {/* Submit Button for Active Participants */}
                            {hasAcceptedRules && hasStarted && !hasEnded && !isFinished && (
                                <button
                                    onClick={handleContestFinish}
                                    className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-500/20"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    End Contest
                                </button>
                            )}

                            {hasEnded && (
                                <Link
                                    href={`/contest/${contest.id}/standings`}
                                    className="px-4 py-2 bg-orange-600 text-white rounded text-sm font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20"
                                >
                                    Leaderboard
                                </Link>
                            )}
                        </div>
                    </div>

                    {!hasStarted && !contest.canManage ? (
                        <div className="text-center py-20 border border-gray-200 dark:border-[#262626] rounded-lg bg-white dark:bg-[#141414]">
                            <Lock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Problems Locked</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Problems will be revealed when the contest starts.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-[#262626] text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <div className="col-span-1">#</div>
                                <div className="col-span-6 md:col-span-7">Title</div>
                                <div className="col-span-3 md:col-span-2">Difficulty</div>
                                <div className="col-span-2 md:col-span-2">Status</div>
                            </div>

                            {/* Problem List */}
                            <div className="mt-2">
                                {currentProblems.map((cp: any, index: number) => {
                                    const globalIndex = startIndex + index;
                                    const canAccess = (hasAcceptedRules || contest.canManage || !hasStarted || hasEnded) && (!isFinished || contest.canManage);
                                    const isSolved = (cp as any).isSolved; // Access the property we added

                                    // If problem is solved, block access (even for managers during testing/consistency)
                                    const isBlockedByCompletion = isSolved;

                                    return (
                                        <Link
                                            key={cp.problem.id}
                                            href={(canAccess && (hasStarted || contest.canManage) && !isBlockedByCompletion) ? `/problems/${cp.problem.slug}?contestId=${contest.id}` : "#"}
                                            onClick={(e) => {
                                                if (isFinished && !contest.canManage) {
                                                    e.preventDefault();
                                                    toast.error("Contest session ended", {
                                                        description: "You have already completed this contest."
                                                    });
                                                    return;
                                                }
                                                // Prevent re-attempting solved problems
                                                if (isBlockedByCompletion) {
                                                    e.preventDefault();
                                                    toast.success("Problem Solved!", {
                                                        description: "You have already completed this challenge. Great job!"
                                                    });
                                                    return;
                                                }
                                                if (!canAccess && hasStarted && !hasEnded) {
                                                    e.preventDefault();
                                                    setShowRulesPopup(true);
                                                }
                                            }}
                                            className={`grid grid-cols-12 gap-4 px-6 py-4 rounded-xl items-center transition-all duration-200 ${
                                                canAccess && (hasStarted || contest.canManage) && !isBlockedByCompletion
                                                ? "hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a] cursor-pointer"
                                                : isSolved ? "opacity-75 bg-emerald-50/30 dark:bg-emerald-500/5 cursor-not-allowed" : "opacity-50 cursor-not-allowed"
                                            }`}
                                        >
                                            <div className="col-span-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                {globalIndex + 1}
                                            </div>
                                            <div className="col-span-6 md:col-span-7 font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                <span className={`truncate ${canAccess && !isBlockedByCompletion ? "hover:text-orange-600 transition-colors" : ""}`}>
                                                    {cp.problem.title}
                                                </span>
                                                {isSolved && (
                                                     <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Solved
                                                     </span>
                                                )}
                                            </div>
                                            <div className="col-span-3 md:col-span-2">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(cp.problem.difficulty)}`}>
                                                    {cp.problem.difficulty === "MEDIUM" ? "Med." : cp.problem.difficulty.charAt(0) + cp.problem.difficulty.slice(1).toLowerCase()}
                                                </span>
                                            </div>
                                            <div className="col-span-2 md:col-span-2 text-sm text-gray-500 dark:text-gray-400">
                                                {isSolved ? (
                                                     <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                ) : canAccess && (hasStarted || contest.canManage) ? (
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-gray-400" />
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className={`p-2 border border-gray-200 dark:border-[#262626] rounded transition-colors ${currentPage === 1
                                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                                            }`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-9 h-9 rounded text-sm font-medium transition-colors ${currentPage === page
                                                ? "bg-orange-600 text-white"
                                                : "border border-gray-200 dark:border-[#262626] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 border border-gray-200 dark:border-[#262626] rounded transition-colors ${currentPage === totalPages
                                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                                            }`}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* End Contest Confirmation Modal */}
            {showEndModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#141414] rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100 dark:border-[#262626] transform scale-100 transition-all">
                        <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-400">
                            <ShieldAlert className="w-8 h-8" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">End Contest Session?</h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Are you sure you want to end your session? You will <strong>NOT</strong> be able to re-enter or solve more problems after this.
                            <br /><br />
                            Type <span className="font-mono font-bold text-red-600 dark:text-red-400">end</span> below to confirm.
                        </p>

                        <input
                            type="text"
                            placeholder="Type 'end' to confirm"
                            value={endConfirmText}
                            onChange={(e) => setEndConfirmText(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-[#262626] rounded-lg mb-6 bg-gray-50 dark:bg-[#1a1a1a] focus:bg-white dark:focus:bg-[#0a0a0a] focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-mono text-center uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal text-gray-900 dark:text-gray-100"
                            autoFocus
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowEndModal(false); setEndConfirmText(""); }}
                                className="flex-1 px-4 py-3 border border-gray-200 dark:border-[#262626] rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmEndContest}
                                disabled={endConfirmText.toLowerCase() !== "end" || isSubmittingContest}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                            >
                                {isSubmittingContest ? "Ending..." : "End Contest"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

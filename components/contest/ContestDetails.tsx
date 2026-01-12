"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronRight, Lock, AlertCircle, Medal, ChevronLeft, X, CheckCircle2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { acceptContestRules } from "@/actions/contest";

interface ContestDetailsProps {
    contest: any;
    user: any;
}

const PROBLEMS_PER_PAGE = 20;

export default function ContestDetails({ contest, user }: ContestDetailsProps) {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showRulesPopup, setShowRulesPopup] = useState(false);
    const [hasAcceptedRules, setHasAcceptedRules] = useState(contest.hasAcceptedRules || false);
    const isFinished = contest.isFinished || false;

    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    const hasStarted = now >= startTime;
    const hasEnded = now > endTime;

    useEffect(() => {
        if (isFinished) return;
        const accepted = localStorage.getItem(`contest-rules-${contest.id}`);
        if (accepted === "true") {
            setHasAcceptedRules(true);
            if (hasStarted && !hasEnded) {
                toast.info("Contest Mode Reactivated", {
                    description: "Proctoring is active. Fullscreen recommended.",
                    icon: <ShieldAlert className="w-5 h-5 text-orange-600" />,
                });
            }
        } else if (hasStarted && !hasEnded) {
            setShowRulesPopup(true);
        }
    }, [contest.id, hasStarted, hasEnded]);

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

    const handleAcceptRules = async () => {
        try {
            const res = await acceptContestRules(contest.id);
            if (!res.success) {
                toast.error(res.error || "Failed to accept rules");
                return;
            }

            localStorage.setItem(`contest-rules-${contest.id}`, "true");
            setHasAcceptedRules(true);
            setShowRulesPopup(false);

            // CONTEST MODE ACTIVATION
            toast.info("Contest Mode Activated", {
                description: "Proctoring is now active. Fullscreen enabled.",
                duration: 5000,
                icon: <ShieldAlert className="w-5 h-5 text-orange-600" />,
            });

            // Request Fullscreen
            if (typeof document !== 'undefined' && !document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(e => {
                    console.warn("Fullscreen deferred: user must interact with the page first.");
                });
            }
        } catch (err) {
            toast.error("An error occurred");
        }
    };

    const totalPages = Math.ceil(contest.problems.length / PROBLEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
    const endIndex = startIndex + PROBLEMS_PER_PAGE;
    const currentProblems = contest.problems.slice(startIndex, endIndex);

    const defaultRules = [
        "Each challenge has a point value based on difficulty.",
        "Submissions are graded instantly.",
        "Penalty of 10 minutes for each wrong submission.",
        "Ranking is based on total points and time taken."
    ];

    const rules = contest.rules ? contest.rules.split('\n').filter((r: string) => r.trim()) : defaultRules;

    const getStatusBadge = () => {
        if (isFinished) {
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Completed</span>;
        }
        if (hasEnded) {
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Ended</span>;
        }
        if (hasStarted) {
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Live</span>;
        }
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Upcoming</span>;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "bg-emerald-100 text-emerald-700";
            case "MEDIUM": return "bg-orange-100 text-orange-700";
            case "HARD": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <>
            {/* Rules Popup */}
            {showRulesPopup && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full shadow-xl">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Contest Rules</h2>
                            <button
                                onClick={() => setShowRulesPopup(false)}
                                className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                            {rules.map((rule: string, i: number) => (
                                <div key={i} className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded bg-orange-600 text-white font-semibold flex items-center justify-center text-sm">
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{rule}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t">
                            <button
                                onClick={handleAcceptRules}
                                className="w-full py-3 bg-orange-600 text-white rounded font-semibold hover:bg-orange-700 transition-colors"
                            >
                                Accept & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-white py-8">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {contest.visibility}
                            </span>
                            {getStatusBadge()}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {contest.title}
                        </h1>

                        <p className="text-gray-600">
                            {contest.description || "Test your skills in this competitive programming arena."}
                        </p>
                    </div>

                    {isFinished && (
                        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-emerald-900">Contest Session Completed</h3>
                                <p className="text-emerald-700 text-sm">
                                    You have successfully ended your session. Your submissions have been recorded and you can view the final standings once the contest ends.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Stats Bar */}
                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b text-sm">
                        <div>
                            <span className="text-gray-500">Start:</span>
                            <span className="ml-2 text-gray-900 font-medium">{startTime.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">End:</span>
                            <span className="ml-2 text-gray-900 font-medium">{endTime.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Problems:</span>
                            <span className="ml-2 text-gray-900 font-medium">{contest._count.problems}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Time:</span>
                            <span className="ml-2 text-gray-900 font-medium font-mono">{timeLeft}</span>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button
                                onClick={() => setShowRulesPopup(true)}
                                className="px-4 py-2 border rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Rules
                            </button>
                            <Link
                                href={`/contest/${contest.id}/standings`}
                                className="px-4 py-2 bg-orange-600 text-white rounded text-sm font-medium hover:bg-orange-700 transition-colors"
                            >
                                {hasEnded ? "Leaderboard" : "Standings"}
                            </Link>
                        </div>
                    </div>

                    {!hasStarted && !contest.canManage ? (
                        <div className="text-center py-20 border rounded-lg">
                            <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Problems Locked</h3>
                            <p className="text-gray-500">
                                Problems will be revealed when the contest starts.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
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

                                    return (
                                        <Link
                                            key={cp.problem.id}
                                            href={(canAccess && (hasStarted || contest.canManage)) ? `/problems/${cp.problem.slug}?contestId=${contest.id}` : "#"}
                                            onClick={(e) => {
                                                if (isFinished && !contest.canManage) {
                                                    e.preventDefault();
                                                    toast.error("Contest session ended", {
                                                        description: "You have already completed this contest and cannot re-enter the problem arena."
                                                    });
                                                    return;
                                                }
                                                if (!canAccess && hasStarted && !hasEnded) {
                                                    e.preventDefault();
                                                    setShowRulesPopup(true);
                                                }
                                            }}
                                            className={`grid grid-cols-12 gap-4 px-6 py-4 rounded-xl items-center transition-all duration-200 ${canAccess && (hasStarted || contest.canManage)
                                                ? "hover:bg-gray-50/50 cursor-pointer"
                                                : "opacity-50 cursor-not-allowed"
                                                }`}
                                        >
                                            <div className="col-span-1 text-sm text-gray-500 font-medium">
                                                {globalIndex + 1}
                                            </div>
                                            <div className="col-span-6 md:col-span-7 font-medium text-gray-900 hover:text-orange-600 transition-colors flex items-center gap-2">
                                                <span className="truncate">{cp.problem.title}</span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(cp.problem.difficulty)}`}>
                                                    {cp.problem.difficulty === "MEDIUM" ? "Med." : cp.problem.difficulty.charAt(0) + cp.problem.difficulty.slice(1).toLowerCase()}
                                                </span>
                                            </div>
                                            <div className="col-span-2 md:col-span-2 text-sm text-gray-500">
                                                {canAccess && (hasStarted || contest.canManage) ? (
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
                                        className={`p-2 border rounded transition-colors ${currentPage === 1
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-gray-50"
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
                                                : "border text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 border rounded transition-colors ${currentPage === totalPages
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-gray-50"
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
        </>
    );
}

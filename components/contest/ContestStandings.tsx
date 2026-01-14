"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, Medal, User, Crown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FinalizeContestButton } from "./FinalizeContestButton";

interface ContestStudent {
    id: string;
    name: string | null;
    totalScore: number;
    image: string | null;
    solvedCount: number;
}

interface ContestStandingsProps {
    students: ContestStudent[];
    currentUserId?: string;
    contestId: string;
    isFinalized?: boolean;
    userRole?: string;
}

const ITEMS_PER_LOAD = 20;

export function ContestStandings({ students, currentUserId, contestId, isFinalized = false, userRole }: ContestStandingsProps) {
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_LOAD);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Check for permissions
    const canFinalize = ["ADMIN", "CONTEST_MANAGER", "INSTITUTION_MANAGER", "TEACHER"].includes(userRole || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && displayCount < students.length) {
                    setIsLoading(true);
                    // Simulate loading delay for smooth UX
                    setTimeout(() => {
                        setDisplayCount((prev) => Math.min(prev + ITEMS_PER_LOAD, students.length));
                        setIsLoading(false);
                    }, 300);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [displayCount, students.length]);

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Crown className="w-5 h-5 text-yellow-500" />;
            case 1: return <Medal className="w-5 h-5 text-gray-400" />;
            case 2: return <Medal className="w-5 h-5 text-orange-600" />;
            default: return null;
        }
    };

    const getRankColor = (index: number, studentId: string) => {
        if (studentId === currentUserId) return "bg-orange-50 dark:bg-orange-500/10 border-orange-400 dark:border-orange-500 shadow-md ring-2 ring-orange-200 dark:ring-orange-500/20";
        switch (index) {
            case 0: return "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 shadow-md";
            case 1: return "bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333]";
            case 2: return "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20";
            default: return "bg-white dark:bg-[#141414] border-gray-200 dark:border-[#262626]";
        }
    };

    if (students.length === 0) {
        return (
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-12 text-center">
                <div className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The arena is silent...</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                    Standings will be updated as soon as warriors start solving challenges.
                </p>
            </div>
        );
    }

    const displayedStudents = students.slice(0, displayCount);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Standings</h2>
                </div>

                <div className="flex items-center gap-3">
                    {canFinalize && (
                        <FinalizeContestButton contestId={contestId} isFinalized={isFinalized} />
                    )}
                    <span className="px-4 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-bold border border-orange-200 dark:border-orange-500/20 uppercase tracking-wider">
                        {students.length} Participants
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {displayedStudents.map((student, index) => (
                    <div
                        key={student.id}
                        className={`group flex items-center justify-between p-4 md:p-5 rounded-xl border transition-all duration-300 ${getRankColor(index, student.id)}`}
                    >
                        <div className="flex items-center gap-4 md:gap-6">
                            {/* Rank Column */}
                            <div className="w-8 md:w-10 flex flex-col items-center justify-center">
                                {getRankIcon(index) ? (
                                    getRankIcon(index)
                                ) : (
                                    <span className="text-lg font-bold text-gray-500">
                                        #{index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Student Info */}
                            <div className="flex items-center gap-3 md:gap-4">
                                <Link
                                    href={`/profile/${student.id}`}
                                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] border-2 border-white dark:border-[#333] shadow-sm transition-transform group-hover:scale-105"
                                >
                                    {student.image ? (
                                        <Image
                                            src={student.image}
                                            alt={student.name || "Student"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500">
                                            <User className="w-6 h-6" />
                                        </div>
                                    )}
                                </Link>
                                <div>
                                    <Link
                                        href={`/profile/${student.id}`}
                                        className="font-bold text-gray-900 dark:text-white md:text-lg hover:text-orange-600 transition-colors"
                                    >
                                        {student.name || "Anonymous Warrior"}
                                    </Link>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-500" />
                                        {student.solvedCount} Solved
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Score Column */}
                        <div className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                                <span className={`text-xl md:text-2xl font-bold ${index === 0 ? 'text-orange-600 dark:text-orange-500' : 'text-gray-900 dark:text-white'}`}>
                                    {student.totalScore}
                                </span>
                            </div>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Infinite Scroll Trigger */}
            {displayCount < students.length && (
                <div ref={observerTarget} className="py-8 text-center">
                    {isLoading && (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                    )}
                </div>
            )}

            {/* End of List Indicator */}
            {displayCount >= students.length && students.length > ITEMS_PER_LOAD && (
                <div className="py-6 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        You've reached the end of the leaderboard
                    </p>
                </div>
            )}
        </div>
    );
}

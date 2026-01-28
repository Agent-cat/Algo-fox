"use client";

import { useState } from "react";
import { School, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { joinClassroom } from "@/actions/classroom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JoinClassroomClientProps {
    classroom: {
        id: string;
        name: string;
        subject: string | null;
        section: string | null;
        teacher: {
            id: string;
            name: string | null;
            image: string | null;
        };
        _count: {
            students: number;
        };
    };
    code: string;
    currentUser: any;
}

export function JoinClassroomClient({ classroom, code, currentUser }: JoinClassroomClientProps) {
    const [isJoining, setIsJoining] = useState(false);
    const router = useRouter();

    const handleJoin = async () => {
        setIsJoining(true);
        try {
            const res = await joinClassroom(code);
            if (res.success) {
                toast.success(res.message);
                router.push(`/dashboard/classrooms/${classroom.id}`);
                router.refresh();
            } else {
                toast.error(res.error || "Failed to join classroom");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4 relative overflow-hidden">
             {/* Background decorations */}
             <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-50/50 dark:from-orange-900/10 to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-3xl p-8 shadow-2xl shadow-gray-200/50 dark:shadow-none text-center">
                    {/* Header: Teacher Avatar / Classroom Icon - MATCHING INSTITUTION INVITE */}
                    <div className="w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-gray-100 dark:border-[#262626] relative">
                        {classroom.teacher.image ? (
                            <img
                                src={classroom.teacher.image}
                                alt={classroom.teacher.name || "Mentor"}
                                className="w-full h-full object-cover rounded-2xl"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className="text-2xl font-black text-gray-300 dark:text-gray-600 uppercase">
                                {classroom.teacher.name?.[0] || 'C'}
                            </span>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 rounded-full border-4 border-white dark:border-[#141414]">
                            <School className="w-3 h-3" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                        Join {classroom.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 px-4 leading-relaxed">
                        You are about to join <strong>{classroom.name}</strong> as a student. This course is mentored by <strong>{classroom.teacher.name}</strong>.
                    </p>

                    {/* Quick Info Grid - Minimal for clean look */}
                    <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                        <div className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 p-4 rounded-2xl border border-gray-100/50 dark:border-[#262626]/50">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Subject</div>
                            <div className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{classroom.subject || "Logic & Coding"}</div>
                        </div>
                        <div className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 p-4 rounded-2xl border border-gray-100/50 dark:border-[#262626]/50">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Section</div>
                            <div className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{classroom.section || "General"}</div>
                        </div>
                    </div>

                    {/* User Info (Perfect Match to Institution Invite) */}
                    <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-4 mb-8 flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#262626] flex items-center justify-center overflow-hidden">
                            {currentUser.image ? (
                                <img src={currentUser.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                                <span className="font-bold text-sm uppercase">{currentUser.name?.[0]}</span>
                            )}
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-500 uppercase">Signed in as</div>
                            <div className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-[200px]">{currentUser.email}</div>
                        </div>
                    </div>

                    <button
                        onClick={handleJoin}
                        disabled={isJoining}
                        className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isJoining ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Joining...
                            </>
                        ) : (
                            <>
                                Accept Join Invitation
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => router.push("/dashboard/classrooms")}
                        className="mt-6 text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Not now, return to hub
                    </button>

                    <p className="mt-8 text-[10px] text-gray-400 leading-relaxed font-medium">
                        By joining, you grant <strong>{classroom.teacher.name}</strong> access to your performance and submission data.
                    </p>
                </div>
            </motion.div>

            <p className="mt-8 text-center text-xs font-medium text-gray-400 dark:text-gray-600 relative z-10">
                Protected by AlgoFox Security &bull; {new Date().getFullYear()}
            </p>
        </div>
    );
}

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4 relative">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-10 shadow-sm text-center rounded-none">
                    {/* Header: Teacher Avatar / Classroom Icon */}
                    <div className="w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] mx-auto mb-8 flex items-center justify-center border border-gray-100 dark:border-[#262626] relative rounded-none">
                        {classroom.teacher.image ? (
                            <img
                                src={classroom.teacher.image}
                                alt={classroom.teacher.name || "Mentor"}
                                className="w-full h-full object-cover rounded-none"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className="text-2xl font-black text-gray-300 dark:text-gray-600 uppercase">
                                {classroom.teacher.name?.[0] || 'C'}
                            </span>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 border-4 border-white dark:border-[#141414] rounded-none">
                            <School className="w-3 h-3" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                        Join {classroom.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 px-4 leading-relaxed max-w-lg mx-auto">
                        You are about to join <strong>{classroom.name}</strong> as a student. <br />
                        Mentored by <strong>{classroom.teacher.name}</strong>.
                    </p>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-10 text-left">
                        <div className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 p-5 border border-gray-100/50 dark:border-[#262626]/50 rounded-none">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</div>
                            <div className="font-bold text-gray-900 dark:text-white text-base">{classroom.subject || "Logic & Coding"}</div>
                        </div>
                        <div className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 p-5 border border-gray-100/50 dark:border-[#262626]/50 rounded-none">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Section</div>
                            <div className="font-bold text-gray-900 dark:text-white text-base">{classroom.section || "General"}</div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 mb-10 flex items-center gap-4 text-left border-l-4 border-orange-600 rounded-none">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-[#262626] flex items-center justify-center overflow-hidden rounded-none">
                            {currentUser.image ? (
                                <img src={currentUser.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                                <span className="font-bold text-sm uppercase">{currentUser.name?.[0]}</span>
                            )}
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Signed in as</div>
                            <div className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.email}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleJoin}
                            disabled={isJoining}
                            className="w-full py-4 bg-orange-600 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isJoining ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Accept Join Invitation"
                            )}
                        </button>

                        <button
                            onClick={() => router.push("/dashboard/classrooms")}
                            className="text-[10px] font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest py-2"
                        >
                            Return to hub
                        </button>
                    </div>

                    <p className="mt-10 text-[9px] text-gray-400 leading-relaxed font-bold uppercase tracking-tight">
                        By joining, you grant <strong>{classroom.teacher.name}</strong> access to your performance data.
                    </p>
                </div>
            </motion.div>

            <p className="mt-8 text-center text-xs font-medium text-gray-400 dark:text-gray-600 relative z-10">
                Protected by AlgoFox Security &bull; {new Date().getFullYear()}
            </p>
        </div>
    );
}

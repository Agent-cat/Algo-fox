"use client";

import { useEffect, useState, useMemo } from "react";
import { getStudentClassrooms, joinClassroom } from "@/actions/classroom";
import { School, Search, Plus, Loader2, ChevronLeft, ChevronRight, User, ArrowRight, GraduationCap, BookOpen, Layers, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 8;

export default function ClassroomsPage() {
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const router = useRouter();

    const [classrooms, setClassrooms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [joinCode, setJoinCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    useEffect(() => {
        if (!isSessionPending && session) {
            const role = (session.user as any).role;
            if (["CONTEST_MANAGER", "INSTITUTION_MANAGER"].includes(role)) {
                router.push("/dashboard");
                return;
            }
        }
        fetchClassrooms();
    }, [session, isSessionPending]);

    const fetchClassrooms = async () => {
        setIsLoading(true);
        const res = await getStudentClassrooms();
        if (res.success) {
            setClassrooms(res.classrooms || []);
        }
        setIsLoading(false);
    };

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!joinCode || joinCode.length < 6) {
            toast.error("Please enter a valid 6-character join code");
            return;
        }

        setIsJoining(true);
        try {
            const res = await joinClassroom(joinCode);
            if (res.success) {
                toast.success(res.message);
                setJoinCode("");
                setIsJoinModalOpen(false);
                await fetchClassrooms();
            } else {
                toast.error(res.error || "Failed to join classroom");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsJoining(false);
        }
    };

    const filteredClassrooms = useMemo(() => {
        return classrooms.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.teacher.name && c.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [classrooms, searchQuery]);

    const totalPages = Math.ceil(filteredClassrooms.length / ITEMS_PER_PAGE);
    const paginatedClassrooms = filteredClassrooms.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] selection:bg-orange-100 dark:selection:bg-orange-500/30 pb-24">
            {/* Premium Header */}
            <div className="pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                                Interactive Hub
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-none mb-4">
                                Classrooms
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-xl">
                                Your dedicated area for collaborative learning, batch activities, and performance tracking.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsJoinModalOpen(true)}
                                className="px-8 py-4 bg-gray-900 dark:bg-orange-600 text-white font-black text-sm rounded-2xl hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-2xl shadow-gray-200 dark:shadow-orange-500/20 flex items-center gap-3 uppercase tracking-widest"
                            >
                                <Plus className="w-5 h-5" />
                                Join Classroom
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6">
                {/* Search / Filters Bar */}
                <div className="relative group mb-12">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for classrooms, mentors, or subjects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-6 py-5 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-sm font-bold shadow-xl shadow-gray-100/50 dark:shadow-none placeholder:text-gray-300 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="aspect-[4/5] bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-[3rem] animate-pulse shadow-sm" />
                        ))}
                    </div>
                ) : filteredClassrooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {paginatedClassrooms.map((classroom, idx) => (
                                <motion.div
                                    key={classroom.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                                >
                                    <Link
                                        href={`/dashboard/classrooms/${classroom.id}`}
                                        className="group block bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-[3rem] p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 h-full flex flex-col relative overflow-hidden"
                                    >
                                        {/* Dynamic Background Hint */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors duration-500" />

                                        <div className="flex items-center justify-between mb-8">
                                            <div className="px-3 py-1 bg-gray-50 dark:bg-[#1a1a1a] text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-colors">
                                                Active
                                            </div>
                                            <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-all duration-500">
                                                <BookOpen className="w-7 h-7 text-gray-300 dark:text-gray-500 group-hover:text-orange-600 transition-all duration-500" />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-3 group-hover:text-orange-600 transition-colors tracking-tight">
                                                {classroom.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-gray-300 dark:text-gray-500 uppercase tracking-[0.2em]">{classroom.subject || "Logic & Coding"}</span>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-gray-50 dark:border-[#262626] flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-500/20 border-2 border-white dark:border-[#141414] flex items-center justify-center text-orange-600 font-black text-sm shadow-sm">
                                                    {classroom.teacher.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-gray-300 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Mentor</span>
                                                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{classroom.teacher.name || "Teacher"}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black text-gray-300 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Code</span>
                                                <span className="text-xs font-mono font-black text-orange-600 uppercase tracking-widest">{classroom.joinCode}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-[4rem] shadow-sm">
                        <div className="w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                            <Layers className="w-10 h-10 text-orange-200 dark:text-orange-500/50" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4 tracking-tight">The hub is waiting...</h2>
                        <p className="text-gray-400 max-w-sm mx-auto font-medium mb-12 text-lg">
                            You haven't joined any classrooms yet. Get a join code from your mentor to start.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsJoinModalOpen(true)}
                            className="bg-gray-900 dark:bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-2xl shadow-gray-200 dark:shadow-orange-500/20 uppercase tracking-widest"
                        >
                            Join Your First Classroom
                        </motion.button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-20 flex items-center justify-center gap-3">
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.max(1, prev - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl hover:border-orange-500 disabled:opacity-30 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                        </button>

                        <div className="px-8 h-14 flex items-center justify-center bg-gray-900 dark:bg-[#1a1a1a] rounded-2xl text-xs font-black text-white shadow-xl shadow-gray-200 dark:shadow-none uppercase tracking-widest border dark:border-[#262626]">
                            Page <span className="text-orange-500 ml-1">{currentPage}</span> / {totalPages}
                        </div>

                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl hover:border-orange-500 disabled:opacity-30 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                        </button>
                    </div>
                )}
            </div>

            {/* Premium Join Modal */}
            <AnimatePresence>
                {isJoinModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsJoinModalOpen(false)}
                            className="absolute inset-0 bg-gray-950/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-lg bg-white dark:bg-[#141414] rounded-[4rem] p-12 shadow-2xl overflow-hidden border border-gray-100 dark:border-[#262626]"
                        >
                            <div className="absolute top-0 left-0 w-full h-3 bg-linear-to-r from-orange-400 to-orange-600" />

                            <div className="text-center mb-12">
                                <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                                    <School className="w-10 h-10 text-orange-600" />
                                </div>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight leading-none">Join Classroom</h2>
                                <p className="text-gray-400 font-medium text-lg leading-relaxed">Enter the 6-character code from your teacher.</p>
                            </div>

                            <form onSubmit={handleJoin} className="space-y-8">
                                <div className="relative">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={joinCode}
                                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                        placeholder="ABCDEF"
                                        maxLength={6}
                                        className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-[2.5rem] px-8 py-8 focus:bg-white dark:focus:bg-[#0a0a0a] focus:outline-none focus:ring-[12px] focus:ring-orange-500/5 focus:border-orange-500 transition-all font-mono text-center tracking-[0.6em] text-4xl placeholder:tracking-normal placeholder:font-sans placeholder:text-gray-200 dark:placeholder:text-gray-600 uppercase font-black text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsJoinModalOpen(false)}
                                        className="flex-1 py-5 text-sm font-black text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors uppercase tracking-widest"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isJoining || joinCode.length < 6}
                                        className="flex-[2] bg-gray-900 dark:bg-orange-600 hover:bg-black dark:hover:bg-orange-700 disabled:bg-gray-100 dark:disabled:bg-[#262626] text-white font-black py-5 rounded-[2rem] transition-all shadow-2xl shadow-gray-200 dark:shadow-orange-500/20 flex items-center justify-center gap-3 group uppercase tracking-widest text-sm"
                                    >
                                        {isJoining ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Join Classroom
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

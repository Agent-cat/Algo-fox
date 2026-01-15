"use client";

import { motion, AnimatePresence } from "framer-motion";
import { School, Loader2, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { joinClassroom } from "@/actions/classroom";

interface JoinClassroomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function JoinClassroomModal({ isOpen, onClose, onSuccess }: JoinClassroomModalProps) {
    const [joinCode, setJoinCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);

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
                onSuccess();
                onClose();
            } else {
                toast.error(res.error || "Failed to join classroom");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-[#141414] rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-[#262626] overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <School className="w-8 h-8 text-orange-600 dark:text-orange-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Classroom</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Enter the 6-character code provided by your teacher to join the class.
                            </p>
                        </div>

                        <form onSubmit={handleJoin} className="space-y-6">
                            <div>
                                <input
                                    autoFocus
                                    type="text"
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                    placeholder="Enter Code"
                                    maxLength={6}
                                    className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-xl px-4 py-4 focus:bg-white dark:focus:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono text-center tracking-[0.5em] text-2xl placeholder:tracking-normal placeholder:font-sans placeholder:text-gray-400 uppercase font-black text-gray-900 dark:text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isJoining || joinCode.length < 6}
                                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-[#262626] dark:disabled:text-gray-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {isJoining ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Joining...
                                    </>
                                ) : (
                                    <>
                                        Join Classroom
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

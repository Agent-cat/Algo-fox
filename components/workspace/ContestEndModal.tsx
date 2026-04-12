"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

interface ContestEndModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmText: string;
    setConfirmText: (text: string) => void;
    isEnding: boolean;
}

export const ContestEndModal = ({ isOpen, onClose, onConfirm, confirmText, setConfirmText, isEnding }: ContestEndModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#fafafa] dark:bg-[#121212] rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 dark:border-white/5"
            >
                <div className="flex items-center gap-4 mb-6 text-red-600 dark:text-red-500">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                        <ShieldAlert className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">End Contest?</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Are you sure you want to finalize your submission? You will <strong className="text-gray-900 dark:text-gray-100">permanently</strong> lose the ability to submit more solutions for this arena.
                    <br /><br />
                    Type <span className="font-mono font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/5 px-2 py-0.5 rounded">end</span> below to confirm.
                </p>

                <input
                    type="text"
                    placeholder="Type 'end' to confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full px-6 py-4 border rounded-xl mb-8 bg-gray-50 dark:bg-[#111] border-gray-200 dark:border-[#262626] text-gray-900 dark:text-white focus:bg-white dark:focus:bg-[#1a1a1a] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-mono text-center uppercase tracking-widest text-lg placeholder:normal-case placeholder:tracking-normal placeholder:text-sm"
                    autoFocus
                />

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-4 border rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] border-gray-200 dark:border-[#262626] transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={confirmText.toLowerCase() !== "end" || isEnding}
                        className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-500/30 active:scale-95"
                    >
                        {isEnding ? "ENDING..." : "FINALIZE"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Type, LayoutTemplate, Keyboard, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";

export interface EditorSettings {
    fontSize: number;
    tabSize: number;
    theme?: "vs-light" | "vs-dark";
    keybinding: "standard" | "vim";
    enableCorrectSound?: boolean;
    enableWrongSound?: boolean;
}

interface EditorSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: EditorSettings;
    onSettingsChange: (newSettings: EditorSettings) => void;
}

export default function EditorSettingsModal({
    isOpen,
    onClose,
    settings,
    onSettingsChange
}: EditorSettingsModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md bg-white dark:bg-[#24262C] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/80 dark:bg-[#1D1E23]">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Editor Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

                            {/* Theme */}
                            <div className="bg-[#fafafa] dark:bg-[#1D1E23] p-4 rounded-xl border border-gray-200/60 dark:border-white/5 space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {settings.theme === "vs-dark" ? <Moon className="w-4 h-4 text-orange-500" /> : <Sun className="w-4 h-4 text-orange-500" />}
                                    <span>Theme</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => onSettingsChange({ ...settings, theme: "vs-light" })}
                                        className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-2 ${
                                            settings.theme === "vs-light" || !settings.theme
                                                ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm"
                                                : "bg-white dark:bg-[#24262C] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-gray-200"
                                        }`}
                                    >
                                        <Sun className="w-4 h-4" /> Light
                                    </button>
                                    <button
                                        onClick={() => onSettingsChange({ ...settings, theme: "vs-dark" })}
                                        className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-2 ${
                                            settings.theme === "vs-dark"
                                                ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm"
                                                : "bg-white dark:bg-[#24262C] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-gray-200"
                                        }`}
                                    >
                                        <Moon className="w-4 h-4" /> Dark
                                    </button>
                                </div>
                            </div>

                            {/* Font Size */}
                            <div className="bg-[#fafafa] dark:bg-[#1D1E23] p-4 rounded-xl border border-gray-200/60 dark:border-white/5 space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <Type className="w-4 h-4 text-orange-500" />
                                    <span>Font Size</span>
                                    <span className="ml-auto text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#24262C] px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 shadow-sm">
                                        {settings.fontSize}px
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 px-1">
                                    <span className="text-xs font-medium text-gray-400">12px</span>
                                    <input
                                        type="range"
                                        min="12"
                                        max="24"
                                        step="1"
                                        value={settings.fontSize}
                                        onChange={(e) => onSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })}
                                        className="flex-1 h-1.5 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                    <span className="text-xs font-medium text-gray-400">24px</span>
                                </div>
                            </div>

                            {/* Tab Size */}
                            <div className="bg-[#fafafa] dark:bg-[#1D1E23] p-4 rounded-xl border border-gray-200/60 dark:border-white/5 space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <LayoutTemplate className="w-4 h-4 text-orange-500" />
                                    <span>Tab Size</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[2, 4].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => onSettingsChange({ ...settings, tabSize: size })}
                                            className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-all ${
                                                settings.tabSize === size
                                                    ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm"
                                                    : "bg-white dark:bg-[#24262C] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-gray-200"
                                            }`}
                                        >
                                            {size} Spaces
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Audio Feedback */}
                            <div className="bg-[#fafafa] dark:bg-[#1D1E23] p-4 rounded-xl border border-gray-200/60 dark:border-white/5 space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <Volume2 className="w-4 h-4 text-orange-500" />
                                    <span>Audio Feedback</span>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => onSettingsChange({ ...settings, enableCorrectSound: !settings.enableCorrectSound })}
                                        className={`w-full px-4 py-3 text-sm font-medium rounded-lg border transition-all flex items-center justify-between ${
                                            settings.enableCorrectSound
                                                ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm"
                                                : "bg-white dark:bg-[#24262C] border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {settings.enableCorrectSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                            <span>Correct Answer SFX</span>
                                        </div>
                                        <div className={`w-9 h-5 rounded-full relative transition-colors ${settings.enableCorrectSound ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${settings.enableCorrectSound ? 'left-4.5' : 'left-0.5'}`} />
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => onSettingsChange({ ...settings, enableWrongSound: !settings.enableWrongSound })}
                                        className={`w-full px-4 py-3 text-sm font-medium rounded-lg border transition-all flex items-center justify-between ${
                                            settings.enableWrongSound
                                                ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm"
                                                : "bg-white dark:bg-[#24262C] border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {settings.enableWrongSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                            <span>Wrong Answer SFX</span>
                                        </div>
                                        <div className={`w-9 h-5 rounded-full relative transition-colors ${settings.enableWrongSound ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${settings.enableWrongSound ? 'left-4.5' : 'left-0.5'}`} />
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-[#1D1E23] border-t border-gray-100 dark:border-white/10 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

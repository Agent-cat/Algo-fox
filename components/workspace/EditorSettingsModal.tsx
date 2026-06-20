"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Type, LayoutTemplate, Keyboard, Sun, Moon, Volume2, VolumeX, Monitor, Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    const [activeTab, setActiveTab] = useState<"appearance" | "editor" | "audio">("appearance");

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

    const tabs = [
        { id: "appearance", label: "Appearance", icon: <Monitor className="w-3.5 h-3.5" /> },
        { id: "editor", label: "Editor", icon: <Code2 className="w-3.5 h-3.5" /> },
        { id: "audio", label: "Audio", icon: <Volume2 className="w-3.5 h-3.5" /> },
    ] as const;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="w-full max-w-2xl h-[480px] bg-white dark:bg-[#262626] rounded-xl shadow-2xl border border-gray-200 dark:border-[#262626] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-5 py-3 border-b border-gray-200 dark:border-[#262626] flex items-center justify-between shrink-0 bg-white dark:bg-[#262626]">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight">Workspace Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-50/10 rounded-lg transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body Layout */}
                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar Categories */}
                            <div className="w-48 bg-white dark:bg-[#262626] border-r border-gray-200 dark:border-[#262626] p-3 flex flex-col gap-1 shrink-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                                            activeTab === tab.id
                                                ? "bg-white dark:bg-[#1E1E1E] text-orange-600 dark:text-orange-400 shadow-sm border border-gray-200 dark:border-[#262626]"
                                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-50/5 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent"
                                        }`}
                                    >
                                        <span className={activeTab === tab.id ? "text-orange-500" : "opacity-70"}>
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-white dark:bg-[#262626]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, filter: "blur(2px)", y: 4 }}
                                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                        exit={{ opacity: 0, filter: "blur(2px)", y: -4 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-6 max-w-md mx-auto"
                                    >
                                        {/* Appearance Settings */}
                                        {activeTab === "appearance" && (
                                            <div className="space-y-5">
                                                <div>
                                                    <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-0.5">
                                                        <Sun className="w-3.5 h-3.5 text-orange-500" /> Theme Preference
                                                    </h3>
                                                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Choose how the code editor looks.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => onSettingsChange({ ...settings, theme: "vs-light" })}
                                                        className={`px-3 py-2.5 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden ${
                                                            settings.theme === "vs-light" || !settings.theme
                                                                ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400"
                                                                : "border-gray-200 dark:border-[#262626] bg-white dark:bg-[#262626] text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-[#1E1E1E]"
                                                        }`}
                                                    >
                                                        <div className="w-7 h-7 rounded-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333] flex items-center justify-center shadow-sm shrink-0">
                                                            <Sun className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="font-semibold text-[13px]">Light Mode</span>
                                                        {(settings.theme === "vs-light" || !settings.theme) && (
                                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-xl" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => onSettingsChange({ ...settings, theme: "vs-dark" })}
                                                        className={`px-3 py-2.5 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden ${
                                                            settings.theme === "vs-dark"
                                                                ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400"
                                                                : "border-gray-200 dark:border-[#262626] bg-white dark:bg-[#262626] text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-[#1E1E1E]"
                                                        }`}
                                                    >
                                                        <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-black border border-gray-700 flex items-center justify-center shadow-sm shrink-0">
                                                            <Moon className="w-3.5 h-3.5 text-white" />
                                                        </div>
                                                        <span className="font-semibold text-[13px]">Dark Mode</span>
                                                        {settings.theme === "vs-dark" && (
                                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-xl" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Editor Settings */}
                                        {activeTab === "editor" && (
                                            <>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-0.5">
                                                            <Type className="w-3.5 h-3.5 text-orange-500" /> Font Size
                                                        </h3>
                                                        <p className="text-[11px] text-gray-500 dark:text-gray-400">Adjust the code editor font size.</p>
                                                    </div>
                                                    <div className="bg-white dark:bg-[#262626] px-4 py-3 rounded-xl border border-gray-200 dark:border-[#262626] flex items-center gap-4">
                                                        <span className="text-[11px] font-bold text-gray-400">12</span>
                                                        <div className="relative flex-1 flex items-center h-5">
                                                            <input
                                                                type="range"
                                                                min="12"
                                                                max="24"
                                                                step="1"
                                                                value={settings.fontSize}
                                                                onChange={(e) => onSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })}
                                                                className="w-full h-1 bg-gray-300 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
                                                            />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-400">24</span>
                                                        <div className="px-2.5 py-1 bg-white dark:bg-[#1E1E1E] rounded-md border border-gray-200 dark:border-[#262626] shadow-sm text-[12px] font-black text-orange-600 dark:text-orange-400 min-w-[48px] text-center">
                                                            {settings.fontSize}px
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-0.5">
                                                            <LayoutTemplate className="w-3.5 h-3.5 text-orange-500" /> Tab Size
                                                        </h3>
                                                    </div>
                                                    <div className="flex bg-white dark:bg-[#262626] p-1 rounded-xl border border-gray-200 dark:border-[#262626]">
                                                        {[2, 4].map((size) => (
                                                            <button
                                                                key={size}
                                                                onClick={() => onSettingsChange({ ...settings, tabSize: size })}
                                                                className={`flex-1 py-1.5 text-[12px] font-bold rounded-lg transition-all ${
                                                                    settings.tabSize === size
                                                                        ? "bg-white dark:bg-[#1E1E1E] text-orange-600 dark:text-orange-400 shadow-sm border border-gray-200 dark:border-[#262626]"
                                                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent"
                                                                }`}
                                                            >
                                                                {size} Spaces
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-0.5">
                                                            <Keyboard className="w-3.5 h-3.5 text-orange-500" /> Keybinding
                                                        </h3>
                                                    </div>
                                                    <div className="flex bg-white dark:bg-[#262626] p-1 rounded-xl border border-gray-200 dark:border-[#262626]">
                                                        {(["standard", "vim"] as const).map((kb) => (
                                                            <button
                                                                key={kb}
                                                                onClick={() => onSettingsChange({ ...settings, keybinding: kb })}
                                                                className={`flex-1 py-1.5 text-[12px] font-bold capitalize rounded-lg transition-all ${
                                                                    settings.keybinding === kb || (!settings.keybinding && kb === "standard")
                                                                        ? "bg-white dark:bg-[#1E1E1E] text-orange-600 dark:text-orange-400 shadow-sm border border-gray-200 dark:border-[#262626]"
                                                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent"
                                                                }`}
                                                            >
                                                                {kb}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Audio Settings */}
                                        {activeTab === "audio" && (
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-0.5">
                                                        <Volume2 className="w-3.5 h-3.5 text-orange-500" /> Audio Feedback
                                                    </h3>
                                                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Play sounds on submission results.</p>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <button
                                                        onClick={() => onSettingsChange({ ...settings, enableCorrectSound: !settings.enableCorrectSound })}
                                                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#262626] hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-1.5 rounded-lg ${settings.enableCorrectSound ? 'bg-orange-200/50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400' : 'bg-gray-200/50 dark:bg-[#333] text-gray-500'}`}>
                                                                {settings.enableCorrectSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                                                            </div>
                                                            <div className="text-left">
                                                                <div className={`font-semibold text-[13px] ${settings.enableCorrectSound ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>Correct Answer</div>
                                                            </div>
                                                        </div>
                                                        <div className={`w-9 h-5 rounded-full relative transition-colors ${settings.enableCorrectSound ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                                            <div className={`absolute top-[2px] w-4 h-4 rounded-full bg-white transition-all shadow-sm ${settings.enableCorrectSound ? 'left-[18px]' : 'left-[2px]'}`} />
                                                        </div>
                                                    </button>

                                                    <button
                                                        onClick={() => onSettingsChange({ ...settings, enableWrongSound: !settings.enableWrongSound })}
                                                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#262626] hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-1.5 rounded-lg ${settings.enableWrongSound ? 'bg-orange-200/50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400' : 'bg-gray-200/50 dark:bg-[#333] text-gray-500'}`}>
                                                                {settings.enableWrongSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                                                            </div>
                                                            <div className="text-left">
                                                                <div className={`font-semibold text-[13px] ${settings.enableWrongSound ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>Wrong Answer</div>
                                                            </div>
                                                        </div>
                                                        <div className={`w-9 h-5 rounded-full relative transition-colors ${settings.enableWrongSound ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                                            <div className={`absolute top-[2px] w-4 h-4 rounded-full bg-white transition-all shadow-sm ${settings.enableWrongSound ? 'left-[18px]' : 'left-[2px]'}`} />
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

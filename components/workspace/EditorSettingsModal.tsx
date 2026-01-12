"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Type, LayoutTemplate, Keyboard, Sun, Moon } from "lucide-react";
import { useEffect, useRef } from "react";

interface EditorSettings {
    fontSize: number;
    tabSize: number;
    theme?: "vs-light" | "vs-dark";
    keybinding: "standard" | "vim";
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Editor Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">

                            {/* Theme */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    {settings.theme === "vs-dark" ? <Moon className="w-4 h-4 text-orange-500" /> : <Sun className="w-4 h-4 text-orange-500" />}
                                    <span>Theme</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => onSettingsChange({ ...settings, theme: "vs-light" })}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-2 ${
                                            settings.theme === "vs-light" || !settings.theme
                                                ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                    >
                                        <Sun className="w-4 h-4" /> Light
                                    </button>
                                    <button
                                        onClick={() => onSettingsChange({ ...settings, theme: "vs-dark" })}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-2 ${
                                            settings.theme === "vs-dark"
                                                ? "bg-gray-800 border-gray-700 text-white shadow-sm"
                                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                    >
                                        <Moon className="w-4 h-4" /> Dark
                                    </button>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Font Size */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Type className="w-4 h-4 text-orange-500" />
                                    <span>Font Size</span>
                                    <span className="ml-auto text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                        {settings.fontSize}px
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-400">12px</span>
                                    <input
                                        type="range"
                                        min="12"
                                        max="24"
                                        step="1"
                                        value={settings.fontSize}
                                        onChange={(e) => onSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })}
                                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                    />
                                    <span className="text-xs text-gray-400">24px</span>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Tab Size */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <LayoutTemplate className="w-4 h-4 text-orange-500" />
                                    <span>Tab Size</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[2, 4].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => onSettingsChange({ ...settings, tabSize: size })}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                                                settings.tabSize === size
                                                    ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                            }`}
                                        >
                                            {size} Spaces
                                        </button>
                                    ))}
                                </div>
                            </div>

                             {/* Key Binding (Visual only for now if complex) */}
                             {/* <hr className="border-gray-100" />
                             <div className="space-y-3 opacity-50 pointer-events-none" title="Coming soon">
                                 <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                     <Keyboard className="w-4 h-4 text-orange-500" />
                                     <span>Key Binding</span>
                                     <span className="ml-auto text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded uppercase">Coming Soon</span>
                                 </div>
                                 <div className="grid grid-cols-2 gap-3">
                                     <button className="px-4 py-2 text-sm font-medium rounded-lg bg-orange-50 border border-orange-200 text-orange-700 shadow-sm">
                                         Standard
                                     </button>
                                     <button className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600">
                                         Vim
                                     </button>
                                 </div>
                             </div> */}

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors"
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

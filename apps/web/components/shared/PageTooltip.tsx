"use client";

import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTooltipProps {
    description: string;
}

export function PageTooltip({ description }: PageTooltipProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-flex">
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
                <HelpCircle className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 z-50"
                    >
                        <div className="bg-white dark:bg-[#24262C] border border-gray-200 dark:border-[#333] rounded-xl p-3 shadow-xl">
                            <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

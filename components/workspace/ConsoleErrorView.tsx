"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { TestCase } from '@prisma/client';

interface ConsoleErrorViewProps {
    errorDetails: { type: string; message: string } | null;
    results?: TestCase[];
}

const contentVariants = {
    hidden: { opacity: 0, y: 6, filter: "blur(2px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as any }
    },
    exit: {
        opacity: 0,
        y: -4,
        filter: "blur(2px)",
        transition: { duration: 0.15 }
    }
};

export const ConsoleErrorView = React.memo(({
    errorDetails,
    results
}: ConsoleErrorViewProps) => {
    return (
        <motion.div
            key="console"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 pt-2"
        >
            {/* Error Header */}
            <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-red-500">
                <AlertCircle className="w-5 h-5 stroke-[2.5px]" />
                <span>{errorDetails?.type || "Execution Error"}</span>
            </div>

            {/* Error Message - Terminal Box */}
            <div className="relative group">
                <div className="absolute -top-2.5 left-3 px-2 bg-[#fafafa] dark:bg-[#121212] text-[10px] font-bold text-red-500/80 uppercase tracking-widest z-10 transition-colors group-hover:text-red-500">
                    Console Output
                </div>
                <div className="w-full bg-[#0d0d0d] border border-red-500/20 rounded-lg p-5 font-mono text-sm text-red-50/90 whitespace-pre-wrap overflow-x-auto leading-relaxed shadow-lg shadow-red-500/5 min-h-[120px]">
                    {errorDetails?.message || "An unknown error occurred during execution."}
                    {(!errorDetails && results) && results.filter(r => r.errorMessage).map((r, i) => (
                        <div key={i} className="mt-4 first:mt-0">
                            <div className="text-[10px] text-gray-500 mb-1">// Case {r.index + 1}</div>
                            {r.errorMessage}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
});

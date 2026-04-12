"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Lock } from 'lucide-react';
import { TestCase } from '@prisma/client';

interface TestCaseViewProps {
    displayIndex: number;
    testCase: { input: string; output: string; hidden?: boolean; id?: string };
    result?: TestCase;
    isHidden: boolean;
    hideContents: boolean;
    isCustom: boolean;
    onUpdateCustomCase?: (index: number, updates: { input?: string; output?: string }) => void;
    customIdx?: number;
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

export const TestCaseView = React.memo(({
    displayIndex,
    testCase,
    result,
    isHidden,
    hideContents,
    isCustom,
    onUpdateCustomCase,
    customIdx
}: TestCaseViewProps) => {
    return (
        <motion.div
            key={`case-${displayIndex}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 pt-2"
        >
            {/* Result Status Header */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 text-lg font-semibold tracking-tight ${
                        result.status === 'ACCEPTED' ? 'text-emerald-500' :
                        result.status === 'PENDING' || result.status === 'PROCESSING' ? 'text-gray-400' : 'text-red-500'
                    }`}
                >
                    {result.status === 'ACCEPTED' && <CheckCircle2 className="w-5 h-5 stroke-[2.5px]" />}
                    {result.status === 'WRONG_ANSWER' && <XCircle className="w-5 h-5 stroke-[2.5px]" />}
                    {(result.status === 'PENDING' || result.status === 'PROCESSING') && (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>
                        {result.status === 'ACCEPTED' ? 'Accepted' :
                         result.status === 'PENDING' ? 'In Queue' :
                         result.status === 'PROCESSING' ? 'Executing...' :
                         result.status.replace(/_/g, " ")}
                    </span>

                    {result.time !== null && (
                        <span className="ml-auto text-xs font-medium text-gray-400 opacity-60 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {result.time}s
                        </span>
                    )}
                </motion.div>
            )}

            {(isHidden || hideContents) ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center p-10 text-gray-400 dark:text-gray-500 border border-dashed border-gray-200 dark:border-[#262626] rounded-xl bg-gray-50/30 dark:bg-[#0d0d0d]/30"
                >
                    <Lock className="w-8 h-8 mb-3 opacity-40" />
                    <span className="text-sm font-medium">
                        {hideContents ? "Test case contents are hidden" : "This test case is private"}
                    </span>
                </motion.div>
            ) : (
                <>
                    {/* Input Box */}
                    <div className="relative group">
                        <div className="absolute -top-2.5 left-3 px-2 bg-[#fafafa] dark:bg-[#121212] text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest z-10">
                            Input
                        </div>
                        {isCustom && customIdx !== undefined ? (
                            <textarea
                                value={testCase.input}
                                onChange={(e) => onUpdateCustomCase?.(customIdx, { input: e.target.value })}
                                placeholder="Enter custom input..."
                                className="w-full bg-transparent border border-gray-200 dark:border-[#262626] rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-orange-500/50 transition-colors min-h-[80px] resize-none"
                            />
                        ) : (
                            <div className="w-full bg-transparent border border-gray-200 dark:border-[#262626] rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto">
                                {testCase.input}
                            </div>
                        )}
                    </div>

                    {/* Output Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Actual Box */}
                        <div className="relative group">
                            <div className={`absolute -top-2.5 left-3 px-2 bg-[#fafafa] dark:bg-[#121212] text-[10px] font-bold uppercase tracking-widest z-10 ${
                                result?.status === 'ACCEPTED' ? 'text-emerald-500/80' :
                                result?.status === 'WRONG_ANSWER' ? 'text-red-500/80' : 'text-gray-400 dark:text-gray-500'
                            }`}>
                                Your Output
                            </div>
                            <div className={`
                                w-full border rounded-lg p-4 font-mono text-sm whitespace-pre-wrap min-h-[80px] overflow-x-auto transition-all
                                ${result?.status === 'ACCEPTED'
                                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-300'
                                    : result?.status === 'WRONG_ANSWER'
                                        ? 'bg-red-500/5 border-red-500/20 text-red-900 dark:text-red-300'
                                        : 'bg-transparent border-gray-200 dark:border-[#262626] text-gray-800 dark:text-gray-200'
                                }
                            `}>
                                {(result as any)?.stdout || (result?.status === 'PENDING' ? '...' : (result ? 'No output' : 'Awaiting execution'))}
                            </div>
                        </div>

                        {/* Expected Box */}
                        <div className="relative group">
                            <div className="absolute -top-2.5 left-3 px-2 bg-[#fafafa] dark:bg-[#121212] text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest z-10">
                                Expected Output
                            </div>
                            {isCustom && customIdx !== undefined ? (
                                <textarea
                                    value={testCase.output}
                                    onChange={(e) => onUpdateCustomCase?.(customIdx, { output: e.target.value })}
                                    placeholder="Expected output..."
                                    className="w-full bg-transparent border border-gray-200 dark:border-[#262626] rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-orange-500/50 transition-colors min-h-[80px] resize-none"
                                />
                            ) : (
                                <div className="w-full bg-transparent border border-gray-200 dark:border-[#262626] rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto min-h-[80px]">
                                    {testCase.output}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
});

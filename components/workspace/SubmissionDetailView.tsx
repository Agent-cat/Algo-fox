"use client";

import { useEffect, useState } from "react";
import { getSubmission } from "@/actions/submission.action";
import { Loader2, ArrowLeft, Share2, Database, CheckCircle2, XCircle, Code2, Calendar, Timer, PlaySquare, GitBranch, SquareArrowOutUpRight } from "lucide-react";
import SubmissionDistribution from "./SubmissionDistribution";
import CodeEditor from "./CodeEditor";
import { GithubSyncDialog } from "@/components/settings/GithubSyncDialog";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

interface SubmissionDetailViewProps {
    submissionId: string;
    onBackAction: () => void;
    problemId: string;
    onRestoreCode?: (code: string, languageId: number) => void;
}

export default function SubmissionDetailView({
    submissionId,
    onBackAction,
    problemId,
    onRestoreCode
}: SubmissionDetailViewProps) {
    const { data: session } = authClient.useSession();
    const [submission, setSubmission] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeGraph, setActiveGraph] = useState<"runtime" | "memory">("runtime");

    // Auto sync is true by default unless explicitly set to false
    const autoSyncEnabled = (session?.user as any)?.githubAutoSync !== false;

    useEffect(() => {
        let isMounted = true;
        const fetchDetails = async () => {
            try {
                const data = await getSubmission(submissionId);
                if (isMounted) setSubmission(data);
            } catch (error) {
                console.error("Failed to load submission", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchDetails();
        return () => { isMounted = false; };
    }, [submissionId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-full gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                <span className="text-sm text-gray-500 font-medium">Loading submission...</span>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Failed to load submission details.</p>
                <button onClick={onBackAction} className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                    Go back
                </button>
            </div>
        );
    }

    const { status, time, memory, createdAt, language, code, testCases } = submission;
    const isAccepted = status === 'ACCEPTED';
    const passedTestcases = testCases?.filter((tc: any) => tc.status === 'ACCEPTED').length || 0;
    const totalTestcases = testCases?.length || 0;

    // Simulate "Beats X%" if not provided by backend natively
    const timeBeats = submission.timePercentile || (100 - ((time || 0) % 40) - Math.random() * 5).toFixed(2);
    const memoryBeats = submission.memoryPercentile || (100 - (((memory || 0) / 1024) % 30) - Math.random() * 5).toFixed(2);

    // Calculate height based on lines of code (roughly 21px per line + padding)
    const codeLines = (code || "").split("\n").length;
    const editorHeight = Math.min(Math.max(250, codeLines * 21 + 50), 1200); // Between 250px and 1200px

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
            className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#1D1E23] font-sans"
        >
            {/* Header Navigation */}
            <div className="sticky top-0 z-20 bg-[#fafafa]/80 dark:bg-[#1D1E23]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-6 py-4 flex justify-between items-center">
                <button
                    onClick={onBackAction}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm font-semibold tracking-tight group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    All Submissions
                </button>
            </div>

            <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
                {/* Status Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h2 className={`text-2xl font-sans font-bold tracking-tight ${isAccepted ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, " ")}
                            </h2>
                            <span className="text-gray-500 dark:text-gray-400 font-medium text-[15px] font-sans -translate-y-0.5">
                                {passedTestcases} / {totalTestcases} testcases passed
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[14px] font-sans text-gray-600 dark:text-gray-300 font-medium">
                            {time !== null && <span>Runtime: {time} ms</span>}
                            {time !== null && <span>•</span>}
                            {memory !== null && <span>Memory: {(memory / 1024).toFixed(1)} MB</span>}
                            {memory !== null && <span>•</span>}
                            <span className="flex items-center gap-1.5">
                                Submitted at: {new Date(createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                            </span>
                            <span>•</span>
                            <GithubSyncDialog>
                                <button className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer outline-none">
                                    <div className="relative flex items-center justify-center">
                                        <GitBranch className="w-4 h-4 text-emerald-500" />
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#fafafa] dark:border-[#1D1E23] ${autoSyncEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                                    </div>
                                    {submission?.githubSyncedAt ? "Synced to GitHub" : "Not synced"}
                                </button>
                            </GithubSyncDialog>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Graph (only if ACCEPTED) */}
                {isAccepted && time !== null && memory !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-transparent border border-gray-200 dark:border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex flex-wrap gap-4 mb-8">
                            {/* Runtime Tab */}
                            <button
                                onClick={() => setActiveGraph("runtime")}
                                className={`px-5 py-3 rounded-xl text-left transition-all min-w-[280px] ${activeGraph === "runtime"
                                    ? "bg-gray-100 dark:bg-[#2A2A2B]"
                                    : "bg-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1.5">
                                    <Timer className="w-4 h-4" />
                                    <span className="text-sm font-medium">Runtime</span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{time}<span className="text-xl font-bold ml-0.5">ms</span></span>
                                    <span className="text-gray-300 dark:text-gray-600 font-light text-xl">|</span>
                                    <span className="text-[15px] font-medium text-gray-500 dark:text-gray-400">Beats {timeBeats}%</span>
                                </div>
                            </button>

                            {/* Memory Tab */}
                            <button
                                onClick={() => setActiveGraph("memory")}
                                className={`px-5 py-3 rounded-xl text-left transition-all min-w-[280px] ${activeGraph === "memory"
                                    ? "bg-gray-100 dark:bg-[#2A2A2B]"
                                    : "bg-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1.5">
                                    <Database className="w-4 h-4" />
                                    <span className="text-sm font-medium">Memory</span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{(memory / 1024).toFixed(1)} <span className="text-xl font-bold ml-0.5">MB</span></span>
                                    <span className="text-gray-300 dark:text-gray-600 font-light text-xl">|</span>
                                    <span className="text-[15px] font-medium text-gray-500 dark:text-gray-400">Beats {memoryBeats}%</span>
                                </div>
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeGraph}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <SubmissionDistribution
                                    problemId={problemId}
                                    currentValue={activeGraph === "runtime" ? time : memory}
                                    type={activeGraph}
                                    showGraph={true}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Code Block */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-[#24262C]"
                >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/5">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                {language.name}
                            </span>
                        </div>
                        <button 
                            onClick={() => onRestoreCode?.(code, language.judge0Id || 71)}
                            className="p-2 text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all"
                            title="Restore to editor"
                        >
                            <SquareArrowOutUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="w-full rounded-b-md overflow-hidden bg-transparent" style={{ height: `${editorHeight}px` }}>
                        <CodeEditor
                            value={code}
                            languageId={language.judge0Id || 71}
                            readOnly={true}
                            hideToolbar={true}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

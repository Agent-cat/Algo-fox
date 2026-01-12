"use client";

import { useState } from "react";
import { Shield, Monitor, Eye, Keyboard, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { startContestSession } from "@/actions/contest";
import { toast } from "sonner";

interface ContestEntryModalProps {
    contestId: string;
    contestTitle: string;
    isOpen: boolean;
    onClose: () => void;
    onStart: (sessionId: string) => void;
}

const RULES = [
    {
        icon: Monitor,
        title: "Full-Screen Mode",
        description: "The contest will run in full-screen. Exiting fullscreen will be logged."
    },
    {
        icon: Eye,
        title: "Tab Switch Detection",
        description: "Switching tabs or windows will be detected and recorded as a violation."
    },
    {
        icon: Keyboard,
        title: "Keyboard Restrictions",
        description: "Copy, paste, and developer shortcuts (F12, Ctrl+Shift+I) are disabled."
    },
    {
        icon: Shield,
        title: "Proctoring Active",
        description: "All violations are logged and may affect your contest results."
    }
];

export default function ContestEntryModal({
    contestId,
    contestTitle,
    isOpen,
    onClose,
    onStart
}: ContestEntryModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleStartContest = async () => {
        if (!agreed) {
            toast.error("Please agree to the contest rules to continue");
            return;
        }

        setIsLoading(true);

        try {
            // Start server session
            const result = await startContestSession(contestId);

            if (!result.success) {
                toast.error(result.error || "Failed to start contest");
                setIsLoading(false);
                return;
            }

            // Request fullscreen
            try {
                await document.documentElement.requestFullscreen();
            } catch (e) {
                console.warn("Fullscreen request failed:", e);
                // Continue anyway - will try again on first click
            }

            toast.success("Contest mode activated!");
            onStart(result.sessionId!);
        } catch (error) {
            toast.error("Failed to start contest session");
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Contest Mode</h2>
                                <p className="text-gray-400 text-sm">{contestTitle}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Rules */}
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-orange-800">
                            <strong>Important:</strong> Once you start, contest protection will be activated.
                            Violations may result in penalties.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700">Contest Rules:</p>
                        {RULES.map((rule, index) => {
                            const Icon = rule.icon;
                            return (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{rule.title}</p>
                                        <p className="text-xs text-gray-500">{rule.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Escalation warning */}
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <p className="text-sm text-red-800">
                            <strong>Escalation:</strong> 3+ violations → Flagged for review.
                            5+ violations → Auto-submit and blocked.
                        </p>
                    </div>

                    {/* Agreement checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                            I understand and agree to the contest rules and proctoring terms.
                        </span>
                    </label>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleStartContest}
                        disabled={!agreed || isLoading}
                        className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Start Contest
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}

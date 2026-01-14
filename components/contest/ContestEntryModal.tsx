"use client";

import { useState, useEffect } from "react";
import { Shield, Monitor, Eye, Keyboard, AlertTriangle, CheckCircle2, X, Lock, ArrowRight } from "lucide-react";
import { startContestSession, verifyContestPassword } from "@/actions/contest";
import { toast } from "sonner";

interface ContestEntryModalProps {
    contestId: string;
    contestTitle: string;
    requiresPassword?: boolean;
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
    requiresPassword,
    isOpen,
    onClose,
    onStart
}: ContestEntryModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'PASSWORD' | 'RULES'>('RULES');
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (requiresPassword) {
                setStep('PASSWORD');
            } else {
                setStep('RULES');
            }
            // Reset states
            setAgreed(false);
            setPassword("");
            setIsLoading(false);
        }
    }, [isOpen, requiresPassword]);

    const handleVerifyPassword = async () => {
        if (!password) {
            toast.error("Please enter the contest password");
            return;
        }

        setIsLoading(true);
        try {
            const result = await verifyContestPassword(contestId, password);
            if (result.success) {
                setStep('RULES');
                toast.success("Password verified");
            } else {
                toast.error(result.error || "Invalid password");
            }
        } catch (error) {
            toast.error("Failed to verify password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartContest = async () => {
        if (!agreed) {
            toast.error("Please agree to the contest rules to continue");
            return;
        }

        setIsLoading(true);

        try {
            // Start server session
            const result = await startContestSession(contestId, password);

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

    if (step === 'PASSWORD') {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleIn">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600">
                                    <Lock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Password Required</h2>
                                    <p className="text-gray-400 text-xs">Enter access code to continue</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contest Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleVerifyPassword()}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono text-lg"
                                    placeholder="••••••••"
                                    autoFocus
                                />
                            </div>

                            <button
                                onClick={handleVerifyPassword}
                                disabled={isLoading || !password}
                                className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Rules Step
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className={`bg-white rounded-2xl shadow-2xl w-full mx-4 overflow-hidden animate-scaleIn transition-all duration-300 max-w-4xl`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Contest Mode</h2>
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

                <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Contest Rules & Requirements</h3>
                                <p className="text-gray-500 text-sm">Please review the following rules carefully before starting. Violation of these rules may result in disqualification.</p>
                            </div>

                            <div className="space-y-4">
                                {RULES.map((rule, index) => {
                                    const Icon = rule.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                                                <Icon className="w-5 h-5 text-gray-700" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm mb-1">{rule.title}</p>
                                                <p className="text-xs text-gray-500 leading-relaxed">{rule.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col h-full">
                             <div className="flex-1">
                                <div className="p-5 bg-orange-50 rounded-xl border border-orange-100 mb-6">
                                    <div className="flex gap-3">
                                        <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-orange-900 mb-1">
                                                Active Monitoring
                                            </p>
                                            <p className="text-sm text-orange-800/80 leading-relaxed">
                                                Once you start, contest protection will be activated. Violations such as switching tabs, exiting fullscreen, or using developer tools will be logged and may impact your score.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-red-50 rounded-xl border border-red-100 mb-6">
                                    <div className="flex gap-3">
                                        <Shield className="w-5 h-5 text-red-600 shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-red-900 mb-1">
                                                Automatic Disqualification
                                            </p>
                                            <p className="text-sm text-red-800/80 leading-relaxed">
                                                <strong>Escalation Policy:</strong> 3+ violations will flag your session for review. 5+ violations will automatically submit your contest and block further access.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                             </div>

                             <div className="mt-auto">
                                <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors mb-6 group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-orange-500 checked:bg-orange-500"
                                        />
                                        <CheckCircle2 className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                                    </div>
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors select-none">
                                        I have read and agree to the <span className="font-semibold text-gray-900">contest rules</span> and understand the <span className="font-semibold text-gray-900">proctoring terms</span>.
                                    </span>
                                </label>

                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleStartContest}
                                        disabled={!agreed || isLoading}
                                        className="flex-[2] py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/25 hover:from-orange-500 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Accept & Start Contest <ArrowRight className="w-4 h-4 opacity-80" />
                                            </>
                                        )}
                                    </button>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes scaleIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-scaleIn {
                        animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                `}</style>
            </div>
        </div>
    );
}

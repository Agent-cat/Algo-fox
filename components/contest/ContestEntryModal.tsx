"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Monitor,
  Eye,
  Keyboard,
  ArrowRight,
  Check,
  Lock,
  X,
  ChevronLeft,
} from "lucide-react";
import { startContestSession, verifyContestPassword } from "@/actions/contest";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    title: "Fullscreen Enforced",
    description: "The contest runs in fullscreen. Exiting may be flagged.",
  },
  {
    icon: Eye,
    title: "Focus Tracking",
    description: "Tab switching and window blurring are monitored.",
  },
  {
    icon: Keyboard,
    title: "Input Restricted",
    description: "Copy-paste and developer tools are disabled.",
  },
  {
    icon: Shield,
    title: "Proctored Environment",
    description: "suspicious activity is logged for review.",
  },
];

type Step = "PASSWORD" | "RULES" | "CONFIRM";

export default function ContestEntryModal({
  contestId,
  contestTitle,
  requiresPassword,
  isOpen,
  onClose,
  onStart,
}: ContestEntryModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("RULES");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (requiresPassword) {
        setStep("PASSWORD");
      } else {
        setStep("RULES");
      }
      setAgreed(false);
      setPassword("");
      setIsLoading(false);
    }
  }, [isOpen, requiresPassword]);

  const handleVerifyPassword = async () => {
    if (!password) {
      toast.error("Enter the contest password");
      return;
    }
    setIsLoading(true);
    try {
      const result = await verifyContestPassword(contestId, password);
      if (result.success) {
        setStep("RULES");
        toast.success("Access granted");
      } else {
        toast.error(result.error || "Incorrect password");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartContest = async () => {
    if (!agreed) return;
    setIsLoading(true);
    try {
      const result = await startContestSession(contestId, password);
      if (!result.success) {
        toast.error(result.error || "Could not start session");
        setIsLoading(false);
        return;
      }

      try {
        await document.documentElement.requestFullscreen();
      } catch (e) {
        console.warn("Fullscreen failed", e);
      }

      toast.success("Good luck!");
      onStart(result.sessionId!);
    } catch {
      toast.error("Failed to initialize contest");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#0a0a0a] w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 dark:border-[#262626] overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Progress / Navigation Header */}
        <div className="px-8 pt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => {
               // Calculate current step index
               let currentStepIdx = 0;
               if (requiresPassword) {
                 if (step === "PASSWORD") currentStepIdx = 1;
                 if (step === "RULES") currentStepIdx = 2;
                 if (step === "CONFIRM") currentStepIdx = 3;
               } else {
                 if (step === "RULES") currentStepIdx = 1; // Actually step 1 visually
                 if (step === "CONFIRM") currentStepIdx = 2;
               }
               // Normalizing because map index is simple
               // If requiresPassword: Steps are Pass(1), Rules(2), Confirm(3)
               // If not: Rules(1), Confirm(2) -> effectively 2 steps visually

               const totalSteps = requiresPassword ? 3 : 2;
               if (i > totalSteps) return null;

               let isActive = false;
               if (requiresPassword) {
                   if (i === 1 && step === "PASSWORD") isActive = true;
                   if (i === 2 && step === "RULES") isActive = true;
                   if (i === 3 && step === "CONFIRM") isActive = true;
               } else {
                   if (i === 1 && step === "RULES") isActive = true;
                   if (i === 2 && step === "CONFIRM") isActive = true;
               }

               const isCompleted = requiresPassword
                ? (i === 1 && step !== "PASSWORD") || (i === 2 && step === "CONFIRM")
                : (i === 1 && step === "CONFIRM");

               return (
                <div
                    key={i}
                    className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        isActive ? "w-8 bg-orange-600" : isCompleted ? "w-2 bg-orange-200 dark:bg-orange-900" : "w-2 bg-gray-100 dark:bg-[#262626]"
                    )}
                />
               );
            })}
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 min-h-[400px] flex flex-col">
          {/* PASSWORD STEP */}
          {step === "PASSWORD" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6">
                    <Lock className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Private Contest</h2>
                <p className="text-gray-500 dark:text-gray-400">Enter the access code to join.</p>
              </div>

              <div className="space-y-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyPassword()}
                    placeholder="Password"
                    autoFocus
                    className="w-full bg-gray-50 dark:bg-[#141414] border-gray-200 dark:border-[#262626] rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-700"
                />
              </div>

              <div className="mt-auto pt-8">
                <button
                    onClick={handleVerifyPassword}
                    disabled={!password || isLoading}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? "Verifying..." : "Continue"}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* RULES STEP */}
          {step === "RULES" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
               <div className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contest Rules</h2>
                 <p className="text-gray-500 dark:text-gray-400">Strict proctoring is active.</p>
               </div>

               <div className="space-y-6">
                 {RULES.map((rule, idx) => {
                     const Icon = rule.icon;
                     return (
                         <div key={idx} className="flex gap-4">
                             <div className="w-10 h-10 shrink-0 rounded-full bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center">
                                 <Icon className="w-5 h-5 text-gray-900 dark:text-white" />
                             </div>
                             <div>
                                 <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{rule.title}</h3>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">{rule.description}</p>
                             </div>
                         </div>
                     )
                 })}
               </div>

               <div className="mt-auto pt-8">
                <button
                    onClick={() => setStep("CONFIRM")}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                    I Understand
                    <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* CONFIRM STEP */}
          {step === "CONFIRM" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
                <button
                  onClick={() => setStep("RULES")}
                  className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="text-center mb-8">
                   <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 mx-auto rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Shield className="w-8 h-8 text-orange-600 dark:text-orange-500" />
                   </div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to Start?</h2>
                   <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[260px] mx-auto">
                        Once you begin, your screen will be monitored. Violations may lead to disqualification.
                   </p>
                </div>

                <div className="bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl p-4 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <div className="relative flex items-center mt-0.5">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="peer h-5 w-5 appearance-none rounded-md border-2 border-gray-300 dark:border-gray-600 checked:border-orange-500 checked:bg-orange-500 transition-all"
                            />
                            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 select-none leading-relaxed">
                            I verify that I am the registered participant and I agree to follow all contest rules honestly.
                        </span>
                    </label>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleStartContest}
                        disabled={!agreed || isLoading}
                        className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Enter Contest
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

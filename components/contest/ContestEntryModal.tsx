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
  Clipboard,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  XCircle,
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
    description: "The contest runs in fullscreen. Exiting will be flagged as a violation.",
  },
  {
    icon: Eye,
    title: "Tab Switching Monitored",
    description: "Navigating away, Alt+Tab, and window blur are detected and logged.",
  },
  {
    icon: Keyboard,
    title: "Input Restricted",
    description: "Copy-paste, keyboard shortcuts and developer tools are blocked.",
  },
  {
    icon: Shield,
    title: "Proctored Environment",
    description: "All suspicious activity is logged and reviewed by your teacher.",
  },
];

const AI_SITES = ["ChatGPT", "Claude", "Gemini", "Copilot", "Perplexity"];

type Step = "PASSWORD" | "ENVIRONMENT_CHECK" | "RULES" | "TAB_PERMISSION" | "CLIPBOARD_PERMISSION" | "CONFIRM";
type ClipboardStatus = "idle" | "requesting" | "granted" | "denied";

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
  const [tabAgreed, setTabAgreed] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState<ClipboardStatus>("idle");
  const [envCheckStatus, setEnvCheckStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [envCheckError, setEnvCheckError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(requiresPassword ? "PASSWORD" : "ENVIRONMENT_CHECK");
      setAgreed(false);
      setTabAgreed(false);
      setClipboardStatus("idle");
      setEnvCheckStatus("idle");
      setEnvCheckError(null);
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
        setStep("ENVIRONMENT_CHECK");
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

  const handleRequestClipboard = async () => {
    setClipboardStatus("requesting");
    try {
      // readText() triggers the browser's native permission prompt
      await navigator.clipboard.readText();
      setClipboardStatus("granted");
    } catch {
      // Denied or blocked — still allow entry; keyboard blocking remains active
      setClipboardStatus("denied");
    }
  };

  const runEnvironmentCheck = async () => {
    setEnvCheckStatus("checking");
    setEnvCheckError(null);

    const extensionCheck = await new Promise<any>((resolve) => {
      const timeout = setTimeout(() => {
        window.removeEventListener("message", messageHandler);
        resolve({ success: false, reason: "not_installed" });
      }, 1500);

      const messageHandler = (event: MessageEvent) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "SAFE_EXAM_ACK" && event.data.action === "start") {
          clearTimeout(timeout);
          window.removeEventListener("message", messageHandler);
          resolve({ success: true, payload: event.data.payload });
        }
      };

      window.addEventListener("message", messageHandler);
      window.postMessage({ type: "SAFE_EXAM_START" }, "*");
    });

    if (!extensionCheck.success) {
      setEnvCheckStatus("error");
      setEnvCheckError("Safe Exam Extension is not installed or active.");
      return;
    }

    if (extensionCheck.payload.status === "blocked") {
      setEnvCheckStatus("error");
      if (extensionCheck.payload.reason === "other_extensions_active") {
         setEnvCheckError(`Please disable other active extensions: ${extensionCheck.payload.extensions.join(', ')}`);
      } else if (extensionCheck.payload.reason === "other_tabs_open") {
         setEnvCheckError(`Please close ${extensionCheck.payload.count} other open tab(s) before starting.`);
      } else {
         setEnvCheckError(`Blocked: ${extensionCheck.payload.reason}`);
      }
      return;
    }

    setEnvCheckStatus("success");
  };

  const handleStartContest = async () => {
    if (!agreed) return;
    setIsLoading(true);

    try {
      const result = await startContestSession(contestId, password);
      if (!result.success) {
        const error = (result as any).error || "Could not start session";
        toast.error(String(error));
        setIsLoading(false);
        return;
      }

      if (!(result as any).sessionId) {
        toast.error("Failed to generate a valid session ID. Please try again.");
        setIsLoading(false);
        return;
      }

      onStart((result as { sessionId: string }).sessionId);

      // Fullscreen is still enforced — same as before
      setTimeout(async () => {
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          }
        } catch (err) {
          console.warn("Fullscreen failed", err);
        }
      }, 100);

      toast.success("Good luck!");
    } catch {
      toast.error("Failed to initialize contest");
      setIsLoading(false);
    }
  };

  // Build the ordered list of non-password steps for the progress indicator
  const progressSteps: Step[] = ["ENVIRONMENT_CHECK", "RULES", "TAB_PERMISSION", "CLIPBOARD_PERMISSION", "CONFIRM"];
  const displayStepIndex = progressSteps.indexOf(step);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md"
        onClick={() => {
          if (!requiresPassword || step !== "PASSWORD") {
            window.postMessage({ type: "SAFE_EXAM_END" }, "*");
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#0f0f0f] w-full max-w-xl rounded-none shadow-2xl border border-gray-100 dark:border-[#222] overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Progress dots header */}
        <div className="px-8 pt-7 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {progressSteps.map((s, i) => {
              const isActive = s === step;
              const isCompleted = displayStepIndex > i;
              return (
                <div
                  key={s}
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-500",
                    isActive
                      ? "w-8 bg-orange-500"
                      : isCompleted
                      ? "w-3 bg-orange-300 dark:bg-orange-700"
                      : "w-3 bg-gray-100 dark:bg-[#2a2a2a]"
                  )}
                />
              );
            })}
          </div>
          {step !== "PASSWORD" && (
            <button
              onClick={() => {
                window.postMessage({ type: "SAFE_EXAM_END" }, "*");
                onClose();
              }}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-8 min-h-[440px] flex flex-col">

          {/* ─────────── STEP: PASSWORD ─────────── */}
          {step === "PASSWORD" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-none flex items-center justify-center mb-6">
                  <Lock className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{contestTitle}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enter the access code to continue.</p>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyPassword()}
                placeholder="••••••••"
                autoFocus
                className="w-full bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-none px-4 py-4 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-700"
              />

              <div className="mt-auto pt-8">
                <button
                  onClick={handleVerifyPassword}
                  disabled={!password || isLoading}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-none font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Verifying…" : <><span>Continue</span> <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          )}

          {/* ─────────── STEP: ENVIRONMENT_CHECK ─────────── */}
          {step === "ENVIRONMENT_CHECK" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">System Check</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We need to verify your environment before proceeding.
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                 {envCheckStatus === "idle" && (
                    <div className="p-4 bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#1e1e1e] text-center text-sm text-gray-600 dark:text-gray-400">
                        Click the button below to start the environment check.
                    </div>
                 )}
                 {envCheckStatus === "checking" && (
                    <div className="p-4 bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#1e1e1e] text-center flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-orange-500 rounded-full animate-spin" />
                        Verifying environment...
                    </div>
                 )}
                 {envCheckStatus === "error" && (
                    <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-center flex flex-col items-center gap-2">
                        <XCircle className="w-6 h-6 text-red-500" />
                        <p className="text-sm text-red-700 dark:text-red-400 font-medium">Verification Failed</p>
                        <p className="text-xs text-red-600 dark:text-red-300">{envCheckError}</p>
                    </div>
                 )}
                 {envCheckStatus === "success" && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center flex flex-col items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">All checks passed</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-300">Your environment is secure and ready.</p>
                    </div>
                 )}
              </div>

              <div className="mt-auto pt-7 flex flex-col gap-3">
                {envCheckStatus !== "success" && (
                  <button
                    onClick={runEnvironmentCheck}
                    disabled={envCheckStatus === "checking"}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-none font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {envCheckStatus === "error" ? "Retry Checks" : "Run Checks"}
                  </button>
                )}
                {envCheckStatus === "success" && (
                  <button
                    onClick={() => setStep("RULES")}
                    className="w-full bg-orange-600 text-white py-3.5 rounded-none font-semibold text-sm tracking-wide hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ─────────── STEP: RULES ─────────── */}
          {step === "RULES" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Proctoring Active</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Strict monitoring applies from the moment you enter the contest.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RULES.map((rule, idx) => {
                  const Icon = rule.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#1e1e1e] rounded-none"
                    >
                      <div className="w-8 h-8 shrink-0 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white leading-tight">{rule.title}</p>
                        <p className="text-[11px] text-gray-500 dark:text-[#666] mt-0.5 leading-relaxed">{rule.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-7">
                <button
                  onClick={() => setStep("TAB_PERMISSION")}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-none font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  I Understand <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ─────────── STEP: TAB_PERMISSION ─────────── */}
          {step === "TAB_PERMISSION" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <button
                onClick={() => setStep("RULES")}
                className="mb-5 flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors w-fit"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/15 flex items-center justify-center shrink-0">
                  <Wifi className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">Tab & Focus Monitoring</h2>
                  <p className="text-[11px] text-gray-400 dark:text-[#666] mt-0.5">You must acknowledge this to proceed</p>
                </div>
              </div>

              <p className="text-[13px] text-gray-600 dark:text-[#999] leading-relaxed mb-4">
                During the contest, the following events are actively monitored:
              </p>

              <ul className="space-y-2.5 mb-5">
                {[
                  "Switching away from this tab (detected immediately)",
                  "Opening new browser tabs or windows",
                  "Window losing focus — Alt+Tab, clicking outside the browser",
                  `Returning from AI sites (${AI_SITES.join(", ")}, etc.)`,
                  "Multiple monitors or screen sharing signals",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-gray-700 dark:text-[#bbb]">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="p-3.5 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/15 mb-5">
                <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
                  <strong>Each violation is logged to your teacher in real time.</strong> Repeated violations result in a temporary suspension or permanent block from the contest.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#222] p-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex items-center shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={tabAgreed}
                      onChange={(e) => setTabAgreed(e.target.checked)}
                      className="peer h-4 w-4 appearance-none border-2 border-gray-300 dark:border-gray-600 checked:border-orange-500 checked:bg-orange-500 transition-all"
                    />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="text-[12px] text-gray-600 dark:text-[#aaa] select-none leading-relaxed">
                    I understand my tab usage is monitored and agree to keep this contest tab active at all times.
                  </span>
                </label>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setStep("CLIPBOARD_PERMISSION")}
                  disabled={!tabAgreed}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-none font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ─────────── STEP: CLIPBOARD_PERMISSION ─────────── */}
          {step === "CLIPBOARD_PERMISSION" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <button
                onClick={() => setStep("TAB_PERMISSION")}
                className="mb-5 flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors w-fit"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/15 flex items-center justify-center shrink-0">
                  <Clipboard className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">Clipboard Access</h2>
                  <p className="text-[11px] text-gray-400 dark:text-[#666] mt-0.5">Required for paste monitoring</p>
                </div>
              </div>

              <p className="text-[13px] text-gray-600 dark:text-[#999] leading-relaxed mb-4">
                To prevent pasting answers from outside sources, we need clipboard access. This lets us:
              </p>

              <ul className="space-y-2.5 mb-5">
                {[
                  "Detect and block paste actions (Ctrl+V) during the exam",
                  "Clear the clipboard when you return to this tab",
                  "Log copy/paste attempts as violations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-gray-700 dark:text-[#bbb]">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Permission trigger */}
              <div className="mb-5">
                {clipboardStatus === "idle" && (
                  <button
                    onClick={handleRequestClipboard}
                    className="w-full py-3 border border-dashed border-orange-300 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 text-[13px] font-semibold hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Clipboard className="w-4 h-4" />
                    Grant Clipboard Permission
                  </button>
                )}

                {clipboardStatus === "requesting" && (
                  <div className="w-full py-3 text-center text-[13px] text-gray-400 dark:text-[#666] flex items-center justify-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-gray-300 dark:border-gray-600 border-t-orange-500 rounded-full animate-spin" />
                    Waiting for browser permission…
                  </div>
                )}

                {clipboardStatus === "granted" && (
                  <div className="flex items-center gap-2.5 py-3 px-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-[12px] text-emerald-700 dark:text-emerald-400 font-medium">
                      Clipboard access granted — paste monitoring is active.
                    </span>
                  </div>
                )}

                {clipboardStatus === "denied" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 py-3 px-4 bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#2a2a2a]">
                      <XCircle className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-[12px] text-gray-500 dark:text-[#888] font-medium">
                        Permission denied — keyboard-level paste blocking remains active.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {clipboardStatus === "idle" && (
                <p className="text-[11px] text-gray-400 dark:text-[#555] text-center">
                  Click the button above to see the browser permission prompt. You can also decline and continue.
                </p>
              )}

              <div className="mt-auto pt-4">
                <button
                  onClick={() => setStep("CONFIRM")}
                  disabled={clipboardStatus === "idle" || clipboardStatus === "requesting"}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-none font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ─────────── STEP: CONFIRM ─────────── */}
          {step === "CONFIRM" && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-300">
              <button
                onClick={() => setStep("CLIPBOARD_PERMISSION")}
                className="mb-6 flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors w-fit"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>

              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mx-auto flex items-center justify-center mb-5 animate-pulse">
                  <Shield className="w-7 h-7 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Start?</h2>
                <p className="text-[13px] text-gray-500 dark:text-[#777] max-w-[260px] mx-auto leading-relaxed">
                  Fullscreen will activate. Violations are recorded and sent to your teacher in real time.
                </p>
              </div>

              {/* Permission summary */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2.5 text-[12px] text-gray-600 dark:text-[#aaa] px-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Tab & focus monitoring — acknowledged
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-gray-600 dark:text-[#aaa] px-1">
                  {clipboardStatus === "granted"
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    : <XCircle className="w-4 h-4 text-gray-400 shrink-0" />}
                  Clipboard access — {clipboardStatus === "granted" ? "granted" : "denied (keyboard blocking active)"}
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-gray-600 dark:text-[#aaa] px-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Fullscreen enforcement — active on entry
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#222] p-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex items-center shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="peer h-4 w-4 appearance-none border-2 border-gray-300 dark:border-gray-600 checked:border-orange-500 checked:bg-orange-500 transition-all"
                    />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="text-[12px] text-gray-600 dark:text-[#aaa] select-none leading-relaxed">
                    I verify that I am the registered participant and I agree to follow all contest rules honestly without external assistance.
                  </span>
                </label>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleStartContest}
                  disabled={!agreed || isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3.5 rounded-none font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><span>Enter Contest</span> <ArrowRight className="w-4 h-4" /></>
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

"use client";

import { useState } from "react";
import { Copy, Loader2, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { verifyCodeChefOwnership, verifyCodeforcesOwnership, verifyLeetCodeOwnership } from "@/actions/platform.action";

interface VerificationModalProps {
    platform: string;
    handle: string;
    onClose: () => void;
    onSuccess: () => void;
}

// ... (existing imports)

export function VerificationModal({ platform, handle, onClose, onSuccess }: VerificationModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    // Generate a random 8-character code
    const [verificationCode] = useState(() => Math.random().toString(36).substring(2, 10));

    const isCodeforces = platform === "Codeforces";
    const isLeetCode = platform === "LeetCode";

    let editUrl = `https://www.codechef.com/users/${handle}/edit`;
    if (isCodeforces) editUrl = "https://codeforces.com/settings/social";
    if (isLeetCode) editUrl = "https://leetcode.com/profile/";

    let fieldName = "Name";
    if (isCodeforces) fieldName = "First Name";
    if (isLeetCode) fieldName = "Name";

    const handleCopy = () => {
        navigator.clipboard.writeText(verificationCode);
        toast.success("Code copied to clipboard");
    };

    const handleVerify = async () => {
        setIsLoading(true);
        try {
            let res;
            if (isCodeforces) {
                res = await verifyCodeforcesOwnership(handle, verificationCode);
            } else if (isLeetCode) {
                 res = await verifyLeetCodeOwnership(handle, verificationCode);
            } else {
                res = await verifyCodeChefOwnership(handle, verificationCode);
            }

            if (res.success) {
                toast.success(`${platform} profile verified successfully!`);
                onSuccess();
                onClose();
            } else {
                toast.error(res.error || `Verification failed. Please check if the ${fieldName} is updated correctly.`);
            }
        } catch (error) {
            toast.error("An error occurred during verification");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-200 dark:border-[#333] relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Verify your {platform} profile
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Step {step} / 3
                    </p>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                Open your {platform} profile settings in a new tab.
                            </p>
                            <a
                                href={editUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-xl font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                            >
                                Open {platform} Settings <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                         <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    Paste this verification code in your <strong>{fieldName}</strong>
                                </p>
                                <p className="text-xs text-gray-400">
                                    (You can change it back after verification)
                                </p>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl">
                                <code className="flex-1 text-center font-mono text-lg font-bold text-gray-900 dark:text-gray-100 tracking-wider">
                                    {verificationCode}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                                    title="Copy Code"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 py-3 bg-gray-100 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors"
                            >
                                I've pasted the code
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                Make sure you saved your profile changes on {platform} using the verification code.
                            </p>
                             <p className="text-sm text-gray-500">
                                Click verify below to confirm ownership.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(2)}
                                disabled={isLoading}
                                className="flex-1 py-3 bg-gray-100 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-[#333] transition-colors disabled:opacity-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleVerify}
                                disabled={isLoading}
                                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Verify ${platform} Profile`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Copy, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { verifyCodeChefOwnership, verifyCodeforcesOwnership, verifyLeetCodeOwnership } from "@/actions/platform.action";
import { Dialog as CustomDialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VerificationModalProps {
    platform: string;
    handle: string;
    onClose: () => void;
    onSuccess: () => void;
}

export function VerificationModal({ platform, handle, onClose, onSuccess }: VerificationModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
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
        <CustomDialog
            open={true}
            onOpenChangeAction={(open) => { if (!open) onClose(); }}
        >
            <div className="flex flex-col items-center text-center p-2">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                </div>

                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">Verify {platform} Profile</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Step {step} of 3
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <>
                        <div className="w-full text-center mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Open your {platform} profile settings in a new tab.
                            </p>
                            <a
                                href={editUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 mb-2 inline-flex items-center gap-2 px-6 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                            >
                                Open Settings <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2 flex flex-col sm:flex-row">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="w-full sm:w-1/2 border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => setStep(2)}
                                className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Continue
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="w-full text-center mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                Paste this code in your <strong>{fieldName}</strong>
                            </p>

                            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-lg mt-3 mx-auto w-3/4">
                                <code className="flex-1 text-center font-mono text-base font-bold text-gray-900 dark:text-gray-100">
                                    {verificationCode}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-md transition-colors"
                                    title="Copy Code"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2 flex flex-col sm:flex-row">
                            <Button
                                variant="outline"
                                onClick={() => setStep(1)}
                                className="w-full sm:w-1/2 border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={() => setStep(3)}
                                className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Copied Code
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="w-full text-center mt-4 px-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Make sure you saved your profile changes on {platform} with the code. Click verify to confirm.
                            </p>
                        </div>
                        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2 flex flex-col sm:flex-row">
                            <Button
                                variant="outline"
                                onClick={() => setStep(2)}
                                disabled={isLoading}
                                className="w-full sm:w-1/2 border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleVerify}
                                disabled={isLoading}
                                className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Verify Profile
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </div>
        </CustomDialog>
    );
}

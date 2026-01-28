"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import { Loader2, Trash2, Check, Github, AlertCircle, ExternalLink, X, ShieldCheck, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";
import { checkCodeChefUser, checkCodeforcesUser, checkLeetCodeUser } from "@/actions/platform.action";
import Image from "next/image";
import { VerificationModal } from "@/components/settings/VerificationModal";
import { useRouter } from "next/navigation";

interface PlatformSettingsProps {
    user: {
        leetCodeHandle?: string | null;
        leetCodeVerified?: boolean | null;
        codeChefHandle?: string | null;
        codeChefVerified?: boolean | null;
        codeforcesHandle?: string | null;
        codeforcesVerified?: boolean | null;
        githubHandle?: string | null;
    };
}

interface FormData {
    leetCodeHandle: string;
    codeChefHandle: string;
    codeforcesHandle: string;
    githubHandle: string;
}

interface PlatformRowProps {
    id: keyof FormData;
    label: string;
    iconSrc: string | React.ReactNode;
    placeholder: string;
    urlPrefix?: string;
    form: UseFormReturn<FormData>;
    onSubmit: (platform: keyof FormData) => Promise<void>;
    handleDisconnect: (platform: keyof FormData) => Promise<void>;
    isLoading: string | null;
    initialValue: string;
    onVerify?: (handle: string) => void;
    isVerified?: boolean;
}

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const PlatformRow = ({
    id,
    label,
    iconSrc,
    placeholder,
    urlPrefix,
    form,
    onSubmit,
    handleDisconnect,
    isLoading,
    initialValue,
    onVerify,
    isVerified
}: PlatformRowProps) => {
    const { register, watch, formState: { errors } } = form;
    const value = watch(id);
    const debouncedValue = useDebounce(value, 500);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    // Show connected state only if value is saved (matches initial) and not empty
    const isSaved = value === initialValue && !!value;

    // Existence check effect
    useEffect(() => {
        const checkExistence = async () => {
            if (!debouncedValue || debouncedValue === initialValue) {
                setIsValid(null);
                return;
            }

            // Check CodeChef
            if (id === "codeChefHandle") {
                setIsChecking(true);
                const res = await checkCodeChefUser(debouncedValue);
                setIsChecking(false);
                setIsValid(res.success);
            }

            // Check Codeforces
            if (id === "codeforcesHandle") {
                setIsChecking(true);
                const res = await checkCodeforcesUser(debouncedValue);
                setIsChecking(false);
                setIsValid(res.success);
            }

            // Check LeetCode
            if (id === "leetCodeHandle") {
                setIsChecking(true);
                const res = await checkLeetCodeUser(debouncedValue);
                setIsChecking(false);
                setIsValid(res.success);
            }
        };

        checkExistence();
    }, [debouncedValue, id, initialValue]);

    return (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a]/50 rounded-xl border border-gray-100 dark:border-[#262626]">
            <div className="flex items-center gap-3 w-1/4">
                {typeof iconSrc === "string" ? (
                    <Image src={iconSrc} alt={label} width={24} height={24} className="rounded-sm object-contain" />
                ) : (
                    iconSrc
                )}
                <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
            </div>

            <div className="flex-1 flex gap-2">
                    <div className="flex-1 flex items-center bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-lg px-3 overflow-hidden relative">
                        {urlPrefix && <span className="text-gray-400 text-sm whitespace-nowrap mr-1">{urlPrefix}</span>}
                        <input
                            {...register(id)}
                            className="flex-1 py-2 bg-transparent border-none outline-none text-sm"
                            placeholder={placeholder}
                        />
                        {/* Status Icon inside input */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isChecking ? (
                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            ) : isValid === true ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : isValid === false && debouncedValue ? (
                                <X className="w-4 h-4 text-red-500" />
                            ) : null}
                        </div>
                    </div>

                    {isSaved ? (
                    <div className="flex items-center gap-2">
                            {/* Verification Button or Verified Badge */}
                            {isVerified ? (
                                <div className="flex items-center gap-1.5 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-800">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verified</span>
                                </div>
                            ) : onVerify ? (
                                <button
                                    onClick={() => onVerify(value)}
                                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                                >
                                    Verify Now
                                </button>
                            ) : (
                                // Neutral "Linked" state for other platforms
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg" title="Linked">
                                    <LinkIcon className="w-4 h-4" />
                                </div>
                            )}

                            <button
                                onClick={() => handleDisconnect(id)}
                                className="flex items-center justify-center w-10 h-10 border border-gray-200 dark:border-[#333] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800 rounded-lg transition-colors"
                                title="Disconnect"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                    </div>
                    ) : (
                        <button
                        onClick={() => onSubmit(id)}
                        disabled={isLoading === id || isValid === false}
                        className="px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-sm font-medium rounded-lg transition-colors min-w-[80px] disabled:opacity-50"
                    >
                        {isLoading === id ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Save"}
                    </button>
                    )}
            </div>
        </div>
    );
};

export function PlatformSettings({ user }: PlatformSettingsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [verifyingHandle, setVerifyingHandle] = useState<{ platform: string, handle: string } | null>(null);

    const form = useForm<FormData>({
        defaultValues: {
            leetCodeHandle: user.leetCodeHandle || "",
            codeChefHandle: user.codeChefHandle || "",
            codeforcesHandle: user.codeforcesHandle || "",
            githubHandle: user.githubHandle || "",
        }
    });

    const { getValues, setValue, watch, reset } = form;

    const isGithubConnected = !!user.githubHandle || !!watch("githubHandle");

    const onSubmit = async (platform: keyof FormData) => {
        setIsLoading(platform);
        const data = getValues();

        try {
            const updatePayload = {
                leetCodeHandle: data.leetCodeHandle,
                codeChefHandle: data.codeChefHandle,
                codeforcesHandle: data.codeforcesHandle,
                githubHandle: data.githubHandle,
            };

            const res = await updateUserInfo(updatePayload);
            if (res.success) {
                toast.success(`${platform} handle updated successfully`);
                reset(data);
            } else {
                toast.error(res.error || "Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(null);
        }
    };

    const handleDisconnect = async (platform: keyof FormData) => {
         setValue(platform, "");
         await onSubmit(platform);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {verifyingHandle && (
                <VerificationModal
                    platform={verifyingHandle.platform}
                    handle={verifyingHandle.handle}
                    onClose={() => setVerifyingHandle(null)}
                    onSuccess={() => {
                        setVerifyingHandle(null);
                        router.refresh();
                        toast.success("CodeChef profile verified successfully");
                    }}
                />
            )}

            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Platforms</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    You can update and verify your platform details here.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-medium font-mono text-gray-900 dark:text-gray-100">Development</h2>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a]/50 rounded-xl border border-gray-100 dark:border-[#262626]">
                    <div className="flex items-center gap-3">
                        <Github className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">Github</span>
                    </div>
                    {isGithubConnected ? (
                         <button className="px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] text-sm font-medium rounded-lg">
                            Connected as {watch("githubHandle")}
                         </button>
                    ) : (
                        <button className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                            Connect
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-medium font-mono text-gray-900 dark:text-gray-100">Problem Solving</h2>
                <div className="space-y-3">
                    <PlatformRow
                        id="leetCodeHandle"
                        label="LeetCode"
                        iconSrc="/handles_logos/leetcode.png"
                        placeholder="username"
                        urlPrefix="https://leetcode.com/u/"
                        form={form}
                        onSubmit={onSubmit}
                        handleDisconnect={handleDisconnect}
                        isLoading={isLoading}
                        initialValue={user.leetCodeHandle || ""}
                        onVerify={(handle) => setVerifyingHandle({ platform: "LeetCode", handle })}
                        isVerified={user.leetCodeVerified || false}
                    />
                    <PlatformRow
                        id="codeChefHandle"
                        label="CodeChef"
                        iconSrc="/handles_logos/codechef.png"
                        placeholder="username"
                        urlPrefix="https://www.codechef.com/users/"
                        form={form}
                        onSubmit={onSubmit}
                        handleDisconnect={handleDisconnect}
                        isLoading={isLoading}
                        initialValue={user.codeChefHandle || ""}
                        onVerify={(handle) => setVerifyingHandle({ platform: "CodeChef", handle })}
                        isVerified={user.codeChefVerified || false}
                    />
                    <PlatformRow
                        id="codeforcesHandle"
                        label="CodeForces"
                        iconSrc="/handles_logos/codeforces.png"
                        placeholder="username"
                        urlPrefix="https://codeforces.com/profile/"
                        form={form}
                        onSubmit={onSubmit}
                        handleDisconnect={handleDisconnect}
                        isLoading={isLoading}
                        initialValue={user.codeforcesHandle || ""}
                        onVerify={(handle) => setVerifyingHandle({ platform: "Codeforces", handle })}
                        isVerified={user.codeforcesVerified || false}
                    />
                </div>
            </div>
        </div>
    );
}

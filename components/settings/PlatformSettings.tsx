"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { useState, useCallback, useEffect, useRef } from "react";
import { Loader2, Trash2, Check, AlertCircle, ExternalLink, X, ShieldCheck, Link as LinkIcon } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";
import { checkCodeChefUser, checkCodeforcesUser, checkLeetCodeUser, checkGitHubUser } from "@/actions/platform.action";
import Image from "next/image";
import { VerificationModal } from "@/components/settings/VerificationModal";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface FormData {
    leetCodeHandle: string;
    codeChefHandle: string;
    codeforcesHandle: string;
    githubHandle: string;
}

interface PlatformSettingsProps {
    user: {
        leetCodeHandle?: string | null;
        codeChefHandle?: string | null;
        codeforcesHandle?: string | null;
        githubHandle?: string | null;
        leetCodeVerified?: boolean;
        codeChefVerified?: boolean;
        codeforcesVerified?: boolean;
    };
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
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const isSaved = (value === initialValue && !!value);
    const debouncedValue = useDebounce(value, 500);

    const requestCounter = useRef(0);

    const checkHandle = useCallback(async (currentValue: string, requestId: number) => {
        if (!currentValue) {
            setIsValid(null);
            return;
        }
        setIsChecking(true);
        try {
            let res;
            if (id === "codeChefHandle") res = await checkCodeChefUser(currentValue);
            else if (id === "codeforcesHandle") res = await checkCodeforcesUser(currentValue);
            else if (id === "leetCodeHandle") res = await checkLeetCodeUser(currentValue);
            else if (id === "githubHandle") res = await checkGitHubUser(currentValue);

            // Only update if this is still the latest request
            if (requestId === requestCounter.current) {
                setIsValid(res?.success || false);
            }
        } catch (error) {
            if (requestId === requestCounter.current) {
                setIsValid(false);
            }
        } finally {
            if (requestId === requestCounter.current) {
                setIsChecking(false);
            }
        }
    }, [id]);

    useEffect(() => {
        if (debouncedValue && debouncedValue !== initialValue) {
            const requestId = ++requestCounter.current;
            checkHandle(debouncedValue, requestId);
        } else if (debouncedValue === initialValue) {
            setIsValid(true);
        } else {
            setIsValid(null);
        }
    }, [debouncedValue, initialValue, checkHandle]);

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
                    <div className="flex-1 flex items-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-lg px-3 overflow-hidden relative">
                        {urlPrefix && <span className="text-gray-400 text-sm whitespace-nowrap mr-1">{urlPrefix}</span>}
                        <input
                            {...register(id)}
                            className="flex-1 py-2 bg-transparent border-none outline-none text-sm"
                            placeholder={placeholder}
                        />
                        {/* Status Icon inside input */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             {isChecking ? (
                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            ) : value ? (
                                isValid === true ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : isValid === false ? (
                                    <X className="w-4 h-4 text-red-500" />
                                ) : null
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
                        className="px-4 py-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-sm font-medium rounded-lg transition-colors min-w-[80px] disabled:opacity-50"
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
                         <button className="px-4 py-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-sm font-medium rounded-lg">
                            Connected as {user.githubHandle || watch("githubHandle")}
                         </button>
                    ) : (
                        <button
                            onClick={async () => {
                                const { authClient } = await import("@/lib/auth-client");
                                await authClient.signIn.social({
                                    provider: "github",
                                    callbackURL: window.location.href
                                });
                            }}
                            className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
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

"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Suspense } from "react";
import { checkEmailExists, setPasswordForUser } from "@/actions/auth";

function SignUpContent() {
    const [step, setStep] = useState<"email" | "otp" | "details" | "set-password">("email");
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // Form data
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, isPending } = authClient.useSession();
    
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (session) {
            const url = searchParams.get("callbackUrl") || "/";
            router.replace(url);
        }
    }, [session, router, searchParams]);

    const handleSignInSocial = async (provider: "google" | "microsoft") => {
        setLoading(provider);
        setError(null);
        const callbackUrl = searchParams.get("callbackUrl") || "/onboarding?welcome=true";

        await authClient.signIn.social({
            provider,
            callbackURL: callbackUrl,
            requestSignUp: true,
        }, {
            onSuccess: () => {
                toast.success("Signed in successfully");
            },
            onError: (ctx) => {
                if (ctx.error.status === 403 || ctx.error.message?.toLowerCase().includes("cancel")) {
                    setLoading(null);
                    return;
                }
                toast.error(ctx.error.message || "An error occurred during sign up");
                setLoading(null);
            }
        });
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading("otp");
        setError(null);

        const existsResult = await checkEmailExists(email);
        setIsExistingUser(existsResult.exists);
        if (existsResult.exists && existsResult.hasPassword) {
            setError("Account already exists with a password. Please sign in.");
            setLoading(null);
            return;
        }

        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification"
        });

        setLoading(null);
        if (error) {
            setError(error.message || "Failed to send OTP");
            toast.error(error.message || "Failed to send OTP");
        } else {
            toast.success("OTP sent to your email!");
            setStep("otp");
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length !== 6) return;
        
        setLoading("verify");
        setError(null);

        // Always verify via email-verification
        const { error } = await authClient.emailOtp.checkVerificationOtp({
            email,
            otp: otpString,
            type: "email-verification"
        });

        setLoading(null);
        if (error) {
            setError("Invalid OTP. Please try again.");
            toast.error("Invalid OTP");
        } else {
            toast.success("Email verified!");
            setStep(isExistingUser ? "set-password" : "details");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!firstName || !username || !password) {
            setError("Please fill in all required fields");
            return;
        }
        
        setLoading("signup");
        setError(null);

        const name = lastName ? `${firstName} ${lastName}` : firstName;
        const callbackUrl = searchParams.get("callbackUrl") || "/onboarding?welcome=true";

        const { error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: callbackUrl
            // Additional fields can be passed if your auth client supports it:
            // username,
        });

        setLoading(null);
        if (error) {
            setError(error.message || "Failed to sign up");
            toast.error(error.message || "Failed to sign up");
        } else {
            toast.success("Account created successfully!");
            router.push(callbackUrl);
        }
    };

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!password) {
            setError("Please fill in all required fields");
            return;
        }

        setLoading("set-password");
        setError(null);

        try {
            const result = await setPasswordForUser(email, password);
            if (result.success) {
                // Now that password is set, log them in
                await authClient.signIn.email({
                    email,
                    password
                });
                toast.success("Password set and signed in successfully!");
                const callbackUrl = searchParams.get("callbackUrl") || "/onboarding?welcome=true";
                router.push(callbackUrl);
            }
        } catch (err: any) {
            setError(err.message || "Failed to set password");
            toast.error(err.message || "Failed to set password");
        } finally {
            setLoading(null);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return;
        
        const newOtp = [...otp];
        // Handle paste
        if (value.length > 1) {
            const pasted = value.slice(0, 6).split('');
            for (let i = 0; i < pasted.length; i++) {
                if (index + i < 6) newOtp[index + i] = pasted[i];
            }
            setOtp(newOtp);
            const focusIndex = Math.min(index + pasted.length, 5);
            otpRefs.current[focusIndex]?.focus();
            return;
        }

        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (session) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-[#1D1E23]">
            <div className="absolute top-8 left-8 z-20">
                <Link href="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back
                </Link>
            </div>

            <div className="w-full max-w-[480px] border border-gray-200 dark:border-white/10 rounded-xl p-8 bg-white dark:bg-[#1D1E23] shadow-sm z-10 relative overflow-hidden">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {step === "email" && "Sign up"}
                            {step === "otp" && "Verify Email"}
                            {step === "details" && "Enter Details"}
                            {step === "set-password" && "Set Password"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Already have an account? <Link href="/signin" className="text-blue-500 font-medium hover:underline">Sign in here</Link>
                        </p>
                    </div>

                    <div className="w-full h-[1px] bg-gray-100 dark:bg-white/10 my-6"></div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {step === "email" && (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                Enter your email address to receive a one-time password (OTP) for verification.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                We will send you an OTP to the provided email address. Please check your inbox (or spam folder) and enter the OTP to verify your email.
                            </p>
                            
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email Address"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!!loading || !email}
                                className="w-full py-3 px-4 bg-[#F07D0B] hover:bg-[#D96B00] text-white font-medium rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading === "otp" ? "Sending..." : "Send OTP"}
                            </button>
                        </form>
                    )}

                    {step === "otp" && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div className="flex justify-center gap-2 sm:gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { otpRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                ))}
                            </div>
                            
                            <div className="text-center">
                                <button type="button" onClick={handleSendOTP} className="text-blue-500 text-sm hover:underline">
                                    Resend OTP
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={!!loading || otp.join("").length !== 6}
                                className="w-full py-3 px-4 bg-[#F07D0B] hover:bg-[#D96B00] text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading === "verify" ? "Verifying..." : "Verify"}
                            </button>
                            
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Please check your spam folder in case you don't receive the OTP!
                            </p>
                        </form>
                    )}

                    {step === "details" && (
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">&nbsp;</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        required
                                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!!loading}
                                className="w-full py-3 px-4 bg-[#F07D0B] hover:bg-[#D96B00] text-white font-medium rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading === "signup" ? "Signing up..." : "Sign up"}
                            </button>
                        </form>
                    )}

                    {step === "set-password" && (
                        <form onSubmit={handleSetPassword} className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                You are already logged in via OAuth. Please set a password to easily login with your email next time.
                            </p>
                            
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        required
                                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!!loading}
                                className="w-full py-3 px-4 bg-[#F07D0B] hover:bg-[#D96B00] text-white font-medium rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading === "set-password" ? "Saving..." : "Set Password"}
                            </button>
                        </form>
                    )}

                    <div className="relative flex items-center justify-center my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative bg-white dark:bg-[#1D1E23] px-4 text-sm text-gray-500 font-medium">
                            Or continue with
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => handleSignInSocial("google")}
                            disabled={!!loading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-[#2A2B32]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">Sign in with Google</span>
                        </button>

                        <button
                            onClick={() => handleSignInSocial("microsoft")}
                            disabled={!!loading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-[#2A2B32]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
                                <path fill="#f35325" d="M1 1h10v10H1z" />
                                <path fill="#81bc06" d="M12 1h10v10H12z" />
                                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                                <path fill="#ffba08" d="M12 12h10v10H12z" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">Sign in with Microsoft</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function SignUp() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SignUpContent />
        </Suspense>
    );
}

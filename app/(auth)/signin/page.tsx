"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { checkEmailExists } from "@/actions/auth";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Suspense } from "react";

function SignInContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailLocked, setEmailLocked] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "AccessDenied") {
        setError("Your account has been blocked or access is denied.");
    } else if (errorParam) {
        setError("Authentication failed: " + errorParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (session) {
      const url = searchParams.get("callbackUrl") || "/";
      router.replace(url);
    }
  }, [session, router, searchParams]);

  const handleSignInEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailLocked) {
      if (email) {
        setLoading("email");
        setError(null);
        try {
          const res = await checkEmailExists(email);
          if (!res.exists) {
            setError("Email/User does not exist.");
            setLoading(null);
            return;
          }
          setEmailLocked(true);
        } catch (err) {
          setError("Failed to verify email.");
        } finally {
          setLoading(null);
        }
      }
      return;
    }

    if (!email || !password) return;

    setLoading("email");
    setError(null);
    const callbackUrl = searchParams.get("callbackUrl") || "/onboarding?welcome=true";

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl
    });

    if (error) {
      setError(error.message || "Invalid credentials");
      toast.error(error.message || "Invalid credentials");
      setLoading(null);
    } else {
      toast.success("Signed in successfully");
      router.push(callbackUrl);
    }
  };

  const handleSignInSocial = async (provider: "google" | "microsoft") => {
    setLoading(provider);
    setError(null);
    const callbackUrl = searchParams.get("callbackUrl") || "/onboarding?welcome=true";

    await authClient.signIn.social({
      provider,
      callbackURL: callbackUrl,
    }, {
      onSuccess: () => {
        toast.success("Signed in successfully");
      },
      onError: (ctx) => {
        if (ctx.error.status === 403 || ctx.error.message?.toLowerCase().includes("cancel")) {
          setLoading(null);
          return;
        }

        const message = ctx.error.message?.toLowerCase();
        toast.error(ctx.error.message || "An error occurred during sign in");
        setLoading(null);
      }
    });
  };

  if (!mounted || isPending) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1D1E23] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session) {
    return null;
  }

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Sign in</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account yet? <Link href="/signup" className="text-blue-500 font-medium hover:underline">Sign up here</Link>
            </p>
          </div>

          <div className="w-full h-[1px] bg-gray-100 dark:bg-white/10 my-6"></div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm text-center border border-red-100 dark:border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSignInEmail} className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address <span className="text-red-500">*</span>
                </label>
                {emailLocked && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmailLocked(false);
                      setPassword("");
                    }}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Change
                  </button>
                )}
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
                disabled={emailLocked}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-[#1D1E23]"
              />
            </div>

            {emailLocked && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    autoFocus
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
            )}

            <button
              type="submit"
              disabled={!!loading || (!emailLocked ? !email : !password)}
              className="w-full py-3 px-4 bg-[#F07D0B] hover:bg-[#D96B00] text-white font-medium rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {!emailLocked ? "Continue" : (loading === "email" ? "Signing in..." : "Sign in")}
            </button>
          </form>

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

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#1D1E23] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

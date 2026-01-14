"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeftIcon } from "lucide-react";
import { Suspense } from "react";

function SignInContent() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const searchParams = useSearchParams();

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
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleSignIn = async (provider: "google" | "microsoft") => {
    setLoading(provider);
    setError(null);
    await authClient.signIn.social({
      provider,
      callbackURL: "/onboarding?welcome=true",
    }, {
      onSuccess: () => {
        toast.success("Signed in successfully");
      },
      onError: (ctx) => {
        if (ctx.error.status === 403 || ctx.error.message.toLowerCase().includes("cancel")) {
          setLoading(null);
          return;
        }
        toast.error(ctx.error.message);
        setLoading(null);
      }
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium">
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4 mt-8">
          <button
            onClick={() => handleSignIn("google")}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
          >
            {loading === "google" ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (

              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFFFFF" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FFFFFF" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FFFFFF" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#FFFFFF" />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleSignIn("microsoft")}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {loading === "microsoft" ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              // Microsoft Icon SVG
              <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
                <path fill="#FFFFFF" d="M0 0h11v11H0z" />
                <path fill="#FFFFFF" d="M12 0h11v11H12z" />
                <path fill="#FFFFFF" d="M0 12h11v11H0z" />
                <path fill="#FFFFFF" d="M12 12h11v11H12z" />
              </svg>
            )}
            <span>Continue with Microsoft</span>
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

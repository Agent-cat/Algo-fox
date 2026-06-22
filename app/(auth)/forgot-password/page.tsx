"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeftIcon } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to send reset email");
    } else {
      toast.success("Password reset email sent");
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-white dark:bg-[#1D1E23]">
      <div className="absolute top-8 left-8 z-20">
        <Link href="/signin" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to sign in
        </Link>
      </div>

      <div className="w-full max-w-[480px] border border-gray-200 dark:border-white/10 rounded-xl p-8 bg-white dark:bg-[#1D1E23] shadow-sm z-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Reset Password</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="w-full h-[1px] bg-gray-100 dark:bg-white/10 my-6"></div>

          {success ? (
            <div className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-xl text-sm text-center border border-green-100 dark:border-green-500/20">
              Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 px-4 bg-[#F07D0B] hover:bg-[#D96B00] text-white font-medium rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending link..." : "Send reset link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

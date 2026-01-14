'use client';

import { useEffect } from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  if (error.message?.toLowerCase().includes("banned")) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="text-center max-w-lg w-full">
            <div className="relative mb-8 mx-auto w-32 h-32">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-50"></div>
              <div className="relative z-10 w-32 h-32 bg-red-50 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Account Suspended</h1>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-red-800 font-semibold mb-2">Access Restricted</h3>
              <p className="text-red-700/80 text-sm leading-relaxed">
                {error.message || "Your account has been suspended."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-8">
          We encountered an unexpected error. Please try again or return to the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-8 text-left bg-gray-50 rounded-xl p-4">
            <summary className="text-sm font-medium text-gray-700 cursor-pointer">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

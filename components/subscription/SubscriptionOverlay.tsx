"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubscriptionOverlayProps {
  title: string;
  description: string;
}

export default function SubscriptionOverlay({ title, description }: SubscriptionOverlayProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
      {/* Dimmed Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm"
      />

      {/* Clean Light/Dark Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-[420px] bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl p-10 text-center shadow-2xl"
      >
        {/* Close Button */}
        <button
            onClick={() => router.back()}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
            <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/10">
                <Lock className="w-8 h-8 text-orange-500" />
            </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 mb-10">
            <div className="flex flex-col items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] border border-orange-200 dark:border-orange-500/10">

                    Premium Plus
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    {title}
                </h2>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-2 font-medium">
                {description}
            </p>
        </div>

        {/* CTA Stack */}
        <div className="flex flex-col gap-3">
            <Link href="/subscription" className="w-full">
                <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98]">
                    Unlock Premium Now
                    <ChevronRight className="w-4 h-4" />
                </button>
            </Link>

            <button
                onClick={() => router.back()}
                className="w-full py-4 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm transition-colors"
            >
                Not right now
            </button>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-white dark:bg-[#1D1E23] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Banner container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-[#FF7A00] to-red-600 rounded-[32px] p-8 sm:p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl shadow-orange-500/20"
        >
          {/* Abstract glows */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-white/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[100%] bg-black/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Banner content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Get started instantly</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Ready to Level Up Your Coding Journey?
            </h2>

            <p className="text-sm sm:text-base text-orange-50/80 max-w-lg font-semibold leading-relaxed">
              Create your unified portfolio, join coding contests, and master DSA & SQL sheets today. Join thousands of developers on Algo-fox.
            </p>

            <Link
              href="/signup"
              className="mt-4 flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 active:scale-95 text-sm sm:text-base font-extrabold rounded-2xl transition-all shadow-xl shadow-black/10"
            >
              Start Practicing Now
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

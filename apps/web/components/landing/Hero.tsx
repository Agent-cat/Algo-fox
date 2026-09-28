"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Trophy, Flame } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Simple floating animation helper
const floatingAnimation = (delay = 0, duration = 6) => ({
  animate: {
    y: [0, -15, 0],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

export default function Hero() {
  const floatingBadges = [
    { name: "LeetCode", icon: "/icons/fox.png", color: "from-yellow-500 to-amber-600", delay: 0, x: "-10%", y: "15%" },
    { name: "Codeforces", icon: "/icons/fox.png", color: "from-blue-500 to-indigo-600", delay: 1, x: "105%", y: "10%" },
    { name: "CodeChef", icon: "/icons/fox.png", color: "from-amber-700 to-amber-900", delay: 2, x: "-12%", y: "65%" },
    { name: "GitHub", icon: "/icons/fox.png", color: "from-neutral-800 to-neutral-950", delay: 3, x: "102%", y: "70%" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center py-20 lg:py-32 overflow-hidden bg-white dark:bg-[#1D1E23]">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 relative z-10">
        
        {/* Left Column (Text & CTAs) */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="flex flex-col gap-6"
          >
            {/* Tagline Badge */}
            <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>Scale your interview prep</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tight leading-[1.08] text-gray-900 dark:text-white">
              Track, Practice & <br className="hidden sm:inline" />
              Become <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">Interview Ready</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
              Algo-fox aggregates your coding metrics across LeetCode, Codeforces, and GitHub into a single premium developer profile. Solve DSA & SQL interactive tasks in real time.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as const }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 w-full sm:w-auto group"
            >
              Start Practicing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center px-8 py-4 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 active:scale-95 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 font-bold rounded-2xl transition-all w-full sm:w-auto"
            >
              Explore Features
            </button>
          </motion.div>
        </div>

        {/* Right Column (Floating Dashboard Mockup) */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="relative w-full max-w-[500px] aspect-[4/3] bg-white dark:bg-[#23242A] rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-2xl p-6 flex flex-col gap-6"
          >
            {/* Window controls */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-400 font-mono">dashboard.algofox.in</span>
            </div>

            {/* Dashboard Mock Grid */}
            <div className="grid grid-cols-3 gap-4 flex-1">
              
              {/* Left Widget: Solved Stats */}
              <div className="col-span-2 bg-gray-50 dark:bg-white/3 rounded-2xl p-4 flex flex-col justify-between border border-gray-100 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Solved</span>
                  <Code2 className="w-4 h-4 text-orange-500" />
                </div>
                <div className="my-2">
                  <div className="text-3xl font-black text-gray-900 dark:text-white">682</div>
                  <div className="text-[10px] text-green-500 font-bold mt-1">▲ 24% this month</div>
                </div>
                {/* Simulated line bar */}
                <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[70%]" />
                </div>
              </div>

              {/* Right Widget: Streak */}
              <div className="col-span-1 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white flex flex-col justify-between shadow-lg shadow-orange-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-80">Streak</span>
                  <Flame className="w-4 h-4 text-white fill-current" />
                </div>
                <div>
                  <div className="text-3xl font-black">28</div>
                  <span className="text-[10px] font-bold opacity-95">Days Active</span>
                </div>
              </div>

              {/* Bottom Widget: Contest Rating */}
              <div className="col-span-3 bg-gray-50 dark:bg-white/3 rounded-2xl p-4 flex flex-col justify-between border border-gray-100 dark:border-white/5">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-2 mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contest Rating Graph</span>
                  <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>2,142</span>
                  </div>
                </div>
                {/* SVG Graph representation */}
                <div className="h-16 w-full flex items-end">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d="M0 25 Q15 20, 30 18 T60 12 T90 4 T100 2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0 25 Q15 20, 30 18 T60 12 T90 4 T100 2 L100 30 L0 30 Z"
                      fill="url(#grad)"
                      className="opacity-15"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Floating Platform Cards */}
          {floatingBadges.map((badge) => (
            <motion.div
              key={badge.name}
              {...floatingAnimation(badge.delay * 0.7, 5.5)}
              style={{
                position: "absolute",
                left: badge.x,
                top: badge.y,
              }}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-[#2A2B32] border border-gray-200/80 dark:border-white/5 shadow-xl rounded-2xl cursor-pointer hover:border-orange-500/30 hover:scale-105 transition-all"
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center text-white text-[10px] font-black uppercase`}>
                {badge.name === "GitHub" ? <GithubIcon className="w-3.5 h-3.5" /> : badge.name.charAt(0)}
              </div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{badge.name}</span>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

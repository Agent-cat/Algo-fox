"use client";

import { motion } from "framer-motion";
import { Filter, CheckCircle2, Play, ChevronRight, Terminal, Award, FileCode } from "lucide-react";

export default function Workspace() {
  const mockProblems = [
    { title: "Two Sum", difficulty: "Easy", status: "Solved", tag: "Arrays", accepts: "48.2%" },
    { title: "Longest Substring Without Repeating...", difficulty: "Medium", status: "Solved", tag: "Hash Table", accepts: "33.8%" },
    { title: "Merge k Sorted Lists", difficulty: "Hard", status: "Unsolved", tag: "Divide & Conquer", accepts: "40.1%" },
    { title: "Edit Distance", difficulty: "Hard", status: "Solved", tag: "Dynamic Programming", accepts: "52.4%" },
    { title: "Binary Tree Inorder Traversal", difficulty: "Easy", status: "Solved", tag: "Trees", accepts: "68.5%" },
  ];

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-[#1b1c21] border-y border-gray-100 dark:border-white/5 relative overflow-hidden">
      
      {/* Decorative Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left: Feature Explanation */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive IDE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Simplify Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Coding Prep Work</span>
          </h2>

          <p className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Write, compile and submit your solutions directly in our full-featured online workspace. Filters let you isolate tags, focus on target companies, and track your solution status.
          </p>

          {/* Quick bullet points */}
          <div className="flex flex-col gap-4 mt-2">
            {[
              "Multi-language support (C++, Java, Python, Go, Rust)",
              "Live compiler feedback with detailed stderr/stdout analysis",
              "Custom testcases panel with performance benchmarks",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Workspace Mockup */}
        <div className="lg:col-span-7 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[620px] bg-white dark:bg-[#23242A] rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col h-[400px]"
          >
            {/* Header / Tabs */}
            <div className="bg-gray-50 dark:bg-white/3 border-b border-gray-100 dark:border-white/5 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCode className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">DSA Workspace</span>
              </div>
              
              {/* Fake Filters */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#2A2B32] border border-gray-200/50 dark:border-white/5 rounded-lg text-[10px] font-bold text-gray-500 dark:text-gray-400 hover:border-orange-500/20 transition-all">
                  <Filter className="w-3 h-3 text-orange-500" />
                  Filter Tags
                </button>
                <div className="w-[80px] bg-gray-250 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[65%]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">65% Done</span>
              </div>
            </div>

            {/* Mock Problem List */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 custom-scrollbar">
              {mockProblems.map((prob, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-gray-50 dark:bg-[#2A2B32] dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-orange-500/10 dark:hover:border-orange-500/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status checkmark */}
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${prob.status === "Solved" ? "text-green-500" : "text-gray-300 dark:text-white/10"}`}
                    />
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-2">
                      {prob.title}
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200/40 dark:border-white/5 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                      {prob.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Acceptance */}
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
                      {prob.accepts}
                    </span>

                    {/* Difficulty Tag */}
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide ${
                      prob.difficulty === "Easy" ? "bg-green-50 dark:bg-green-500/10 text-green-500 border border-green-500/20" :
                      prob.difficulty === "Medium" ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                      "bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}>
                      {prob.difficulty}
                    </span>

                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Run Footer Console */}
            <div className="bg-gray-50 dark:bg-white/3 border-t border-gray-100 dark:border-white/5 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 font-mono">Terminal active</span>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[11px] font-bold rounded-xl transition-all shadow-md shadow-orange-500/10">
                <Play className="w-3 h-3 fill-current" />
                Run Code
              </button>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

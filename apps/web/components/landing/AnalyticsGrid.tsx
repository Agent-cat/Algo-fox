"use client";

import { motion } from "framer-motion";
import { BarChart3, PieChart, Sparkles, Award, Flame, Calendar, BookOpen, BrainCircuit } from "lucide-react";

export default function AnalyticsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  // Generate a mock heatmap grid (7 days x 20 weeks)
  const heatmapCells = Array.from({ length: 140 }, (_, idx) => {
    // Randomize activity levels: 0 (none), 1 (light), 2 (medium), 3 (dense)
    const val = idx % 11 === 0 ? 3 : idx % 7 === 0 ? 2 : idx % 3 === 0 ? 1 : 0;
    return val;
  });

  return (
    <section className="py-24 bg-white dark:bg-[#1D1E23] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Developer Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Your All-in-One <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Coding Portfolio</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Everything you achieve on Algo-fox, LeetCode, and other platforms, aggregated into a cohesive interactive dashboard.
          </p>
        </div>

        {/* Dashboard Analytics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          
          {/* Card 1: Solved Questions Stats (4 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-gray-50/50 dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between h-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Solved Questions</span>
              <BookOpen className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className="text-5xl font-black text-gray-900 dark:text-white">1,010</div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1">Across all synced platforms</p>
            </div>
            <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-white/5 pt-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-green-500">Easy (400)</span>
                <span className="text-gray-700 dark:text-gray-300">40%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-yellow-500">Medium (500)</span>
                <span className="text-gray-700 dark:text-gray-300">50%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-red-500">Hard (110)</span>
                <span className="text-gray-700 dark:text-gray-300">10%</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Contest Rating (4 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-gray-50/50 dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between h-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Global Contest Rating</span>
              <BarChart3 className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className="text-5xl font-black text-gray-900 dark:text-white">2,348</div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase mt-2">
                Guardian Rank
              </span>
            </div>
            <div className="border-t border-gray-100 dark:border-white/5 pt-4">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-gray-500 mb-1">
                <span>Percentile</span>
                <span>Top 0.8%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[92%]" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Language Usage (4 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-gray-50/50 dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between h-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Language Usage</span>
              <PieChart className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex flex-col gap-3">
              {[
                { lang: "C++", percent: 62, color: "bg-blue-500" },
                { lang: "Python", percent: 28, color: "bg-yellow-500" },
                { lang: "SQL", percent: 10, color: "bg-green-500" },
              ].map((item) => (
                <div key={item.lang} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                    <span>{item.lang}</span>
                    <span>{item.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-150 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Heatmap (8 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-8 bg-gray-50/50 dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Coding Heatmap (Last 12 Months)</span>
              <Calendar className="w-4 h-4 text-orange-500" />
            </div>
            {/* Heatmap Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1 flex-1 items-center justify-center overflow-x-auto py-2">
              {heatmapCells.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-colors ${
                    val === 3 ? "bg-orange-600 dark:bg-orange-500" :
                    val === 2 ? "bg-orange-400 dark:bg-orange-400/70" :
                    val === 1 ? "bg-orange-200 dark:bg-orange-500/30" :
                    "bg-gray-200/60 dark:bg-white/5"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4 text-[10px] font-bold text-gray-400 dark:text-gray-500">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-gray-250 dark:bg-white/5" />
                <span className="w-2.5 h-2.5 rounded bg-orange-200 dark:bg-orange-500/30" />
                <span className="w-2.5 h-2.5 rounded bg-orange-400 dark:bg-orange-400/70" />
                <span className="w-2.5 h-2.5 rounded bg-orange-600 dark:bg-orange-500" />
              </div>
              <span>More</span>
            </div>
          </motion.div>

          {/* Card 5: Badges & Streak (4 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-gray-50/50 dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between h-[220px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Active Badges</span>
              <Award className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex items-center justify-around py-2">
              {[
                { label: "Knight", color: "from-amber-400 to-yellow-600" },
                { label: "50 Days", color: "from-red-500 to-rose-600" },
                { label: "SQL Pro", color: "from-blue-500 to-indigo-600" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} shadow-lg flex items-center justify-center text-white text-[10px] font-extrabold rotate-12`}>
                    ★
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{badge.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4 text-xs font-bold text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500 fill-current" />
                <span>Max Streak: 94 days</span>
              </div>
              <span className="text-orange-500">Level 42</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

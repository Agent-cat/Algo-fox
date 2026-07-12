"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter, Clock, Bell, ExternalLink, Trophy } from "lucide-react";

export default function ContestCalendar() {
  const [filter, setFilter] = useState("All");

  const contests = [
    { name: "LeetCode Weekly Contest 412", platform: "LeetCode", time: "Starts in 1d 4h", date: "July 13, 2026", duration: "1.5 Hrs", isRegistered: true },
    { name: "Codeforces Round 954 (Div. 2)", platform: "Codeforces", time: "Starts in 2d 12h", date: "July 14, 2026", duration: "2 Hrs", isRegistered: false },
    { name: "CodeChef Starters 142", platform: "CodeChef", time: "Starts in 3d 16h", date: "July 15, 2026", duration: "2.5 Hrs", isRegistered: false },
    { name: "AtCoder Beginner Contest 361", platform: "AtCoder", time: "Starts in 5d 2h", date: "July 17, 2026", duration: "1.6 Hrs", isRegistered: false },
  ];

  const filteredContests = filter === "All" ? contests : contests.filter((c) => c.platform === filter);

  return (
    <section className="py-24 bg-white dark:bg-[#1D1E23] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>Compete live</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Never Miss a <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Coding Contest</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Aggregated global coding calendar with automatic time adjustments and registration reminders.
          </p>
        </div>

        {/* Platform Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {["All", "LeetCode", "Codeforces", "CodeChef", "AtCoder"].map((plat) => (
            <button
              key={plat}
              onClick={() => setFilter(plat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                filter === plat
                  ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/15"
                  : "bg-white dark:bg-[#23242A] border-gray-200/60 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:border-orange-500/20"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Contest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredContests.map((contest, idx) => (
            <motion.div
              key={contest.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between gap-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-orange-500 flex-shrink-0" />
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {contest.platform}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-950 dark:text-white line-clamp-2">
                    {contest.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 border border-orange-200/20 dark:border-orange-500/10 px-2.5 py-1 rounded-lg flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{contest.time}</span>
                </div>
              </div>

              {/* Contest Metadata */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{contest.date}</span>
                  </div>
                  <span>•</span>
                  <span>{contest.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-150 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5 rounded-xl transition-all">
                    <Bell className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm shadow-orange-500/10">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Register
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

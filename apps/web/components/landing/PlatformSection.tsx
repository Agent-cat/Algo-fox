"use client";

import { motion } from "framer-motion";
import { Code2, Database, Terminal, Cpu, GitFork, Award, Globe } from "lucide-react";

export default function PlatformSection() {
  const platforms = [
    {
      name: "LeetCode",
      desc: "Top DSA platform with interviews prep",
      icon: Code2,
      color: "text-amber-500",
      bgGlow: "group-hover:shadow-amber-500/10",
      accent: "bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Codeforces",
      desc: "Best for competitive algorithms",
      icon: Cpu,
      color: "text-blue-500",
      bgGlow: "group-hover:shadow-blue-500/10",
      accent: "bg-blue-500/10 border-blue-500/20",
    },
    {
      name: "CodeChef",
      desc: "Excellent monthly coding contests",
      icon: Terminal,
      color: "text-yellow-600",
      bgGlow: "group-hover:shadow-yellow-600/10",
      accent: "bg-yellow-600/10 border-yellow-600/20",
    },
    {
      name: "AtCoder",
      desc: "High quality Japanese contests",
      icon: Globe,
      color: "text-neutral-500",
      bgGlow: "group-hover:shadow-neutral-500/10",
      accent: "bg-neutral-500/10 border-neutral-500/20",
    },
    {
      name: "GeeksForGeeks",
      desc: "The encyclopedia of coding topics",
      icon: Database,
      color: "text-green-600",
      bgGlow: "group-hover:shadow-green-600/10",
      accent: "bg-green-600/10 border-green-600/20",
    },
    {
      name: "HackerRank",
      desc: "Standard assessments & interview prep",
      icon: Award,
      color: "text-emerald-500",
      bgGlow: "group-hover:shadow-emerald-500/10",
      accent: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "GitHub",
      desc: "Code repositories and contributions",
      icon: GitFork,
      color: "text-neutral-900 dark:text-white",
      bgGlow: "group-hover:shadow-neutral-950/10",
      accent: "bg-neutral-950/10 border-neutral-800/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-[#1b1c21] border-y border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Your Favorite <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Coding Platforms</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Sync, track and showcase your profiles from the leading coding platforms on a single unified portfolio.
          </p>
        </div>

        {/* Platform Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4"
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                variants={itemVariants}
                className={`group relative bg-white dark:bg-[#23242A] p-5 rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl ${platform.bgGlow} hover:-translate-y-1 hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col gap-4 items-center text-center cursor-pointer`}
              >
                {/* Platform Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platform.accent} ${platform.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-bold text-gray-950 dark:text-white text-sm group-hover:text-orange-500 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-[11px] leading-normal text-gray-400 dark:text-gray-500 mt-1.5 font-medium px-1">
                    {platform.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

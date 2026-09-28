"use client";

import { motion } from "framer-motion";
import { Sparkles, Building2, Flame } from "lucide-react";

export default function CompanySheets() {
  const companies = [
    { name: "Google", questions: 180, easy: 40, medium: 100, hard: 40, color: "from-blue-500 to-red-500", progress: 65 },
    { name: "Amazon", questions: 240, easy: 60, medium: 140, hard: 40, color: "from-orange-400 to-amber-600", progress: 45 },
    { name: "Microsoft", questions: 210, easy: 50, medium: 120, hard: 40, color: "from-teal-500 to-blue-600", progress: 80 },
    { name: "Atlassian", questions: 130, easy: 30, medium: 80, hard: 20, color: "from-sky-500 to-blue-700", progress: 30 },
    { name: "Uber", questions: 140, easy: 20, medium: 90, hard: 30, color: "from-black to-zinc-800", progress: 50 },
    { name: "Adobe", questions: 160, easy: 50, medium: 90, hard: 20, color: "from-red-500 to-red-700", progress: 70 },
    { name: "Goldman Sachs", questions: 150, easy: 40, medium: 90, hard: 20, color: "from-yellow-600 to-amber-800", progress: 20 },
    { name: "Flipkart", questions: 170, easy: 30, medium: 110, hard: 30, color: "from-blue-600 to-sky-400", progress: 55 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="features" className="py-24 bg-white dark:bg-[#1D1E23] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Targeted Interview Prep</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Explore <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Company Prep Sheets</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Curated list of problems asked in top tech companies, sorted by difficulty and categorized for optimal revision.
          </p>
        </div>

        {/* Company Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              variants={itemVariants}
              className="group bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col justify-between h-[260px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/5 to-transparent blur-md rounded-bl-full pointer-events-none group-hover:from-orange-500/10 transition-colors" />

              {/* Company Logo Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-base font-black`}>
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-950 dark:text-white text-base group-hover:text-orange-500 transition-colors">
                      {company.name}
                    </h3>
                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
                      {company.questions} Questions
                    </span>
                  </div>
                </div>

                {/* Progress Circle Ring */}
                <div className="relative w-9 h-9 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100 dark:stroke-white/5" strokeWidth="2.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-orange-500"
                      strokeWidth="2.5"
                      strokeDasharray="100"
                      strokeDashoffset={100 - company.progress}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-black text-gray-700 dark:text-gray-300">
                    {company.progress}%
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex flex-col gap-1.5 my-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 dark:text-gray-500">
                  <span>Completed</span>
                  <span>{Math.round(company.questions * (company.progress / 100))}/{company.questions}</span>
                </div>
                <div className="w-full bg-gray-150 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full transition-all duration-1000" style={{ width: `${company.progress}%` }} />
                </div>
              </div>

              {/* Difficulty Distribution */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-green-500 uppercase tracking-wide">Easy</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white mt-0.5">{company.easy}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-wide">Medium</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white mt-0.5">{company.medium}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-wide">Hard</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white mt-0.5">{company.hard}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

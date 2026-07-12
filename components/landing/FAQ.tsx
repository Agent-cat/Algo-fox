"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What is Algo-fox?",
      a: "Algo-fox is a comprehensive platform designed to practice and master Data Structures, Algorithms, and SQL. It aggregates and displays your statistics from leading coding platforms (like LeetCode and Codeforces) into a single developer portfolio.",
    },
    {
      q: "How does the platform synchronization work?",
      a: "You can link your profiles by entering your usernames. Our backend automatically fetches your public statistics (questions solved, contest ratings, streaks) and displays them in a single dashboard.",
    },
    {
      q: "Can I run code directly on the platform?",
      a: "Yes! Algo-fox has a full online IDE/Compiler with support for over 10 programming languages, custom input panels, live test case verification, and precise timing reports.",
    },
    {
      q: "Is Algo-fox free to use?",
      a: "Yes, Algo-fox is free to practice coding, compile scripts, view company sheets, and track your streaks. We also offer institutional packages for classrooms and tests.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-[#1b1c21] border-y border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Title */}
        <div className="text-center mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>F.A.Q.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Frequently Asked <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#23242A] rounded-2xl border border-gray-200/60 dark:border-white/5 overflow-hidden shadow-sm transition-all hover:border-orange-500/20 dark:hover:border-orange-500/20"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none gap-4"
                >
                  <span className="text-sm sm:text-base font-extrabold text-gray-950 dark:text-white group-hover:text-orange-500 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-500" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-gray-500 dark:text-gray-400 font-medium border-t border-gray-100 dark:border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

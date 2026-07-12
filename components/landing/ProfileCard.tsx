"use client";

import { motion } from "framer-motion";
import { Award, Flame, Trophy, Share2, Globe } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProfileCard() {
  const socialIcons = [
    { icon: LinkedinIcon, color: "bg-blue-600 text-white", delay: 0, x: "-110%", y: "-10%" },
    { icon: TwitterIcon, color: "bg-sky-400 text-white", delay: 1, x: "120%", y: "20%" },
    { icon: GithubIcon, color: "bg-neutral-900 text-white", delay: 2, x: "-115%", y: "60%" },
    { icon: Globe, color: "bg-orange-500 text-white", delay: 3, x: "115%", y: "70%" },
  ];

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-[#1b1c21] border-y border-gray-100 dark:border-white/5 overflow-hidden relative">
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Sharing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Share Your <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">#AlgoFoxCard</span> Wherever You Want
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Generate and download a beautifully styled portfolio summary card to link in your resumes, LinkedIn updates, or Twitter bios.
          </p>
        </div>

        {/* Outer Floating orbits container */}
        <div className="relative w-full max-w-[380px] aspect-[3/4] flex items-center justify-center">
          
          {/* Main Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            className="w-full h-full bg-white dark:bg-[#23242A] rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Holographic header stripe */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500" />
            
            {/* Card Header: Avatar & Name */}
            <div className="flex flex-col items-center text-center mt-4 gap-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-0.5 shadow-lg shadow-orange-500/10">
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#23242A] flex items-center justify-center text-gray-800 dark:text-white text-2xl font-black">
                  AF
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-950 dark:text-white">Alex Mercer</h3>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-0.5 block">
                  Guardian • Level 42
                </span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 my-6 text-center">
              <div className="p-3 bg-gray-50 dark:bg-white/3 rounded-2xl border border-gray-100 dark:border-white/5">
                <Trophy className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
                <div className="text-base font-black text-gray-950 dark:text-white">2,348</div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500">Rating</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-white/3 rounded-2xl border border-gray-100 dark:border-white/5">
                <Award className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
                <div className="text-base font-black text-gray-950 dark:text-white">1,010</div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500">Solved</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-white/3 rounded-2xl border border-gray-100 dark:border-white/5">
                <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
                <div className="text-base font-black text-gray-950 dark:text-white">94d</div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500">Streak</span>
              </div>
            </div>

            {/* Platform Badges Row */}
            <div className="flex justify-around items-center border-t border-gray-100 dark:border-white/5 pt-5 pb-2">
              {["LeetCode", "Codeforces", "GitHub"].map((plat) => (
                <div key={plat} className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-orange-500 flex-shrink-0" />
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500">{plat}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Floating Social Icons orbiting */}
          {socialIcons.map((social) => {
            const Icon = social.icon;
            return (
              <motion.div
                key={social.color}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: social.delay * 0.8,
                }}
                style={{
                  position: "absolute",
                  left: social.x,
                  top: social.y,
                }}
                className={`w-10 h-10 rounded-2xl ${social.color} shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer`}
              >
                <Icon className="w-4.5 h-4.5" />
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

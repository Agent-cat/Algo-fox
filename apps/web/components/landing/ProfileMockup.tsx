"use client";

import { motion } from "framer-motion";
import { Award, Check, AlertCircle, RefreshCw, ChevronRight, ExternalLink } from "lucide-react";
import React from "react";

// Local Custom SVG Icons
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

// Cartoon Owl mascot wearing graduation cap and glasses
const OwlMascot = () => (
  <svg viewBox="0 0 200 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="100" cy="140" rx="60" ry="70" fill="#E08B3E" />
    <ellipse cx="100" cy="140" rx="45" ry="55" fill="#FFE5C4" />
    
    {/* Face feather arches */}
    <path d="M60 90 C70 70, 100 80, 100 95 C100 80, 130 70, 140 90" stroke="#96521A" strokeWidth="6" strokeLinecap="round" />
    
    {/* Eyes */}
    <circle cx="70" cy="105" r="22" fill="white" stroke="#96521A" strokeWidth="4" />
    <circle cx="70" cy="105" r="10" fill="#2E2E2E" />
    <circle cx="73" cy="102" r="3" fill="white" />
    
    <circle cx="130" cy="105" r="22" fill="white" stroke="#96521A" strokeWidth="4" />
    <circle cx="130" cy="105" r="10" fill="#2E2E2E" />
    <circle cx="133" cy="102" r="3" fill="white" />
    
    {/* Glasses frame */}
    <circle cx="70" cy="105" r="26" fill="none" stroke="#2C2C2C" strokeWidth="5" />
    <circle cx="130" cy="105" r="26" fill="none" stroke="#2C2C2C" strokeWidth="5" />
    <line x1="96" y1="105" x2="104" y2="105" stroke="#2C2C2C" strokeWidth="5" />
    
    {/* Beak */}
    <polygon points="100,114 93,124 107,124" fill="#E67E22" />

    {/* Graduation Cap */}
    {/* Skull cap */}
    <path d="M75,64 L125,64 L120,80 L80,80 Z" fill="#2C3E50" />
    {/* Diamond Board */}
    <polygon points="100,42 165,60 100,78 35,60" fill="#1A252F" />
    <polygon points="100,42 165,60 100,78 35,60" fill="none" stroke="#2C3E50" strokeWidth="2" />
    {/* Tassel */}
    <path d="M100,60 L50,66 L48,82" stroke="#E74C3C" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="44" y="82" width="8" height="12" fill="#F1C40F" rx="1" />

    {/* Belly Feathers */}
    <path d="M85,150 Q100,158 115,150" stroke="#E08B3E" strokeWidth="3" strokeLinecap="round" />
    <path d="M78,165 Q100,175 122,165" stroke="#E08B3E" strokeWidth="3" strokeLinecap="round" />
    <path d="M85,180 Q100,188 115,180" stroke="#E08B3E" strokeWidth="3" strokeLinecap="round" />
    
    {/* Feet */}
    <ellipse cx="80" cy="210" rx="12" ry="6" fill="#E67E22" />
    <ellipse cx="120" cy="210" rx="12" ry="6" fill="#E67E22" />
    
    {/* Wings */}
    <path d="M42,120 C24,135 28,175 44,185" stroke="#E08B3E" strokeWidth="8" strokeLinecap="round" />
    <path d="M158,120 C176,135 172,175 156,185" stroke="#E08B3E" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export default function ProfileMockup() {
  // Generate a mock submission activity grid (7 days x 35 columns)
  const heatmapGrid = Array.from({ length: 245 }, (_, idx) => {
    // Recreate Vishnu's dashboard activity levels (randomized light/medium orange blocks)
    return idx % 17 === 0 ? 3 : idx % 9 === 0 ? 2 : idx % 4 === 0 ? 1 : 0;
  });

  return (
    <section className="py-24 bg-white dark:bg-[#1D1E23] overflow-hidden relative border-b border-gray-150 dark:border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Title / Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-none">
            Track, analyze & share
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
            Algo-fox helps you navigate and track your coding journey to success
          </p>
          
          <div className="flex items-center gap-3 mt-4">
            <button className="px-5 py-2.5 bg-white dark:bg-[#2A2B32] border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-orange-500/25 transition-all shadow-sm">
              Profile Tracker
            </button>
            <button className="px-5 py-2.5 bg-[#FF7A00] hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center gap-1">
              Company-Wise Kit
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Layered Showcase Area */}
        <div className="w-full relative flex flex-col lg:flex-row items-center justify-center gap-8 pt-8">
          
          {/* 1. Owl Mascot (Left Peeking) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="hidden xl:block absolute left-[-60px] top-[10%] w-[150px] h-[180px] z-20 pointer-events-none"
          >
            <OwlMascot />
          </motion.div>

          {/* 2. Main Dashboard Recreated Mockup (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="w-full max-w-[840px] bg-white dark:bg-[#23242A] rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-12 z-10"
          >
            {/* Mock Header Row */}
            <div className="col-span-12 border-b border-gray-100 dark:border-white/5 px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-white/3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500">profile.algofox.in/vishnu</div>
            </div>

            {/* Left Column Sidebar (4 Columns) */}
            <div className="col-span-12 md:col-span-4 border-r border-gray-150 dark:border-white/5 p-5 flex flex-col gap-5">
              
              {/* User Block */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div className="w-18 h-18 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-xl text-gray-600 dark:text-gray-300 overflow-hidden">
                    V
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#23242A] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-950 dark:text-white line-clamp-1">Mandala Vishnu Vardhan Reddy</h4>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">mandalavishnuvardhan07@gmail.com</span>
                  <div className="mt-1.5 inline-flex px-2 py-0.5 bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase rounded">
                    Admin
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-normal font-medium max-w-[190px]">
                  Backend-focused Software Engineer with experience building scalable distributed systems and cloud-native...
                </p>

                {/* Edit profile buttons */}
                <div className="flex items-center gap-1.5 w-full mt-1">
                  <button className="flex-1 py-2 bg-[#FF7A00] hover:bg-orange-600 text-white text-[10px] font-bold rounded-xl transition-colors">
                    Edit Profile
                  </button>
                  <button className="p-2 border border-gray-200 dark:border-white/5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-400 dark:text-gray-500">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Profiles Row */}
              <div className="flex flex-col gap-2.5 border-t border-gray-100 dark:border-white/5 pt-4">
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Profiles</span>
                
                {[
                  { name: "LeetCode", icon: "Lee", checked: true },
                  { name: "CodeChef", icon: "Che", checked: true },
                  { name: "CodeForces", icon: "For", checked: false },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-150/40 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.checked ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                      )}
                      <ExternalLink className="w-3 h-3 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements Row */}
              <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Achievements</span>
                  <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">1 Badges</span>
                </div>
                <div className="flex items-center gap-2 px-1 py-1">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center text-orange-500">
                    <Award className="w-4 h-4" />
                    <span className="text-[8px] font-black">x1</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column Content Panel (8 Columns) */}
            <div className="col-span-12 md:col-span-8 p-5 flex flex-col gap-5 bg-gray-50/20 dark:bg-transparent">
              
              {/* Performance Block */}
              <div className="bg-white dark:bg-[#2A2B32] p-5 rounded-2xl border border-gray-200/60 dark:border-white/5 flex flex-col gap-5 relative">
                
                <div>
                  <h4 className="text-sm font-extrabold text-gray-950 dark:text-white">Performance</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Analytics & Problem Solving</p>
                </div>

                {/* Performance Tabs row */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-150 dark:border-white/5 pb-3">
                  {["Overview", "Contests", "LeetCode", "CodeChef", "CodeForces"].map((tab) => (
                    <span
                      key={tab}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                        tab === "Overview"
                          ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white"
                          : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left: Easy/Med/Hard progress meters */}
                  <div className="flex-1 flex flex-col gap-3 w-full">
                    {[
                      { name: "Easy", solved: 11, total: 40, color: "bg-green-500" },
                      { name: "Medium", solved: 1, total: 17, color: "bg-yellow-500" },
                      { name: "Hard", solved: 0, total: 3, color: "bg-red-500" },
                    ].map((item) => (
                      <div key={item.name} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{item.solved} / {item.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className={`${item.color} h-full rounded-full`} style={{ width: `${(item.solved / item.total) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: Practice circular graph */}
                  <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100 dark:stroke-white/5" strokeWidth="2.5" />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-green-500"
                        strokeWidth="2.5"
                        strokeDasharray="100"
                        strokeDashoffset="80" // Recreate the 20% practice arc
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-lg font-black text-gray-950 dark:text-white leading-none">20%</span>
                      <span className="text-[7px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Practice</span>
                    </div>
                  </div>

                </div>

                {/* Contests footer stats row */}
                <div className="flex items-center justify-around border-t border-gray-150 dark:border-white/5 pt-4 text-center mt-2">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Contests</span>
                    <div className="text-lg font-black text-gray-950 dark:text-white mt-0.5">9</div>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Contest Score</span>
                    <div className="text-lg font-black text-gray-950 dark:text-white mt-0.5">60</div>
                  </div>
                </div>

              </div>

              {/* Submission Activity Block */}
              <div className="bg-white dark:bg-[#2A2B32] p-5 rounded-2xl border border-gray-200/60 dark:border-white/5 flex flex-col gap-4">
                <div>
                  <h4 className="text-sm font-extrabold text-gray-950 dark:text-white">Submission Activity</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">20 submissions recently</p>
                </div>

                {/* Heatmap Grid */}
                <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto py-2 items-center justify-center">
                  {heatmapGrid.map((val, idx) => (
                    <div
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-[2px] transition-colors ${
                        val === 3 ? "bg-orange-500" :
                        val === 2 ? "bg-orange-500/60" :
                        val === 1 ? "bg-orange-500/20" :
                        "bg-gray-100 dark:bg-white/5"
                      }`}
                    />
                  ))}
                </div>

                {/* Legend footer row */}
                <div className="flex items-center justify-end gap-1.5 text-[9px] font-bold text-gray-400 dark:text-gray-500 pr-2">
                  <span>Less</span>
                  <div className="flex gap-0.5">
                    <span className="w-2 h-2 rounded bg-gray-100 dark:bg-white/5" />
                    <span className="w-2 h-2 rounded bg-orange-500/20" />
                    <span className="w-2 h-2 rounded bg-orange-500/60" />
                    <span className="w-2 h-2 rounded bg-orange-500" />
                  </div>
                  <span>More</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* 3. Floating Profile Card (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" as const }}
            className="w-full max-w-[280px] bg-white dark:bg-[#2A2B32] rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-2xl p-5 flex flex-col justify-between relative overflow-hidden z-20"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />
            
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center font-bold text-lg text-orange-500">
                AF
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-950 dark:text-white">Alex Mercer</h4>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500">@mandalavishnuvardhan07</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-4 text-center">
              <div className="p-2.5 bg-gray-50 dark:bg-white/3 rounded-xl border border-gray-150/40 dark:border-white/5">
                <div className="text-xs font-black text-gray-950 dark:text-white">12</div>
                <span className="text-[8px] font-bold text-gray-400 dark:text-gray-500 block">Solved</span>
              </div>
              <div className="p-2.5 bg-gray-50 dark:bg-white/3 rounded-xl border border-gray-150/40 dark:border-white/5">
                <div className="text-xs font-black text-gray-950 dark:text-white">28</div>
                <span className="text-[8px] font-bold text-gray-400 dark:text-gray-500 block">Active Days</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 mb-4">
              {["Java", "C++", "Python", "SQL"].map((lang) => (
                <span key={lang} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-150/40 dark:border-white/5 text-[8px] font-extrabold text-gray-500 dark:text-gray-400">
                  {lang}
                </span>
              ))}
            </div>

            <div className="flex justify-around items-center pt-3 border-t border-gray-100 dark:border-white/5">
              {[
                { icon: TwitterIcon, color: "text-sky-400" },
                { icon: LinkedinIcon, color: "text-blue-600" },
                { icon: GithubIcon, color: "text-neutral-800 dark:text-white" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Icon key={idx} className={`w-4 h-4 ${social.color} hover:scale-110 cursor-pointer transition-transform`} />
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

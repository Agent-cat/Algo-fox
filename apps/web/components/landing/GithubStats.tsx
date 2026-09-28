"use client";

import { motion } from "framer-motion";
import { GitFork, Star, GitCommit, FolderGit, Languages, GitPullRequest } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function GithubStats() {
  const stats = [
    { label: "Total Commits", value: "1,482", icon: GitCommit, color: "text-emerald-500" },
    { label: "Repositories", value: "34", icon: FolderGit, color: "text-blue-500" },
    { label: "Stars Earned", value: "52", icon: Star, color: "text-amber-500" },
    { label: "Forks", value: "12", icon: GitFork, color: "text-purple-500" },
  ];

  const languages = [
    { name: "TypeScript", percent: 45, color: "bg-blue-500" },
    { name: "JavaScript", percent: 25, color: "bg-yellow-500" },
    { name: "Rust", percent: 18, color: "bg-orange-500" },
    { name: "Go", percent: 12, color: "bg-sky-500" },
  ];

  // Pinned repos
  const pinnedRepos = [
    { name: "algo-fox-compiler", desc: "High performance sandboxed compiler interface supporting 10+ languages.", stars: 24, forks: 4, lang: "TypeScript" },
    { name: "sql-playground", desc: "Interactive database executor executing live structured query statements.", stars: 18, forks: 2, lang: "JavaScript" },
  ];

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-[#1b1c21] border-y border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Sync</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Hub for your <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Projects and Dev Stats</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Connect your GitHub account to showcase your repositories, commits, and contribution history directly on your profile.
          </p>
        </div>

        {/* GitHub Analytics Mockup Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Stats & Languages (8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white dark:bg-[#23242A] p-5 rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-md hover:border-orange-500/10 dark:hover:border-orange-500/10 transition-all flex flex-col gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">{item.value}</div>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contribution Graph */}
            <div className="bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Weekly Commits & Pull Requests</span>
                <GitPullRequest className="w-4 h-4 text-orange-500" />
              </div>

              {/* Weekly bar graph mockup */}
              <div className="h-32 flex items-end gap-3 px-2 pt-4">
                {[40, 60, 20, 80, 50, 95, 30, 70, 45, 90, 55, 75].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600 cursor-pointer"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500">M{idx+1}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Languages & Pinned (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Languages card */}
            <div className="bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Languages Breakdown</span>
                <Languages className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex flex-col gap-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                      <span>{lang.name}</span>
                      <span>{lang.percent}%</span>
                    </div>
                    <div className="w-full bg-gray-150 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className={`${lang.color} h-full rounded-full`} style={{ width: `${lang.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pinned Repositories */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 px-1">Pinned Repositories</span>
              {pinnedRepos.map((repo) => (
                <div key={repo.name} className="bg-white dark:bg-[#23242A] p-5 rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-md hover:border-orange-500/10 dark:hover:border-orange-500/10 transition-all flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FolderGit className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white hover:underline cursor-pointer">
                      {repo.name}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-400 dark:text-gray-500 font-medium">
                    {repo.desc}
                  </p>
                  <div className="flex items-center gap-4 mt-1 border-t border-gray-100 dark:border-white/5 pt-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span>{repo.lang}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                      <GitFork className="w-3.5 h-3.5 text-purple-500" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

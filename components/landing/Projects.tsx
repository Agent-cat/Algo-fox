"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Layers, FolderHeart } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Projects() {
  const projects = [
    {
      title: "AlgoFox Compiler",
      desc: "A secure sandboxed code compilation service supporting 12+ programming languages with customized timeout policies and performance profiling.",
      tags: ["Go", "Docker", "gRPC", "Redis"],
      gradient: "from-orange-500/10 to-red-500/10",
      iconColor: "text-orange-500",
      accent: "bg-orange-500/5 border-orange-500/10",
    },
    {
      title: "SQL Playgrounds",
      desc: "An interactive browser-based SQL engine executing queries against transient schemas with live execution plan visualization.",
      tags: ["TypeScript", "Next.js", "SQLite", "Tailwind"],
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-500",
      accent: "bg-blue-500/5 border-blue-500/10",
    },
    {
      title: "Dev Portfolio Hub",
      desc: "Beautiful, responsive coding developer resumes with aggregate coding charts synced directly from LeetCode, GitHub, and Codeforces.",
      tags: ["React", "Framer Motion", "Recharts", "Prisma"],
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-500",
      accent: "bg-emerald-500/5 border-emerald-500/10",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#1D1E23] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
            <FolderHeart className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Developer <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Project Showcase</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Build and showcase your engineering projects alongside your coding metrics. Let recruiters see your real building skills.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-[#23242A] rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col justify-between overflow-hidden"
            >
              
              {/* Mock Project Image / Gradient Header */}
              <div className={`h-40 bg-gradient-to-br ${project.gradient} border-b border-gray-150 dark:border-white/5 relative flex items-center justify-center p-6 overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.01)_10%,transparent_80%)]" />
                <div className={`w-14 h-14 rounded-2xl ${project.accent} ${project.iconColor} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Code2 className="w-7 h-7" />
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="font-extrabold text-gray-950 dark:text-white text-lg group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500 font-medium">
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/5 text-[9px] font-bold text-gray-500 dark:text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center gap-3 border-t border-gray-100 dark:border-white/5 pt-4">
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-150 dark:hover:bg-white/10 text-gray-700 dark:text-white text-[10px] font-bold rounded-xl border border-gray-200/50 dark:border-white/5 transition-all">
                      <GithubIcon className="w-3.5 h-3.5" />
                      Repository
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm shadow-orange-500/10">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

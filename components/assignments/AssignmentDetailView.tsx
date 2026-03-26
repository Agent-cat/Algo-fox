"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface Problem {
  id: string;
  problemId: string;
  problem: {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    type: string;
    domain: string;
  };
}

interface Assignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  problems: Problem[];
  classroom: {
    name: string;
    id: string;
  };
}

interface Progress {
  total: number;
  completed: number;
  progressMap: Record<string, boolean>;
}

interface AssignmentDetailViewProps {
  assignment: Assignment;
  progress: Progress | null;
}

export function AssignmentDetailView({
  assignment,
  progress,
}: AssignmentDetailViewProps) {
  const completedCount = progress?.completed || 0;
  const totalCount = progress?.total || assignment.problems.length;
  const progressPercent =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Header / HUD */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
           <Link
            href="/my-assignments"
            className="group flex items-center gap-2.5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Abort & Return
          </Link>

          <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
             <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Sync Signature</span>
                <span className="text-[9px] font-black text-gray-900 dark:text-gray-200 uppercase tabular-nums">{assignment.id.slice(-8).toUpperCase()}</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
               <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">{assignment.classroom.name}</span>
            </div>
            <h1 className="text-4xl font-black text-gray-950 dark:text-white tracking-tightest uppercase mb-4 leading-none">
              {assignment.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
               {assignment.dueDate && (
                 <div className="flex items-center gap-2.5 bg-white dark:bg-black/40 px-3 py-2 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                       Horizon: {format(new Date(assignment.dueDate), "dd MMM, h:mma")}
                    </span>
                 </div>
               )}
               <div className="h-4 w-px bg-gray-200 dark:bg-white/10 hidden sm:block" />
               <p className="text-xs font-bold text-gray-500 max-w-xl leading-relaxed">
                 {assignment.description || "Operational parameters undefined for this protocol."}
               </p>
            </div>
          </div>

          {/* Progress HUD */}
          <div className="shrink-0">
             <div className="bg-[#fafafa] dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm min-w-[200px]">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Task Completion</span>
                   <span className="text-xl font-black text-gray-950 dark:text-white tabular-nums leading-none">
                     {Math.round(progressPercent)}%
                   </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{completedCount} Nodes Solved</span>
                   <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{totalCount} Total</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Node List Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2 mb-6">
           <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] shrink-0">Protocol Nodes</h2>
           <div className="h-px bg-gray-100 dark:bg-white/5 flex-1" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          {assignment.problems.map((item, index) => {
            const isSolved = progress?.progressMap[item.problemId] || false;

            return (
              <Link
                key={item.id}
                href={`/problems/${item.problem.slug}`}
                className={`group flex items-center gap-6 p-5 rounded-2xl border transition-all duration-300 ${
                  isSolved
                    ? 'bg-gray-50/50 dark:bg-white/5 border-emerald-500/20 opacity-80'
                    : 'bg-[#fafafa] dark:bg-[#121212] border-gray-100 dark:border-white/5 hover:border-orange-500/50 shadow-sm hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-none'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-500 ${
                  isSolved
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600'
                    : 'bg-white dark:bg-black/40 border-gray-100 dark:border-white/10 text-gray-300 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600'
                }`}>
                  {isSolved ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-black tabular-nums">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Node {item.problem.id.slice(-4).toUpperCase()}</span>
                    <h3 className={`text-lg font-black tracking-tightest uppercase truncate transition-colors ${
                      isSolved
                        ? 'text-gray-400 dark:text-gray-500 line-through'
                        : 'text-gray-950 dark:text-white group-hover:text-orange-600'
                    }`}>
                      {item.problem.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${
                        item.problem.difficulty === "EASY"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/10"
                          : item.problem.difficulty === "MEDIUM"
                          ? "bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-500/5 dark:border-yellow-500/10"
                          : "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/5 dark:border-red-500/10"
                      }`}
                    >
                      {item.problem.difficulty}
                    </span>
                    <div className="w-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full" />
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                      {item.problem.domain}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg hidden sm:flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all">
                      {isSolved ? 'Review' : 'Initialize'}
                      <ChevronRight className={`w-3 h-3 group-hover:translate-x-1 transition-transform ${isSolved ? 'text-emerald-500 group-hover:text-white' : ''}`} />
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-300 sm:hidden" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

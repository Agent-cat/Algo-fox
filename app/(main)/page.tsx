import { Metadata } from "next";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Code2, Database, Trophy, ArrowRight, Zap, CodeSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Algo-fox | Elite Platform for DSA & SQL Mastery",
  description: "The ultimate platform for competitive programming, SQL mastery, and interview preparation. Join high-stakes contests and boost your career.",
};

export default async function LandingPage() {
  const session = await getSession();
  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen lg:min-h-0 lg:h-[var(--content-height)] bg-[#fafafa] dark:bg-[#1D1E23] text-black dark:text-white relative overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-col font-sans select-none">
      
      {/* Decorative Grid and Gradients Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-orange-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-orange-600/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 flex-1 flex flex-col justify-center relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6 mt-8">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Introducing Algo-fox v2.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-gray-900 dark:text-white">
            Master <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">DSA</span> & <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">SQL</span> Playground
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
            The ultimate interactive platform for competitive programming, database queries, and structured interview preparation. Elevate your coding skills today.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/signin" 
              className="flex items-center justify-center px-8 py-4 bg-white dark:bg-white/5 hover:bg-gray-150 dark:hover:bg-white/10 active:scale-95 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 font-bold rounded-2xl transition-all w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          
          {/* Card 1: DSA Practice */}
          <div className="group bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 flex items-center justify-center text-orange-500">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-orange-500 transition-colors">DSA Practice</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Unlock problems across arrays, trees, dynamic programming and solve them with real-time compiler updates.
              </p>
            </div>
          </div>

          {/* Card 2: SQL Mastery */}
          <div className="group bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 flex items-center justify-center text-orange-500">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-orange-500 transition-colors">SQL Playground</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Write and execute queries directly on live interactive schemas. Gain practical database mastery.
              </p>
            </div>
          </div>

          {/* Card 3: Code Compiler */}
          <div className="group bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 flex items-center justify-center text-orange-500">
              <CodeSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-orange-500 transition-colors">Online Compiler</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Run, debug, and test your scratch code in C, C++, Java, Python, Go, Rust and more with interactive console input.
              </p>
            </div>
          </div>

          {/* Card 4: Contests & Leaderboards */}
          <div className="group bg-white dark:bg-[#23242A] p-6 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 flex items-center justify-center text-orange-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-orange-500 transition-colors">Contests</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Join live timing competitive coding contests, fight for rank, and see your stats update on global leaderboards.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

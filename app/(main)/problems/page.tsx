"use client";
// Force rebuild

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getUserAllocatedCourses } from "@/actions/courseAllocation.action";
import { ProblemDomain } from "@prisma/client";

export default function ProblemsSelectionPage() {
  const [allocatedDomains, setAllocatedDomains] = useState<ProblemDomain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllocations() {
      const result = await getUserAllocatedCourses();
      if (result.success) {
        setAllocatedDomains(result.domains as ProblemDomain[]);
      }
      setLoading(false);
    }
    fetchAllocations();
  }, []);

  const courses = [
    {
      id: "dsa",
      href: "/problems/dsa",
      domain: "DSA" as ProblemDomain,
      title: "DSA",
      description: "Master Data Structures & Algorithms with curated problems.",
      bgFrom: "from-orange-500 dark:from-orange-500/10",
      bgTo: "to-orange-600 dark:to-orange-500/5",
      buttonBg: "bg-white dark:bg-orange-600",
      buttonText: "text-orange-600 dark:text-white",
      buttonHover: "hover:bg-orange-50 dark:hover:bg-orange-700",
      badge: "Popular",
      icon: (
        <svg className="w-8 h-8 text-white dark:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: "sql",
      href: "/problems/sql",
      domain: "SQL" as ProblemDomain,
      title: "SQL",
      description: "Master Database Management and SQL Queries.",
      bgFrom: "",
      bgTo: "",
      buttonBg: "bg-black dark:bg-white",
      buttonText: "text-white dark:text-black",
      buttonHover: "hover:bg-gray-900 dark:hover:bg-gray-200",
      badge: "New",
      icon: (
        <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
  ];

  // Filter courses based on allocations
  const displayedCourses = loading ? [] : courses.filter(course => allocatedDomains.includes(course.domain));

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (displayedCourses.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl mb-4">
              Practice Problems
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              No courses have been allocated to your year yet. Please contact your administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl mb-4">
            Practice Problems
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Select a category to start practicing and improving your coding skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayedCourses.map((course) => (
            <Link key={course.id} href={course.href} className="w-full">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                className={`relative overflow-hidden rounded-xl h-80 w-full cursor-pointer group shadow-lg ${
                  course.id === "dsa"
                    ? "border border-orange-200 dark:border-orange-900/30 bg-white dark:bg-[#141414]"
                    : "border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414]"
                }`}
              >
                {course.id === "dsa" && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.bgFrom} ${course.bgTo} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <rect x="50" y="50" width="100" height="100" stroke="currentColor" className="text-white dark:text-orange-500" strokeWidth="2" fill="none" />
                        <rect x="70" y="70" width="60" height="60" stroke="currentColor" className="text-white dark:text-orange-500" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  </>
                )}
                {course.id === "sql" && (
                  <>
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: 'linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-15">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" stroke="#9ca3af" strokeWidth="2" fill="none" />
                        <path d="M20 100 H180" stroke="#9ca3af" strokeWidth="2" />
                        <path d="M100 20 V180" stroke="#9ca3af" strokeWidth="2" />
                      </svg>
                    </div>
                  </>
                )}

                <div className="relative h-full flex flex-col justify-between p-8 z-10">
                  <div className="flex justify-between items-start">
                    <div className={`w-16 h-16 ${
                      course.id === "dsa"
                        ? "bg-white/20 backdrop-blur-md border border-white/30 dark:bg-orange-500/10 dark:border-orange-500/20"
                        : "bg-gray-100 dark:bg-[#202020] border-gray-200 dark:border-[#333]"
                    } rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                      {course.icon}
                    </div>
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      course.id === "dsa"
                        ? "bg-white/20 text-white backdrop-blur-md dark:bg-orange-500/10 dark:text-orange-500"
                        : "bg-gray-100 text-gray-600 dark:bg-[#202020] dark:text-gray-400"
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {course.badge}
                    </div>
                  </div>

                  <div className="text-left">
                    <h2 className={`text-4xl font-bold ${
                      course.id === "dsa"
                        ? "text-white dark:text-white"
                        : "text-gray-900 dark:text-white"
                    } mb-2 tracking-tight`}>
                      {course.title}
                    </h2>
                    <p className={`${
                      course.id === "dsa"
                        ? "text-orange-50 dark:text-gray-400"
                        : "text-gray-600 dark:text-gray-400"
                    } font-medium text-lg mb-6`}>
                      {course.description}
                    </p>
                    <div className={`inline-flex items-center gap-2 ${course.buttonBg} ${course.buttonText} px-6 py-3 rounded-lg font-bold shadow-md ${course.buttonHover} transition-colors`}>
                      Start Practicing <span>&rarr;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

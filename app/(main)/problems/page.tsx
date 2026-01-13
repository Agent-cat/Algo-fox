"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProblemsSelectionPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Practice Problems
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Select a category to start practicing and improving your coding skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* DSA Card */}
          <Link href="/problems/dsa" className="w-full">
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              className="relative overflow-hidden rounded-xl h-80 w-full cursor-pointer group shadow-lg border border-orange-200 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Geometric Grid Pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              </div>

              <div className="absolute right-0 bottom-0 opacity-10">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <rect x="50" y="50" width="100" height="100" stroke="white" strokeWidth="2" fill="none" />
                  <rect x="70" y="70" width="60" height="60" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="relative h-full flex flex-col justify-between p-8 z-10">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30 transform group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-md">
                    Popular
                  </div>
                </div>

                <div className="text-left">
                  <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">DSA</h2>
                  <p className="text-orange-50 font-medium text-lg mb-6">Master Data Structures & Algorithms with curated problems.</p>
                  <div className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-orange-50 transition-colors">
                    Start Practicing <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* SQL Card */}
          <Link href="/problems/sql" className="w-full">
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              className="relative overflow-hidden rounded-xl h-80 w-full cursor-pointer group shadow-lg border border-gray-200 bg-white"
            >
              {/* Geometric Grid Pattern */}
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

              <div className="relative h-full flex flex-col justify-between p-8 z-10">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 transform group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs font-semibold">
                    New
                  </div>
                </div>

                <div className="text-left">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">SQL</h2>
                  <p className="text-gray-600 font-medium text-lg mb-6">Master Database Management and SQL Queries.</p>
                  <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-gray-900 transition-colors">
                    Start Practicing <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

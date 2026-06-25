"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  School,
} from "lucide-react";
import { StudentClassroomCard } from "@/components/classroom/StudentClassroomCard";
import { getStudentClassrooms } from "@/actions/classroom";
import { useRouter } from "next/navigation";
import ModeToggle from "@/components/problems/ModeToggle";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 8;

interface Classroom {
  id: string;
  name: string;
  subject: string | null;
  joinCode: string;
  teacher: {
    name: string | null;
  };
}

interface ClassroomsPageContentProps {
  initialClassrooms: Classroom[];
}

export function ClassroomsPageContent({
  initialClassrooms,
}: ClassroomsPageContentProps) {
  const router = useRouter();
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"practice" | "learn">("practice");

  const filteredClassrooms = useMemo(() => {
    return classrooms.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.teacher?.name &&
          c.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [classrooms, searchQuery]);

  const displayedClassrooms = filteredClassrooms;

  const totalPages = Math.ceil(displayedClassrooms.length / ITEMS_PER_PAGE);
  const paginatedClassrooms = displayedClassrooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  return (
    <div className="space-y-8 pb-20">
      <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
              Classrooms
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="relative group w-full md:flex-1">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
               <input
                 type="text"
                 placeholder="Search classrooms or teachers..."
                 value={searchQuery}
                 onChange={handleSearchChange}
                 className="w-full h-10 pl-10 pr-4 bg-gray-50/50 hover:bg-gray-100/50 focus:bg-gray-50/50 dark:bg-[#111] dark:hover:bg-[#161616] dark:focus:bg-[#111] border border-gray-200 dark:border-white/10 rounded-lg text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm transition-all"
               />
             </div>
             <ModeToggle mode={viewMode} onModeChange={setViewMode} practiceLabel="Grid" learnLabel="List" />
          </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-14"
        >
            <section className="pt-2">
                <div className="mb-6 flex justify-end">
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                        <span className="text-gray-900 dark:text-white">{displayedClassrooms.length} Classrooms</span>
                    </div>
                </div>

                {/* Grid Matrix */}
                {displayedClassrooms.length > 0 ? (
                  <div className={viewMode === "practice" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
                    {paginatedClassrooms.map((classroom, idx) => (
                      <StudentClassroomCard
                        key={classroom.id}
                        classroom={classroom}
                        index={idx}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-transparent rounded-3xl border border-dashed border-gray-200 dark:border-[#262626]">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-gray-100 dark:border-white/5">
                      <School className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {searchQuery ? "No Classrooms Found" : "No Classrooms"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                      {searchQuery ? "Try adjusting your search query." : "You are not enrolled in any classrooms yet."}
                    </p>
                  </div>
                )}

                {/* Numerical Navigation */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-6">
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(1, prev - 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="h-10 w-10 flex items-center justify-center bg-transparent border border-gray-200 dark:border-white/10 rounded-xl hover:border-orange-500 disabled:opacity-30 transition-all shadow-sm active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>

                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Page</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
                        {currentPage} <span className="text-gray-400 mx-1">/</span> {totalPages}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="h-10 w-10 flex items-center justify-center bg-transparent border border-gray-200 dark:border-white/10 rounded-xl hover:border-orange-500 disabled:opacity-30 transition-all shadow-sm active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
            </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

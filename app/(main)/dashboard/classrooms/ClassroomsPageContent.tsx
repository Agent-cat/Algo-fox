"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Layers,
  School,
} from "lucide-react";
import { StudentClassroomCard } from "@/components/classroom/StudentClassroomCard";
import { getStudentClassrooms } from "@/actions/classroom";
import { useRouter } from "next/navigation";

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

  const filteredClassrooms = useMemo(() => {
    return classrooms.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.teacher?.name &&
          c.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [classrooms, searchQuery]);

  const totalPages = Math.ceil(filteredClassrooms.length / ITEMS_PER_PAGE);
  const paginatedClassrooms = filteredClassrooms.slice(
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

  const handleJoinSuccess = useCallback(async () => {
    // Refresh data after joining
    const res = await getStudentClassrooms();
    if (res.success && res.classrooms) {
      setClassrooms(res.classrooms);
    }
    router.refresh();
  }, [router]);


  return (
    <div className="pb-20">
      {/* Access Control Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
         <div className="relative group flex-1 w-full md:max-w-md">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
           <input
             type="text"
             placeholder="Locate logic nodes or mentors..."
             value={searchQuery}
             onChange={handleSearchChange}
             className="w-full h-12 pl-12 pr-4 bg-[#fafafa] dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-950 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500/20 shadow-sm transition-all"
           />
         </div>

         <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <span>Grid view active</span>
            <div className="h-4 w-px bg-gray-100 dark:bg-white/10" />
            <span className="text-gray-950 dark:text-white">{filteredClassrooms.length} Active Nodes</span>
         </div>
      </div>

      {/* Grid Matrix */}
      {filteredClassrooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {paginatedClassrooms.map((classroom, idx) => (
            <StudentClassroomCard
              key={classroom.id}
              classroom={classroom}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-[#fafafa] dark:bg-[#121212] rounded-3xl border border-dashed border-gray-200 dark:border-white/5">
          <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 dark:border-white/5">
            <Layers className="w-8 h-8 text-gray-300 dark:text-gray-700" />
          </div>
          <h2 className="text-sm font-black text-gray-950 dark:text-white mb-2 uppercase tracking-tightest">
            {searchQuery ? "Matrix Search Null" : "No Active Links"}
          </h2>
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest max-w-xs mx-auto">
            {searchQuery
              ? "Re-align search parameters to locate nodes"
              : "Initiate classroom link to begin logic synchronization"}
          </p>
        </div>
      )}

      {/* Numerical Navigation */}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-center gap-6">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(1, prev - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="h-10 w-10 flex items-center justify-center bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-xl hover:border-orange-500 disabled:opacity-30 transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="flex flex-col items-center">
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Index</span>
             <span className="text-[10px] font-black text-gray-950 dark:text-white tabular-nums">
               {currentPage} <span className="text-gray-400">/</span> {totalPages}
             </span>
          </div>

          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(totalPages, prev + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="h-10 w-10 flex items-center justify-center bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-xl hover:border-orange-500 disabled:opacity-30 transition-all shadow-sm active:scale-95"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}

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
import { JoinClassroomModal } from "@/components/classroom/JoinClassroomModal";
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
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0a0a0a] pb-24">
      {/* Immersive Header */}
      <div className="relative mb-12 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#262626] pb-24 pt-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2626260a_1px,transparent_1px),linear-gradient(to_bottom,#2626260a_1px,transparent_1px)] bg-size[14px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-10 dark:opacity-20 blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-500/20">
              <School className="w-3 h-3" />
              My Learning Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600">
                Classrooms
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg text-lg leading-relaxed">
              Access your course materials, assignments, and track your progress
              in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* Control Bar */}
        <div className="bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl border border-gray-200 dark:border-[#262626] p-2 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search classrooms or mentors..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border border-transparent focus:bg-white dark:focus:bg-[#1a1a1a] focus:border-orange-500/50 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setIsJoinModalOpen(true)}
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-xl hover:bg-orange-600 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-gray-900/10 dark:shadow-none"
          >
            <Plus className="w-4 h-4" />
            Join Classroom
          </button>
        </div>

        {/* Grid */}
        {filteredClassrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedClassrooms.map((classroom, idx) => (
              <StudentClassroomCard
                key={classroom.id}
                classroom={classroom}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-[#262626] border-dashed">
            <div className="w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No classrooms found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
              {searchQuery
                ? "Try adjusting your search terms"
                : "You haven't joined any classrooms yet. Get a code from your teacher to start!"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="text-orange-600 dark:text-orange-500 font-bold text-sm hover:underline underline-offset-4"
              >
                Join your first classroom
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(1, prev - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl hover:border-orange-500 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
              Page{" "}
              <span className="text-gray-900 dark:text-white">
                {currentPage}
              </span>{" "}
              of {totalPages}
            </span>

            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl hover:border-orange-500 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>

      <JoinClassroomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={handleJoinSuccess}
      />
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { getInstitutionClassrooms } from "@/actions/classroom";
import {
  Tent,
  Users,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Classroom {
  id: string;
  name: string;
  section: string | null;
  subject: string | null;
  createdAt: Date | string;
  teacher: {
    name: string | null;
    email: string | null;
  };
  _count?: {
    students: number;
  };
}

interface Pagination {
  total: number;
  pages: number;
  current: number;
  limit: number;
}

interface InstitutionClassroomsContentProps {
  initialClassrooms: Classroom[];
  initialPagination: Pagination | null;
}

export function InstitutionClassroomsContent({
  initialClassrooms,
  initialPagination,
}: InstitutionClassroomsContentProps) {
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);

  const loadPage = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const res = await getInstitutionClassrooms(page, 50);
      if (res.success && res.classrooms) {
        setClassrooms(res.classrooms);
        setPagination(res.pagination || null);
      }
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Classrooms
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          All active classrooms in your institution.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : classrooms.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#141414] border border-dashed border-gray-200 dark:border-[#262626] rounded-2xl">
          <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
            <Tent className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No classrooms found
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Teachers can create classrooms from their dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Link
              href={`/dashboard/classrooms/${classroom.id}`}
              key={classroom.id}
              className="group bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 dark:hover:border-orange-500/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 rounded-xl">
                  <Tent className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-[#262626] text-gray-600 dark:text-gray-400 text-xs font-bold rounded-full">
                  {classroom.section || "No Section"}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {classroom.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {classroom.subject || "General"}
              </p>

              <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-[#1a1a1a]">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-medium">Teacher</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white text-xs text-right truncate max-w-30">
                    {classroom.teacher?.name || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium">Students</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">
                    {classroom._count?.students || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium">Created</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">
                    {format(new Date(classroom.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            onClick={() => loadPage(pagination.current - 1)}
            disabled={pagination.current === 1 || isLoading}
            className="p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl hover:border-orange-500 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
            Page{" "}
            <span className="text-gray-900 dark:text-white">
              {pagination.current}
            </span>{" "}
            of {pagination.pages}
          </span>

          <button
            onClick={() => loadPage(pagination.current + 1)}
            disabled={pagination.current === pagination.pages || isLoading}
            className="p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl hover:border-orange-500 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}

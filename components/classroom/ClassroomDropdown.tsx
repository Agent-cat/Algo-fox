"use client";

import { useState } from "react";
import {
  School,
  ChevronDown,
  BookOpen,
  User,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { joinClassroom } from "@/actions/classroom";
import Link from "next/link";

interface Classroom {
  id: string;
  name: string;
  section: string | null;
  subject: string | null;
  teacher: {
    name: string | null;
  };
}

interface ClassroomDropdownProps {
  classrooms: Classroom[];
}

export function ClassroomDropdown({ classrooms }: ClassroomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isJoinExpanded, setIsJoinExpanded] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      toast.error("Please enter a valid 6-character join code");
      return;
    }

    setIsLoading(true);
    try {
      const res = await joinClassroom(code);
      if (res.success) {
        toast.success(res.message);
        setCode("");
        setIsJoinExpanded(false);
        // The page will revalidate due to server action
      } else {
        toast.error(res.error || "Failed to join classroom");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-2xl  group shadow-lg ${
          isOpen
            ? "bg-gray-900 dark:bg-[#0a0a0a] text-white shadow-gray-200 dark:shadow-none"
            : "bg-white dark:bg-[#141414] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#262626] hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-orange-100 dark:hover:shadow-none"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl   ${
              isOpen
                ? "bg-white/10"
                : "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 group-hover:bg-orange-600 group-hover:text-white"
            }`}
          >
            <School className="w-5 h-5" />
          </div>
          <span className="font-bold">Classrooms</span>
        </div>
        <div className="flex items-center gap-2">
          {classrooms.length > 0 && !isOpen && (
            <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {classrooms.length}{" "}
              {classrooms.length === 1 ? "Batch" : "Batches"}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none z-50 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {/* Join Classroom Section */}
              <div className="p-2">
                <button
                  onClick={() => setIsJoinExpanded(!isJoinExpanded)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl  ${
                    isJoinExpanded
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400"
                      : "hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Plus
                      className={`w-4 h-4 transition-transform ${
                        isJoinExpanded ? "rotate-45" : ""
                      }`}
                    />
                    <span className="text-sm font-bold">Join New Batch</span>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      isJoinExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isJoinExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <form
                        onSubmit={handleJoin}
                        className="p-3 pt-4 space-y-3"
                      >
                        <input
                          type="text"
                          value={code}
                          onChange={(e) =>
                            setCode(e.target.value.toUpperCase())
                          }
                          placeholder="ENTER 6-DIGIT CODE"
                          maxLength={6}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-100 dark:border-[#262626] bg-gray-50 dark:bg-[#0a0a0a] focus:bg-white dark:text-white dark:focus:bg-[#0a0a0a] focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-mono text-center tracking-[0.3em] uppercase placeholder:text-gray-300 dark:placeholder:text-gray-600 placeholder:tracking-normal placeholder:font-sans text-sm"
                        />
                        <button
                          type="submit"
                          disabled={isLoading || code.length < 6}
                          className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:bg-black dark:hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Verify & Join"
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-gray-100 dark:bg-[#262626] mx-4" />

              {/* Classrooms List */}
              <div className="max-h-75 overflow-y-auto p-2 pt-1 space-y-1 custom-scrollbar">
                <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  My Enrolled Batches
                </div>
                {classrooms.length > 0 ? (
                  <>
                    {classrooms.slice(0, 3).map((classroom) => (
                      <Link
                        key={classroom.id}
                        href={`/dashboard/classrooms/${classroom.id}`}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-orange-100 dark:hover:border-[#262626] transition-all group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg group-hover:bg-white dark:group-hover:bg-[#262626] transition-colors">
                            <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-gray-200 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                              {classroom.name}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                                <User className="w-2.5 h-2.5" />
                                {classroom.teacher.name || "Teacher"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                    {classrooms.length > 3 && (
                      <Link
                        href="/dashboard/classrooms"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 p-3 mt-1 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-all font-bold text-xs group"
                      >
                        Show {classrooms.length - 3} more batches
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </>
                ) : (
                  <div className="py-8 text-center px-4">
                    <School className="w-8 h-8 text-gray-100 dark:text-[#262626] mx-auto mb-2" />
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium leading-relaxed">
                      No classes joined yet. Use a code to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

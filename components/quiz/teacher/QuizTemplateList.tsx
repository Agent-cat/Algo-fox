"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string | null;
  timeLimit: number;
  order: number;
}

interface Assignment {
  id: string;
  classroom: { id: string; name: string; section: string | null };
  createdAt: string;
}

interface Template {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  assignments: Assignment[];
  createdAt: string;
}

interface Props {
  templates: Template[];
  searchTerm?: string;
}

export function QuizTemplateList({ templates: initialTemplates, searchTerm = "" }: Props) {
  const router = useRouter();
  const [templates] = useState<Template[]>(initialTemplates);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const [showLaunchModal, setShowLaunchModal] = useState<string | null>(null);
  const [classrooms, setClassrooms] = useState<
    { id: string; name: string; section?: string; studentCount: number }[]
  >([]);
  const [classroomsLoaded, setClassroomsLoaded] = useState(false);

  const filteredTemplates = useMemo(() => {
    if (!searchTerm.trim()) return templates;
    const term = searchTerm.toLowerCase();
    return templates.filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        (t.description && t.description.toLowerCase().includes(term))
    );
  }, [templates, searchTerm]);

  const loadClassrooms = async () => {
    if (classroomsLoaded) return;
    try {
      const res = await fetch("/api/quiz/classrooms");
      const data = await res.json();
      if (data.classrooms) {
        setClassrooms(data.classrooms);
        setClassroomsLoaded(true);
      }
    } catch {
      toast.error("Failed to load classrooms");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quiz template? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/quiz-template/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete");
        return;
      }
      toast.success("Template deleted");
    } catch {
      toast.error("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLaunch = async (templateId: string, classroomId: string) => {
    setLaunchingId(templateId);
    try {
      const res = await fetch(`/api/quiz-template/${templateId}/launch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classroomId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to launch quiz");
        return;
      }
      toast.success("Quiz launched! Redirecting...");
      setShowLaunchModal(null);
      router.push(`/dashboard/teacher/quiz/${data.sessionId}/host`);
    } catch {
      toast.error("Network error");
    } finally {
      setLaunchingId(null);
    }
  };

  if (filteredTemplates.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 bg-gray-50/50 dark:bg-[#24262C]/50 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-2">
          {searchTerm ? "No quizzes found" : "No quiz templates yet"}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 max-w-sm mx-auto">
          {searchTerm
            ? "Try a different search term."
            : "Create your first quiz template. You can reuse it across multiple classrooms."}
        </p>
        {!searchTerm && (
          <Link
            href="/dashboard/teacher/quiz/create"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-xs font-bold hover:bg-orange-600 dark:hover:bg-orange-500 transition-all active:scale-[0.98] shadow-lg"
          >
            Create Quiz Template
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3">
      {filteredTemplates.map((template) => {
        const isExpanded = expandedId === template.id;
        const totalTime = template.questions.reduce((s, q) => s + q.timeLimit, 0);
        const totalMinutes = Math.floor(totalTime / 60);
        const totalSeconds = totalTime % 60;

        return (
          <div
            key={template.id}
            className="bg-white dark:bg-[#24262C] border border-gray-100 dark:border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-200 dark:hover:border-white/15 transition-all duration-200"
          >
            {/* Template Header */}
            <div
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : template.id)}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                  {template.title}
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5 sm:mt-1">
                  <span>{template.questions.length} questions</span>
                  <span>
                    {totalMinutes > 0 ? `${totalMinutes}m ` : ""}
                    {totalSeconds}s
                  </span>
                  <span>
                    {template.assignments.length} session{template.assignments.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLaunchModal(template.id);
                    loadClassrooms();
                  }}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-orange-500 text-white rounded-lg text-[10px] sm:text-xs font-bold hover:bg-orange-600 transition-colors"
                >
                  Start
                </button>
                <Link
                  href={`/dashboard/teacher/quiz/templates/${template.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(template.id);
                  }}
                  disabled={deletingId === template.id}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100 dark:border-white/10 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
                {template.description && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                )}

                {/* Questions Preview */}
                <div className="space-y-2">
                  <h4 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Questions
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2 max-h-60 overflow-y-auto">
                    {template.questions.map((q, i) => (
                      <div
                        key={q.id}
                        className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-white/[0.03] rounded-lg"
                      >
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-black text-[10px] sm:text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">
                          {q.text}
                        </p>
                        <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">
                          {q.timeLimit}s
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Past Assignments */}
                {template.assignments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Assigned To
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {template.assignments.map((a) => (
                        <span
                          key={a.id}
                          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-100 dark:bg-white/5 rounded-md text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          {a.classroom.name}
                          {a.classroom.section && ` · ${a.classroom.section}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Launch Modal */}
            {showLaunchModal === template.id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setShowLaunchModal(null)}
              >
                <div
                  className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-white/10 p-5 sm:p-6 w-full max-w-md shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Start Quiz: {template.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Select a classroom to start a live session.
                  </p>

                  {!classroomsLoaded ? (
                    <div className="text-center py-6 sm:py-8 text-gray-400 text-xs sm:text-sm">Loading classrooms...</div>
                  ) : classrooms.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 text-gray-400">
                      <p className="text-xs sm:text-sm">No classrooms found.</p>
                      <Link
                        href="/dashboard/teacher/classrooms"
                        className="text-orange-500 underline text-xs sm:text-sm mt-2 inline-block"
                      >
                        Create a classroom first
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-1.5 sm:space-y-2 max-h-60 overflow-y-auto mb-4">
                      {classrooms.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleLaunch(template.id, c.id)}
                          disabled={launchingId === template.id}
                          className="w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all text-left disabled:opacity-50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                              {c.name}
                              {c.section && (
                                <span className="text-gray-400 font-normal">
                                  {" "}
                                  · {c.section}
                                </span>
                              )}
                            </p>
                          </div>
                          <span className="text-[10px] sm:text-xs text-gray-400">{c.studentCount} students</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setShowLaunchModal(null)}
                    className="w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

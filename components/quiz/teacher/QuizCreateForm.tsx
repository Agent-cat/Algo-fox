"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronDown, ChevronUp, Check, Users, Eye, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { Markdown } from "@/components/quiz/shared/Markdown";

interface ClassroomOption {
  id: string;
  name: string;
  section?: string;
  studentCount: number;
}

interface QuestionDraft {
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  timeLimit: number;
}

function defaultQuestion(): QuestionDraft {
  return { text: "", options: ["", "", "", ""], correctOption: 0, explanation: "", timeLimit: 30 };
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface Props {
  classrooms: ClassroomOption[];
}

export function QuizCreateForm({ classrooms }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [classroomId, setClassroomId] = useState(classrooms[0]?.id ?? "");
  const [questions, setQuestions] = useState<QuestionDraft[]>([defaultQuestion()]);
  const [expanded, setExpanded] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<Record<number, boolean>>({});
  const [optPreviewMode, setOptPreviewMode] = useState<Record<string, boolean>>({});
  const selectedClassroom = classrooms.find((c) => c.id === classroomId);

  const updateQuestion = (i: number, patch: Partial<QuestionDraft>) =>
    setQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));

  const updateOption = (qi: number, oi: number, value: string) =>
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qi ? { ...q, options: q.options.map((o, j) => (j === oi ? value : o)) } : q
      )
    );

  const addOption = (qi: number) => {
    if (questions[qi].options.length >= 8) return;
    updateQuestion(qi, { options: [...questions[qi].options, ""] });
  };

  const removeOption = (qi: number, oi: number) => {
    const q = questions[qi];
    if (q.options.length <= 2) return;
    const newOptions = q.options.filter((_, j) => j !== oi);
    const newCorrect = Math.min(q.correctOption, newOptions.length - 1);
    updateQuestion(qi, { options: newOptions, correctOption: newCorrect });
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, defaultQuestion()]);
    setExpanded(questions.length);
  };

  const removeQuestion = (i: number) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, idx) => idx !== i));
    setExpanded(Math.max(0, i - 1));
  };

  const validate = () => {
    if (!classroomId) return "Select a classroom";
    if (!title.trim()) return "Quiz title is required";
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) return `Question ${i + 1}: text is required`;
      if (q.options.some((o) => !o.trim())) return `Question ${i + 1}: all options must be filled`;
      if (q.correctOption >= q.options.length) return `Question ${i + 1}: invalid correct option`;
    }
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) { toast.error(err); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), classroomId, questions }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to create quiz"); return; }
      toast.success("Quiz created!");
      router.push(`/dashboard/teacher/quiz/${data.sessionId}/host`);
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Classroom selector */}
      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
          Classroom
        </label>
        <div className="space-y-2">
          {classrooms.map((c) => (
            <label
              key={c.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                classroomId === c.id
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                  : "border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:border-gray-300 dark:hover:border-[#3a3a3a]"
              }`}
            >
              <input
                type="radio"
                name="classroom"
                value={c.id}
                checked={classroomId === c.id}
                onChange={() => setClassroomId(c.id)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  classroomId === c.id ? "border-orange-500" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {classroomId === c.id && (
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  {c.name}
                  {c.section && <span className="text-gray-400 font-normal"> · {c.section}</span>}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Users className="w-3.5 h-3.5" />
                <span>{c.studentCount}</span>
              </div>
            </label>
          ))}
        </div>
        {selectedClassroom && (
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Only enrolled students in <span className="font-semibold text-gray-600 dark:text-gray-300">{selectedClassroom.name}</span> can join this quiz.
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
          Quiz Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Data Structures Revision — Week 3"
          className="w-full px-4 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
        />
      </div>

      {/* Questions */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Questions ({questions.length})
        </label>

        {questions.map((q, qi) => (
          <div
            key={qi}
            className="border border-gray-200 dark:border-[#2a2a2a] rounded-xl overflow-hidden bg-white dark:bg-[#141414]"
          >
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
              onClick={() => setExpanded(expanded === qi ? -1 : qi)}
            >
              <span className="w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-black text-xs flex items-center justify-center shrink-0">
                {qi + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {q.text ? (
                  <span className="truncate block">{q.text.replace(/[#*`]/g, "")}</span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-600 italic">Untitled question</span>
                )}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-400">{q.timeLimit}s</span>
                {questions.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeQuestion(qi); }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {expanded === qi ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === qi && (
              <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-[#222] pt-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question Text</div>
                  <button
                    onClick={() => setPreviewMode(prev => ({ ...prev, [qi]: !prev[qi] }))}
                    className="flex items-center gap-1 text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors"
                  >
                    {previewMode[qi] ? <><Edit2 className="w-3 h-3" /> Edit</> : <><Eye className="w-3 h-3" /> Preview</>}
                  </button>
                </div>

                {previewMode[qi] ? (
                  <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg min-h-[80px]">
                    <Markdown content={q.text || "*No text provided*"} className="text-sm" />
                  </div>
                ) : (
                  <textarea
                    value={q.text}
                    onChange={(e) => updateQuestion(qi, { text: e.target.value })}
                    placeholder="Enter your question (supports Markdown)..."
                    rows={2}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                  />
                )}

                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Options</div>
                  <div className="space-y-3">
                    {q.options.map((opt, oi) => {
                      const isPreview = optPreviewMode[`${qi}-${oi}`];
                      return (
                        <div key={oi} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuestion(qi, { correctOption: oi })}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                                q.correctOption === oi
                                  ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                                  : "bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-500/20"
                              }`}
                              title="Mark as correct answer"
                            >
                              {q.correctOption === oi ? <Check className="w-4 h-4" /> : OPTION_LABELS[oi]}
                            </button>

                            <div className="flex-1 min-w-0">
                              {isPreview ? (
                                <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg min-h-[40px]">
                                  <Markdown content={opt || "*Empty option*"} isOption className="text-sm" />
                                </div>
                              ) : (
                                <textarea
                                  value={opt}
                                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                                  placeholder={`Option ${OPTION_LABELS[oi]} (supports Markdown)...`}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500 transition-all resize-y"
                                />
                              )}
                            </div>

                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => setOptPreviewMode(prev => ({ ...prev, [`${qi}-${oi}`]: !prev[`${qi}-${oi}`] }))}
                                className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                                title="Toggle Preview"
                              >
                                {isPreview ? <Edit2 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              {q.options.length > 2 && (
                                <button onClick={() => removeOption(qi, oi)} className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {q.options.length < 8 && (
                    <button
                      onClick={() => addOption(qi)}
                      className="flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors mt-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add option
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      Explanation (optional)
                    </label>
                    <input
                      type="text"
                      value={q.explanation}
                      onChange={(e) => updateQuestion(qi, { explanation: e.target.value })}
                      placeholder="Why is this the correct answer?"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      Time Limit
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="5"
                        max="300"
                        step="5"
                        value={q.timeLimit}
                        onChange={(e) => updateQuestion(qi, { timeLimit: parseInt(e.target.value) })}
                        className="flex-1 accent-orange-500"
                      />
                      <span className="w-10 text-right font-black font-mono text-sm text-orange-600 dark:text-orange-400">
                        {q.timeLimit}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-[#2a2a2a] rounded-xl text-sm font-medium text-gray-400 hover:border-orange-400 hover:text-orange-500 dark:hover:border-orange-500/50 dark:hover:text-orange-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-sm hover:bg-orange-600 dark:hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : `Create Quiz (${questions.length} question${questions.length !== 1 ? "s" : ""})`}
      </button>
    </div>
  );
}

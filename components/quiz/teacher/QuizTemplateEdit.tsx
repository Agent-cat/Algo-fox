"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronDown, ChevronUp, Check, Eye, Edit2, Upload, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Markdown } from "@/components/quiz/shared/Markdown";
import { parseQuizMarkdown } from "@/lib/quiz-parser";
import { useRef } from "react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string | null;
  timeLimit: number;
  order: number;
}

interface TemplateData {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
}

interface Props {
  template: TemplateData;
}

function defaultQuestion() {
  return { text: "", options: ["", "", "", ""], correctOption: 0, explanation: "", timeLimit: 30 };
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function QuizTemplateEdit({ template }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description || "");
  const [questions, setQuestions] = useState(
    template.questions.map((q) => ({
      text: q.text,
      options: q.options,
      correctOption: q.correctOption,
      explanation: q.explanation || "",
      timeLimit: q.timeLimit,
    }))
  );
  const [expanded, setExpanded] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<Record<number, boolean>>({});
  const [optPreviewMode, setOptPreviewMode] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateQuestion = (i: number, patch: Partial<(typeof questions)[0]>) =>
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const parsedQuestions = parseQuizMarkdown(content);
        if (parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
          setExpanded(0);
          toast.success(`Loaded ${parsedQuestions.length} questions from markdown!`);
        }
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = () => {
    if (!title.trim()) return "Quiz title is required";
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) return `Question ${i + 1}: text is required`;
      if (q.options.some((o) => !o.trim())) return `Question ${i + 1}: all options must be filled`;
      if (q.correctOption >= q.options.length) return `Question ${i + 1}: invalid correct option`;
    }
    return null;
  };

  const save = async () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/quiz-template/${template.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          questions,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update quiz");
        return;
      }
      toast.success("Quiz template updated!");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
          className="w-full px-4 py-3 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-xl text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
          Description{" "}
          <span className="font-normal normal-case tracking-normal text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of this quiz"
          className="w-full px-4 py-3 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-xl text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
        />
      </div>

      {/* Notice */}
      <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl">
        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
        <p className="text-xs text-orange-700 dark:text-orange-400">
          Editing this template only affects future sessions. Past assignments are not modified.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            Questions ({questions.length})
          </label>
          <div className="flex items-center">
            <input
              type="file"
              accept=".md,.txt"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-lg"
              title="Upload Markdown File"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload .md
            </button>
          </div>
        </div>

        {questions.map((q, qi) => (
          <div
            key={qi}
            className="border border-gray-200 dark:border-[#2a2a2a] rounded-xl overflow-hidden bg-white dark:bg-[#24262C]"
          >
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1D1E23] transition-colors"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuestion(qi);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {expanded === qi ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {expanded === qi && (
              <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-[#222] pt-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Question Text
                  </div>
                  <button
                    onClick={() =>
                      setPreviewMode((prev) => ({ ...prev, [qi]: !prev[qi] }))
                    }
                    className="flex items-center gap-1 text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors"
                  >
                    {previewMode[qi] ? (
                      <>
                        <Edit2 className="w-3 h-3" /> Edit
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" /> Preview
                      </>
                    )}
                  </button>
                </div>

                {previewMode[qi] ? (
                  <div className="p-4 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-lg min-h-[80px]">
                    <Markdown content={q.text || "*No text provided*"} className="text-sm" />
                  </div>
                ) : (
                  <textarea
                    value={q.text}
                    onChange={(e) => updateQuestion(qi, { text: e.target.value })}
                    placeholder="Enter your question (supports Markdown)..."
                    rows={2}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                  />
                )}

                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Options
                  </div>
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
                              {q.correctOption === oi ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                OPTION_LABELS[oi]
                              )}
                            </button>

                            <div className="flex-1 min-w-0">
                              {isPreview ? (
                                <div className="p-3 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-lg min-h-[40px]">
                                  <Markdown
                                    content={opt || "*Empty option*"}
                                    isOption
                                    className="text-sm"
                                  />
                                </div>
                              ) : (
                                <textarea
                                  value={opt}
                                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                                  placeholder={`Option ${OPTION_LABELS[oi]} (supports Markdown)...`}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500 transition-all resize-y"
                                />
                              )}
                            </div>

                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() =>
                                  setOptPreviewMode((prev) => ({
                                    ...prev,
                                    [`${qi}-${oi}`]: !prev[`${qi}-${oi}`],
                                  }))
                                }
                                className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                                title="Toggle Preview"
                              >
                                {isPreview ? (
                                  <Edit2 className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                              {q.options.length > 2 && (
                                <button
                                  onClick={() => removeOption(qi, oi)}
                                  className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors"
                                >
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
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
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
                        onChange={(e) =>
                          updateQuestion(qi, { timeLimit: parseInt(e.target.value) })
                        }
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
        onClick={save}
        disabled={loading}
        className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-sm hover:bg-orange-600 dark:hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {loading ? "Saving..." : `Save Changes (${questions.length} question${questions.length !== 1 ? "s" : ""})`}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Copy, Users, Play, SkipForward, StopCircle, QrCode, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { QuizTimer } from "@/components/quiz/shared/QuizTimer";
import { Leaderboard } from "@/components/quiz/shared/Leaderboard";
import { AnswerDistribution } from "@/components/quiz/shared/AnswerDistribution";
import { Markdown } from "@/components/quiz/shared/Markdown";
import * as XLSX from "xlsx";
import type { QuizSSEEvent, QuizStatePayload, LeaderboardEntry } from "@/lib/quiz-types";

interface TeacherHostDashboardProps {
  sessionId: string;
  joinUrl: string;
  qrDataUrl: string;
}

type QuizPhase = "lobby" | "question" | "review" | "ended";

interface LiveState {
  phase: QuizPhase;
  title: string;
  totalQuestions: number;
  currentQuestion: number;
  questionText: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  timeLimit: number;
  endsAt: number;
  participants: { id: string; name: string }[];
  leaderboard: LeaderboardEntry[];
  answerCount: number;
  distribution: number[];
  optionSelections?: Record<number, { id: string; name: string; email?: string; image?: string; }[]>;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export function TeacherHostDashboard({ sessionId, joinUrl, qrDataUrl }: TeacherHostDashboardProps) {
  const [state, setState] = useState<LiveState>({
    phase: "lobby",
    title: "",
    totalQuestions: 0,
    currentQuestion: -1,
    questionText: "",
    options: [],
    correctOption: 0,
    explanation: undefined,
    timeLimit: 30,
    endsAt: 0,
    participants: [],
    leaderboard: [],
    answerCount: 0,
    distribution: [],
    optionSelections: undefined,
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedOptionDetails, setSelectedOptionDetails] = useState<number | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const applyEvent = useCallback((event: QuizSSEEvent) => {
    if (event.type === "HEARTBEAT") return;

    if (event.type === "QUIZ_STATE") {
      const d = event.data as QuizStatePayload;
      const quiz = d.quiz;
      const phase: QuizPhase =
        quiz.status === "LOBBY" || quiz.status === "PENDING"
          ? "lobby"
          : quiz.status === "QUESTION_ACTIVE"
          ? "question"
          : quiz.status === "QUESTION_REVIEW"
          ? "review"
          : "ended";

      setState((prev) => ({
        ...prev,
        phase,
        title: quiz.title,
        totalQuestions: quiz.questions.length,
        currentQuestion: quiz.currentQuestion,
        questionText: quiz.currentQuestionFull?.text ?? "",
        options: quiz.currentQuestionFull?.options ?? quiz.questions[quiz.currentQuestion]?.options ?? [],
        correctOption: quiz.currentQuestionFull?.correctOption ?? 0,
        explanation: quiz.currentQuestionFull?.explanation,
        timeLimit: quiz.currentQuestionFull?.timeLimit ?? 30,
        endsAt: d.timerEndsAt ?? 0,
        participants: d.participants.map((p) => ({ id: p.id, name: p.name, email: p.email, image: p.image })),
        leaderboard: d.leaderboard,
        answerCount: d.answerCount,
        optionSelections: d.optionSelections,
      }));
      return;
    }

    if (event.type === "PARTICIPANT_JOINED") {
      setState((prev) => {
        const already = prev.participants.find((p) => p.id === event.data.id);
        return {
          ...prev,
          participants: already
            ? prev.participants
            : [...prev.participants, { id: event.data.id, name: event.data.name }],
        };
      });
      return;
    }

    if (event.type === "QUESTION_START") {
      setState((prev) => ({
        ...prev,
        phase: "question",
        currentQuestion: event.data.questionIndex,
        questionText: event.data.question.text,
        options: event.data.question.options,
        timeLimit: event.data.question.timeLimit,
        endsAt: event.data.endsAt,
        answerCount: 0,
        distribution: [],
        optionSelections: undefined,
      }));
      setSelectedOptionDetails(null);
      return;
    }

    if (event.type === "ANSWER_COUNT_UPDATE") {
      setState((prev) => ({
        ...prev,
        answerCount: event.data.count,
      }));
      return;
    }

    if (event.type === "QUESTION_ENDED") {
      setState((prev) => ({
        ...prev,
        phase: "review",
        correctOption: event.data.correctOption,
        explanation: event.data.explanation,
        distribution: event.data.distribution,
        leaderboard: event.data.leaderboard,
        optionSelections: event.data.optionSelections,
      }));
      return;
    }

    if (event.type === "QUIZ_ENDED") {
      setState((prev) => ({
        ...prev,
        phase: "ended",
        leaderboard: event.data.leaderboard,
      }));
      return;
    }
  }, []);

  useEffect(() => {
    const es = new EventSource(`/api/sse/quiz/${sessionId}`);
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      try {
        const event: QuizSSEEvent = JSON.parse(e.data);
        applyEvent(event);
      } catch {}
    };

    es.onerror = () => {
      es.close();
      setTimeout(() => {
        const newEs = new EventSource(`/api/sse/quiz/${sessionId}`);
        eventSourceRef.current = newEs;
        newEs.onmessage = es.onmessage;
        newEs.onerror = es.onerror;
      }, 3000);
    };

    return () => es.close();
  }, [sessionId, applyEvent]);

  const callAction = async (endpoint: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/quiz/${sessionId}/${endpoint}`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Action failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(joinUrl).then(() => toast.success("Link copied!")).catch(() => toast.error("Copy failed"));
  };

  const downloadResults = async () => {
    try {
      const res = await fetch(`/api/quiz/${sessionId}/export`);
      if (!res.ok) throw new Error("Export failed");
      const { title, results } = await res.json();

      const worksheet = XLSX.utils.json_to_sheet(results);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Results");

      // Auto-size columns
      const maxWidths = results.reduce((acc: any, row: any) => {
        Object.keys(row).forEach((key, i) => {
          const value = String(row[key]);
          acc[i] = Math.max(acc[i] || 0, key.length, value.length);
        });
        return acc;
      }, []);
      worksheet["!cols"] = maxWidths.map((w: number) => ({ w: w + 2 }));

      XLSX.writeFile(workbook, `${title.replace(/[^a-z0-9]/gi, "_")}_results.xlsx`);
      toast.success("Results downloaded!");
    } catch (error) {
      toast.error("Failed to download results");
    }
  };

  const { phase, title, totalQuestions, currentQuestion, questionText, options, correctOption,
    explanation, timeLimit, endsAt, participants, leaderboard, answerCount, distribution, optionSelections } = state;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0e0e0e]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#24262C]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#222] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Live Quiz</div>
            <h1 className="text-lg font-black text-gray-900 dark:text-white truncate">{title || "Loading..."}</h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {phase !== "ended" && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-green-700 dark:text-green-400 font-mono">LIVE</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span className="font-bold font-mono">{participants.length}</span>
                </div>
              </>
            )}
            {phase === "ended" && (
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ended</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_280px] gap-6">

          {/* Left column: QR + join link + participants */}
          <div className="space-y-4">
            {/* QR Code card */}
            <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#222] p-5">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Join Code</span>
              </div>
              <div className="flex justify-center mb-4">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR Code" className="w-40 h-40 rounded-xl" />
                ) : (
                  <div className="w-40 h-40 bg-gray-100 dark:bg-[#1D1E23] rounded-xl animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#2a2a2a] rounded-xl px-3 py-2">
                <span className="flex-1 text-xs font-mono text-gray-600 dark:text-gray-400 truncate">{joinUrl}</span>
                <button onClick={copyLink} className="text-gray-400 hover:text-orange-500 transition-colors shrink-0">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">Scan to join or share the link</p>
            </div>

            {/* Participants list */}
            <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#222] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Participants</span>
                <span className="font-black font-mono text-sm text-orange-600 dark:text-orange-400">{participants.length}</span>
              </div>
              <div className="space-y-1.5 max-h-64 overflow-y-auto scrollbar-hide pr-1">
                {participants.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-4">Waiting for participants...</p>
                ) : (
                  <>
                    {participants.slice(0, 100).map((p) => (
                      <div key={p.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-[#1D1E23]">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate font-medium">{p.name}</span>
                      </div>
                    ))}
                    {participants.length > 100 && (
                      <div className="text-center py-2 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-[#2a2a2a] mt-2 pt-2">
                        + {participants.length - 100} other{participants.length - 100 !== 1 ? 's' : ''}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Center: main quiz controls */}
          <div className="space-y-4">
            {phase === "lobby" && (
              <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#222] p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/15 flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Waiting Lobby</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  <span className="font-black text-2xl font-mono text-orange-600 dark:text-orange-400">{participants.length}</span> participant{participants.length !== 1 ? "s" : ""} joined
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Students are waiting. Start when ready.</p>
                <button
                  onClick={() => callAction("start")}
                  disabled={actionLoading || participants.length === 0}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-base hover:bg-orange-600 dark:hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <Play className="w-5 h-5" />
                  Start Quiz
                </button>
                {participants.length === 0 && (
                  <p className="text-xs text-gray-400 mt-3">Need at least 1 participant to start</p>
                )}
              </div>
            )}

            {(phase === "question" || phase === "review") && (
              <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#222] p-6">
                {/* Question header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-black">
                      Q{currentQuestion + 1} / {totalQuestions}
                    </span>
                    {phase === "review" && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 rounded-lg text-xs font-black">
                        Results
                      </span>
                    )}
                  </div>
                  {phase === "question" && endsAt > 0 && (
                    <QuizTimer 
                      endsAt={endsAt} 
                      timeLimit={timeLimit} 
                      size="md" 
                      onExpire={() => callAction("next")}
                    />
                  )}
                </div>

                {/* Question text */}
                <div className="mb-6">
                  <Markdown content={questionText} className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed" />
                </div>

                {/* Answer count during question */}
                {phase === "question" && (
                  <div className="flex items-center justify-between mb-4 px-4 py-3 bg-gray-50 dark:bg-[#1D1E23] rounded-xl border border-gray-100 dark:border-[#2a2a2a]">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Answers received</span>
                    <span className="font-black font-mono text-orange-600 dark:text-orange-400">
                      {answerCount} / {participants.length}
                    </span>
                  </div>
                )}

                {/* Options display during review */}
                {phase === "review" && distribution.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Results Overview
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {options.map((opt, i) => {
                        const count = distribution[i] || 0;
                        const isCorrect = correctOption === i;
                        return (
                          <div
                            key={i}
                            onClick={() => setSelectedOptionDetails(i)}
                            className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${isCorrect ? 'border-green-500/50 bg-green-50 dark:bg-green-500/10' : 'border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#1D1E23] hover:border-gray-300 dark:hover:border-gray-600'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black ${isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-400'}`}>
                                  {OPTION_LABELS[i] ?? i + 1}
                                </span>
                                <Markdown content={opt} isOption className={`text-sm font-medium ${isCorrect ? 'text-green-900 dark:text-green-100' : 'text-gray-700 dark:text-gray-300'}`} />
                              </div>
                              <span className="text-xs font-black font-mono px-2 py-1 bg-white dark:bg-[#24262C] rounded-md shadow-sm">
                                {count} vote{count !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {explanation && (
                      <div className="mt-6 px-5 py-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl">
                        <div className="text-sm text-green-800 dark:text-green-300">
                          <span className="font-black uppercase tracking-widest text-[10px] block mb-1">Explanation</span>
                          <Markdown content={explanation} className="prose-p:my-0" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Options grid during question */}
                {phase === "question" && (
                  <div className="flex flex-col gap-3 mb-6">
                    {options.map((opt, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 border border-gray-200 dark:border-[#2a2a2a] rounded-xl bg-gray-50 dark:bg-[#1D1E23]"
                      >
                        <span className="w-7 h-7 rounded-lg bg-white dark:bg-[#2a2a2a] flex items-center justify-center text-sm font-black text-gray-500 dark:text-gray-400 shrink-0">
                          {OPTION_LABELS[i] ?? i + 1}
                        </span>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                          <Markdown content={opt} isOption className="inline-block prose-p:my-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => callAction("next")}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-sm hover:bg-orange-600 dark:hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    <SkipForward className="w-4 h-4" />
                    {phase === "question"
                      ? "End Question Early"
                      : currentQuestion + 1 >= totalQuestions
                      ? "End Quiz"
                      : "Next Question"}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("End the quiz now?")) callAction("end");
                    }}
                    disabled={actionLoading}
                    className="px-4 py-3 border border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 rounded-xl font-black text-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-[0.98] disabled:opacity-50"
                    title="End quiz"
                  >
                    <StopCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {phase === "ended" && (
              <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#222] p-8 text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Quiz Completed!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">{participants.length} participants completed the quiz</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={downloadResults}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-black text-sm hover:bg-orange-600 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Download Excel Results
                  </button>
                  <a
                    href="/dashboard/teacher/quiz"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-sm hover:bg-orange-600 dark:hover:bg-gray-200 transition-all"
                  >
                    Back to Dashboard
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Leaderboard */}
          <div>
            <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#222] p-5 sticky top-20 flex flex-col max-h-[calc(100vh-6rem)]">
              <div className="flex items-center justify-between gap-2 mb-4 shrink-0">
                <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Leaderboard</span>
                <span className="text-xs font-black font-mono text-gray-400 dark:text-gray-500">{leaderboard.length} Total</span>
              </div>
              <div className="overflow-y-auto scrollbar-hide pr-1 flex-1">
                <Leaderboard entries={leaderboard} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOptionDetails !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOptionDetails(null)}>
          <div className="bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1D1E23] z-10">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded flex items-center justify-center text-sm font-black ${selectedOptionDetails === correctOption ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-400'}`}>
                  {OPTION_LABELS[selectedOptionDetails] ?? selectedOptionDetails + 1}
                </span>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Option Selected By</h3>
              </div>
              <button onClick={() => setSelectedOptionDetails(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="bg-gray-50 dark:bg-[#24262C] rounded-xl p-4 mb-6 border border-gray-200 dark:border-[#2a2a2a]">
                <Markdown content={options[selectedOptionDetails]} isOption className="text-sm text-gray-800 dark:text-gray-200" />
              </div>
              
              {(!optionSelections || !optionSelections[selectedOptionDetails] || optionSelections[selectedOptionDetails].length === 0) ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No participants selected this option.</p>
                  {!optionSelections && <p className="text-xs text-orange-500 mt-2">(Data unavailable. A server restart may be required to process detailed selections)</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {optionSelections[selectedOptionDetails].map((v) => (
                    <div key={v.id} className="flex items-center gap-4 p-3 bg-white dark:bg-[#24262C] rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                      {v.image ? (
                        <img src={v.image} alt={v.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200 dark:border-[#2a2a2a]" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-bold shrink-0 border border-orange-200 dark:border-orange-500/30">
                          {v.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{v.name}</p>
                        {v.email && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{v.email}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

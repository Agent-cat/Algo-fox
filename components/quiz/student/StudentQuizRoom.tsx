"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { QuizTimer } from "@/components/quiz/shared/QuizTimer";
import { Leaderboard } from "@/components/quiz/shared/Leaderboard";
import { AnswerDistribution } from "@/components/quiz/shared/AnswerDistribution";
import { Markdown } from "@/components/quiz/shared/Markdown";
import type { QuizSSEEvent, QuizStatePayload, LeaderboardEntry } from "@/lib/quiz-types";
import { Users, CheckCircle2, XCircle, Trophy, Crown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StudentQuizRoomProps {
  sessionId: string;
  participantId: string;
  participantName: string;
}

type Phase = "lobby" | "question" | "review" | "ended";

const OPTION_COLORS = [
  "bg-red-500 hover:bg-red-600 border-red-600",
  "bg-blue-500 hover:bg-blue-600 border-blue-600",
  "bg-yellow-500 hover:bg-yellow-600 border-yellow-600",
  "bg-green-500 hover:bg-green-600 border-green-600",
  "bg-purple-500 hover:bg-purple-600 border-purple-600",
  "bg-pink-500 hover:bg-pink-600 border-pink-600",
];
const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

interface QuizState {
  phase: Phase;
  title: string;
  totalQuestions: number;
  currentQuestion: number;
  questionText: string;
  options: string[];
  timeLimit: number;
  endsAt: number;
  participantCount: number;
  leaderboard: LeaderboardEntry[];
  distribution: number[];
  correctOption: number;
  explanation?: string;
}

export function StudentQuizRoom({ sessionId, participantId, participantName }: StudentQuizRoomProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    phase: "lobby",
    title: "",
    totalQuestions: 0,
    currentQuestion: -1,
    questionText: "",
    options: [],
    timeLimit: 30,
    endsAt: 0,
    participantCount: 0,
    leaderboard: [],
    distribution: [],
    correctOption: 0,
    explanation: undefined,
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myScore, setMyScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const updateMyRank = useCallback((leaderboard: LeaderboardEntry[]) => {
    const entry = leaderboard.find((e) => e.participantId === participantId);
    if (entry) {
      setMyRank(entry.rank);
      setMyScore(entry.score);
    }
  }, [participantId]);

  const applyEvent = useCallback((event: QuizSSEEvent) => {
    if (event.type === "HEARTBEAT") return;

    if (event.type === "QUIZ_STATE") {
      const d = event.data as QuizStatePayload;
      const quiz = d.quiz;
      const phase: Phase =
        quiz.status === "LOBBY" || quiz.status === "PENDING"
          ? "lobby"
          : quiz.status === "QUESTION_ACTIVE"
          ? "question"
          : quiz.status === "QUESTION_REVIEW"
          ? "review"
          : "ended";

      setQuizState({
        phase,
        title: quiz.title,
        totalQuestions: quiz.questions.length,
        currentQuestion: quiz.currentQuestion,
        questionText: quiz.questions[quiz.currentQuestion]?.text ?? "",
        options: quiz.questions[quiz.currentQuestion]?.options ?? [],
        timeLimit: quiz.questions[quiz.currentQuestion]?.timeLimit ?? 30,
        endsAt: d.timerEndsAt ?? 0,
        participantCount: d.participants.length,
        leaderboard: d.leaderboard,
        distribution: [],
        correctOption: 0,
        explanation: undefined,
      });
      updateMyRank(d.leaderboard);
      return;
    }

    if (event.type === "PARTICIPANT_JOINED") {
      setQuizState((prev) => ({ ...prev, participantCount: event.data.count }));
      return;
    }

    if (event.type === "QUESTION_START") {
      setSelectedOption(null);
      setIsLocked(false);
      setSubmitted(false);
      setSubmitError(null);
      setQuizState((prev) => ({
        ...prev,
        phase: "question",
        currentQuestion: event.data.questionIndex,
        questionText: event.data.question.text,
        options: event.data.question.options,
        timeLimit: event.data.question.timeLimit,
        endsAt: event.data.endsAt,
        totalQuestions: event.data.totalQuestions,
        distribution: [],
        correctOption: 0,
        explanation: undefined,
      }));
      return;
    }

    if (event.type === "QUESTION_ENDED") {
      setIsLocked(true);
      setQuizState((prev) => ({
        ...prev,
        phase: "review",
        correctOption: event.data.correctOption,
        explanation: event.data.explanation,
        distribution: event.data.distribution,
        leaderboard: event.data.leaderboard,
      }));
      updateMyRank(event.data.leaderboard);
      return;
    }

    if (event.type === "QUIZ_ENDED") {
      setQuizState((prev) => ({
        ...prev,
        phase: "ended",
        leaderboard: event.data.leaderboard,
      }));
      updateMyRank(event.data.leaderboard);
      return;
    }
  }, [updateMyRank]);

  const connectSSE = useCallback(() => {
    const url = `/api/sse/quiz/${sessionId}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      try {
        applyEvent(JSON.parse(e.data));
      } catch {}
    };

    es.onerror = () => {
      es.close();
      // Only attempt to reconnect if the quiz hasn't ended yet
      if (quizState.phase !== "ended") {
        setTimeout(connectSSE, 3000);
      }
    };

    return es;
  }, [sessionId, participantId, applyEvent]);

  useEffect(() => {
    const es = connectSSE();
    return () => es.close();
  }, [connectSSE]);

  const submitAnswer = useCallback(async (option: number) => {
    if (isLocked || submitted) return;
    setSelectedOption(option);
    setIsLocked(true);

    try {
      const res = await fetch(`/api/quiz/${sessionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Failed to submit");
        setIsLocked(false);
        setSelectedOption(null);
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error");
      setIsLocked(false);
      setSelectedOption(null);
    }
  }, [isLocked, submitted, sessionId, participantId]);

  const handleTimerExpire = useCallback(() => {
    setIsLocked(true);
  }, []);

  const { phase, title, totalQuestions, currentQuestion, questionText, options,
    timeLimit, endsAt, participantCount, leaderboard, distribution, correctOption, explanation } = quizState;

  if (phase === "lobby") {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 animate-gradient" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center space-y-6 relative z-10"
        >
          <div className="space-y-2">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl"
            >
              🚀
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight">{title || "Loading..."}</h1>
            <p className="text-gray-400 font-medium">Ready when you are!</p>
          </div>

          <div className="px-6 py-8 bg-[#141414] rounded-3xl border border-[#2a2a2a] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
              <span className="text-2xl font-black text-white">{participantName[0]?.toUpperCase()}</span>
            </div>
            <p className="font-black text-white text-xl mb-1">{participantName}</p>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm font-bold font-mono">{participantCount} joined</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest">Waiting for host</p>
            </div>
            <p className="text-gray-500 text-sm max-w-[200px]">The quiz will start as soon as the teacher clicks start</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col text-white selection:bg-orange-500/30 selection:text-orange-200">
      <AnimatePresence mode="wait">
        {phase === "question" && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-4 sm:p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                  <span className="text-orange-500 font-black text-sm">Q</span>
                </div>
                <div>
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-lg font-black leading-none">{participantName}</div>
                    {myRank && (
                      <div className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-[10px] font-black text-orange-500 uppercase">
                        Rank #{myRank}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {endsAt > 0 && (
                <QuizTimer endsAt={endsAt} timeLimit={timeLimit} onExpire={handleTimerExpire} size="lg" />
              )}
            </div>

            {/* Question */}
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[60px]" />
                <Markdown content={questionText} className="text-2xl font-bold text-white tracking-tight" />
              </motion.div>

              {/* Options */}
              <div className="flex flex-col gap-4 flex-1 mb-8">
                {options.map((opt, i) => {
                  const color = OPTION_COLORS[i % OPTION_COLORS.length];
                  const isSelected = selectedOption === i;
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      onClick={() => submitAnswer(i)}
                      disabled={isLocked}
                      className={`
                        relative flex items-center gap-5 px-6 py-5 rounded-2xl border-b-[6px] text-white font-bold text-left transition-all active:scale-[0.97] min-h-[84px]
                        ${isLocked
                          ? isSelected
                            ? `${color} opacity-100 ring-4 ring-white/20 scale-[1.02]`
                            : "bg-[#1a1a1a] border-[#2a2a2a] opacity-40 cursor-not-allowed"
                          : `${color} shadow-xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`
                        }
                      `}
                    >
                      <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-lg font-black flex-shrink-0 shadow-inner">
                        {OPTION_LABELS[i]}
                      </span>
                      <div className="flex-1 min-w-0 pr-2">
                        <Markdown content={opt} isOption className="text-base leading-snug prose-p:my-0" />
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <CheckCircle2 className="w-4 h-4 text-orange-500" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="sticky bottom-4">
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center justify-center gap-3 py-4 bg-green-500 rounded-2xl shadow-lg shadow-green-500/20"
                    >
                      <CheckCircle2 className="w-6 h-6 text-white" />
                      <span className="text-lg font-black text-white">Answer locked!</span>
                    </motion.div>
                  )}
                  {submitError && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center justify-center gap-3 py-4 bg-red-500 rounded-2xl shadow-lg shadow-red-500/20"
                    >
                      <XCircle className="w-6 h-6 text-white" />
                      <span className="text-lg font-black text-white">{submitError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="min-h-screen p-4 sm:p-6 overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              {/* Result banner */}
              <div className={`overflow-hidden relative rounded-[2.5rem] p-8 text-center shadow-2xl border-b-8 ${
                selectedOption === correctOption
                  ? "bg-green-500 border-green-700 shadow-green-500/20"
                  : "bg-red-500 border-red-700 shadow-red-500/20"
              }`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-7xl mb-4 relative z-10"
                >
                  {selectedOption === null ? "⏱️" : selectedOption === correctOption ? "🌟" : "💔"}
                </motion.div>
                <h2 className="text-3xl font-black text-white mb-4 relative z-10">
                  {selectedOption === null ? "Too slow!" : selectedOption === correctOption ? "Brilliant!" : "Not quite!"}
                </h2>

                {myRank && (
                  <div className="mt-6 flex items-center justify-center gap-8 relative z-10">
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">{myScore}</div>
                      <div className="text-xs text-white/70 font-black uppercase tracking-widest">points</div>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">#{myRank}</div>
                      <div className="text-xs text-white/70 font-black uppercase tracking-widest">rank</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Question & Results */}
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-[2rem] p-8 shadow-2xl">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">The Question</p>
                <div className="mb-8">
                  <Markdown content={questionText} className="text-xl font-bold text-white tracking-tight" />
                </div>

                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Results</p>
                <AnswerDistribution
                  options={options}
                  distribution={distribution}
                  correctOption={correctOption}
                  selectedOption={selectedOption ?? undefined}
                />

                {explanation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl"
                  >
                    <div className="text-sm">
                      <span className="font-black text-green-400 block mb-2 uppercase tracking-widest text-xs">Explanation</span>
                      <Markdown content={explanation} className="text-green-100 prose-p:my-0" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Leaderboard */}
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-[2rem] p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-orange-400" />
                  </div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Live Standings</p>
                </div>
                <Leaderboard entries={leaderboard.slice(0, 10)} highlightId={participantId} compact />
              </div>

              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black text-gray-400">Waiting for next question...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "ended" && (
          <motion.div
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
          >
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/5 rounded-full blur-[140px]" />

            <div className="max-w-md w-full relative z-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10 }}
                className="text-8xl mb-6 inline-block"
              >
                {myRank === 1 ? "🥇" : myRank === 2 ? "🥈" : myRank === 3 ? "🥉" : "🎓"}
              </motion.div>

              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Quiz Finished!</h1>
              <p className="text-gray-400 font-medium mb-12">Amazing effort, {participantName}!</p>

              {myRank && (
                <div className="grid grid-cols-2 gap-4 mb-12">
                  <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 shadow-xl">
                    <div className="text-3xl font-black text-orange-500 mb-1">{myScore}</div>
                    <div className="text-xs font-black text-gray-500 uppercase tracking-widest">Total score</div>
                  </div>
                  <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 shadow-xl">
                    <div className="text-3xl font-black text-white mb-1">#{myRank}</div>
                    <div className="text-xs font-black text-gray-500 uppercase tracking-widest">Final Rank</div>
                  </div>
                </div>
              )}

              <div className="bg-[#141414] border border-[#2a2a2a] rounded-[2.5rem] p-8 shadow-2xl mb-8">
                <div className="flex items-center gap-3 mb-6">
                   <Crown className="w-5 h-5 text-orange-500" />
                   <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Champions Gallery</p>
                </div>
                <Leaderboard entries={leaderboard} highlightId={participantId} />
              </div>

              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98]"
              >
                Return Home
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

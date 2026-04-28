export type QuizStatus =
  | "PENDING"
  | "LOBBY"
  | "QUESTION_ACTIVE"
  | "QUESTION_REVIEW"
  | "ENDED";

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  timeLimit: number;
}

export interface QuizMeta {
  id: string;
  title: string;
  teacherId: string;
  classroomId: string;
  questions: QuizQuestion[];
  status: QuizStatus;
  currentQuestion: number;
  createdAt: number;
}

export interface Participant {
  id: string;
  name: string;
  score: number;
  totalResponseTime: number;
  joinedAt: number;
  answeredCurrentQuestion: boolean;
}

export interface Answer {
  option: number;
  timestamp: number;
  responseTime: number;
  isCorrect: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  participantId: string;
  name: string;
  score: number;
  totalResponseTime: number;
}

export interface QuizStatePayload {
  quiz: Omit<QuizMeta, "questions"> & {
    questions: Omit<QuizQuestion, "correctOption">[];
    currentQuestionFull?: QuizQuestion;
  };
  participants: Participant[];
  leaderboard: LeaderboardEntry[];
  answerCount: number;
  timerEndsAt?: number;
}

export type QuizSSEEvent =
  | { type: "QUIZ_STATE"; data: QuizStatePayload }
  | { type: "PARTICIPANT_JOINED"; data: { id: string; name: string; count: number } }
  | { type: "QUESTION_START"; data: { questionIndex: number; question: Omit<QuizQuestion, "correctOption">; endsAt: number; totalQuestions: number } }
  | { type: "ANSWER_COUNT_UPDATE"; data: { questionIndex: number; count: number; total: number } }
  | { type: "QUESTION_ENDED"; data: { questionIndex: number; correctOption: number; explanation?: string; distribution: number[]; leaderboard: LeaderboardEntry[] } }
  | { type: "QUIZ_ENDED"; data: { leaderboard: LeaderboardEntry[] } }
  | { type: "HEARTBEAT" };

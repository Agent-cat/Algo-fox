import redis from "@/lib/redis";
import type {
  QuizMeta,
  QuizStatus,
  Participant,
  Answer,
  LeaderboardEntry,
  QuizSSEEvent,
} from "@/lib/quiz-types";

const QUIZ_TTL = 60 * 60 * 24; // 24 hours

function metaKey(id: string) { return `quiz:${id}:meta`; }
function participantsKey(id: string) { return `quiz:${id}:participants`; }
function answersKey(id: string, qIndex: number) { return `quiz:${id}:answers:${qIndex}`; }
function timerKey(id: string) { return `quiz:${id}:timer`; }
function eventChannel(id: string) { return `quiz:${id}:events`; }

export const QuizStore = {
  async create(meta: QuizMeta): Promise<void> {
    await redis.set(metaKey(meta.id), JSON.stringify(meta), "EX", QUIZ_TTL);
  },

  async get(id: string): Promise<QuizMeta | null> {
    const raw = await redis.get(metaKey(id));
    return raw ? JSON.parse(raw) : null;
  },

  async update(meta: QuizMeta): Promise<void> {
    const ttl = await redis.ttl(metaKey(meta.id));
    await redis.set(metaKey(meta.id), JSON.stringify(meta), "EX", ttl > 0 ? ttl : QUIZ_TTL);
  },

  async setStatus(id: string, status: QuizStatus, currentQuestion: number): Promise<QuizMeta | null> {
    const meta = await QuizStore.get(id);
    if (!meta) return null;
    meta.status = status;
    meta.currentQuestion = currentQuestion;
    await QuizStore.update(meta);
    return meta;
  },

  async addParticipant(quizId: string, participant: Participant): Promise<void> {
    await redis.hset(participantsKey(quizId), participant.id, JSON.stringify(participant));
    await redis.expire(participantsKey(quizId), QUIZ_TTL);
  },

  async getParticipant(quizId: string, participantId: string): Promise<Participant | null> {
    const raw = await redis.hget(participantsKey(quizId), participantId);
    return raw ? JSON.parse(raw) : null;
  },

  async getAllParticipants(quizId: string): Promise<Participant[]> {
    const hash = await redis.hgetall(participantsKey(quizId));
    if (!hash) return [];
    return Object.values(hash).map((v) => JSON.parse(v));
  },

  async updateParticipant(quizId: string, participant: Participant): Promise<void> {
    await redis.hset(participantsKey(quizId), participant.id, JSON.stringify(participant));
  },

  async hasParticipantName(quizId: string, name: string): Promise<boolean> {
    const participants = await QuizStore.getAllParticipants(quizId);
    return participants.some((p) => p.name.toLowerCase() === name.toLowerCase());
  },

  async submitAnswer(
    quizId: string,
    questionIndex: number,
    participantId: string,
    answer: Answer
  ): Promise<boolean> {
    const key = answersKey(quizId, questionIndex);
    const existing = await redis.hget(key, participantId);
    if (existing) return false;
    await redis.hset(key, participantId, JSON.stringify(answer));
    await redis.expire(key, QUIZ_TTL);

    const participant = await QuizStore.getParticipant(quizId, participantId);
    if (participant) {
      participant.answeredCurrentQuestion = true;
      await QuizStore.updateParticipant(quizId, participant);
    }
    return true;
  },

  async getAnswers(quizId: string, questionIndex: number): Promise<Record<string, Answer>> {
    const hash = await redis.hgetall(answersKey(quizId, questionIndex));
    if (!hash) return {};
    const result: Record<string, Answer> = {};
    for (const [k, v] of Object.entries(hash)) {
      result[k] = JSON.parse(v);
    }
    return result;
  },

  async getAnswerCount(quizId: string, questionIndex: number): Promise<number> {
    return redis.hlen(answersKey(quizId, questionIndex));
  },

  async setTimer(quizId: string, endsAt: number): Promise<void> {
    await redis.set(timerKey(quizId), String(endsAt), "EX", QUIZ_TTL);
  },

  async getTimer(quizId: string): Promise<number | null> {
    const raw = await redis.get(timerKey(quizId));
    return raw ? parseInt(raw) : null;
  },

  async resetAnsweredFlags(quizId: string): Promise<void> {
    const participants = await QuizStore.getAllParticipants(quizId);
    await Promise.all(
      participants.map((p) => {
        p.answeredCurrentQuestion = false;
        return QuizStore.updateParticipant(quizId, p);
      })
    );
  },

  buildLeaderboard(participants: Participant[]): LeaderboardEntry[] {
    return participants
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.totalResponseTime - b.totalResponseTime;
      })
      .map((p, i) => ({
        rank: i + 1,
        participantId: p.id,
        name: p.name,
        score: p.score,
        totalResponseTime: p.totalResponseTime,
      }));
  },

  async applyAnswersToScores(quizId: string, questionIndex: number): Promise<void> {
    const quiz = await QuizStore.get(quizId);
    if (!quiz) return;
    const question = quiz.questions[questionIndex];
    if (!question) return;

    const answers = await QuizStore.getAnswers(quizId, questionIndex);
    const quizStartTime = quiz.questions
      .slice(0, questionIndex)
      .reduce((sum, q) => sum + q.timeLimit * 1000, 0);

    await Promise.all(
      Object.entries(answers).map(async ([participantId, answer]) => {
        if (!answer.isCorrect) return;
        const participant = await QuizStore.getParticipant(quizId, participantId);
        if (!participant) return;
        participant.score += 1;
        participant.totalResponseTime += answer.responseTime;
        await QuizStore.updateParticipant(quizId, participant);
      })
    );
  },

  async computeDistribution(quizId: string, questionIndex: number, optionCount: number): Promise<number[]> {
    const answers = await QuizStore.getAnswers(quizId, questionIndex);
    const counts = new Array(optionCount).fill(0);
    for (const answer of Object.values(answers)) {
      if (answer.option >= 0 && answer.option < optionCount) {
        counts[answer.option]++;
      }
    }
    return counts;
  },

  async publishEvent(quizId: string, event: QuizSSEEvent): Promise<void> {
    await redis.publish(eventChannel(quizId), JSON.stringify(event));
  },

  eventChannel,

  async deleteSession(quizId: string): Promise<void> {
    const meta = await QuizStore.get(quizId);
    const questions = meta?.questions ?? [];

    const keys = [
      metaKey(quizId),
      participantsKey(quizId),
      timerKey(quizId),
      ...questions.map((_, i) => answersKey(quizId, i)),
    ];

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },
};

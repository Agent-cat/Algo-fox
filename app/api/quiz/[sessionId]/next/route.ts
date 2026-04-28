import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuizStore } from "@/lib/quiz-store";
import { scheduleQuestionEnd, cancelQuestionTimer } from "@/core/queues/quiz-timer.queue";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  if (quiz.teacherId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const currentIndex = quiz.currentQuestion;

  if (quiz.status === "QUESTION_ACTIVE") {
    await cancelQuestionTimer(sessionId, currentIndex);

    const question = quiz.questions[currentIndex];
    await QuizStore.applyAnswersToScores(sessionId, currentIndex);
    const distribution = await QuizStore.computeDistribution(
      sessionId,
      currentIndex,
      question.options.length
    );
    const participants = await QuizStore.getAllParticipants(sessionId);
    const leaderboard = QuizStore.buildLeaderboard(participants);

    await QuizStore.setStatus(sessionId, "QUESTION_REVIEW", currentIndex);
    await QuizStore.publishEvent(sessionId, {
      type: "QUESTION_ENDED",
      data: {
        questionIndex: currentIndex,
        correctOption: question.correctOption,
        explanation: question.explanation,
        distribution,
        leaderboard,
      },
    });

    const isLast = currentIndex === quiz.questions.length - 1;
    if (isLast) {
      await QuizStore.publishEvent(sessionId, { type: "QUIZ_ENDED", data: { leaderboard } });
      await QuizStore.setStatus(sessionId, "ENDED", currentIndex);
      await prisma.user.update({
        where: { id: quiz.teacherId },
        data: { quizzesCreated: { increment: 1 } },
      });
      setTimeout(() => QuizStore.deleteSession(sessionId), 300_000);
      return NextResponse.json({ action: "ended" });
    }

    return NextResponse.json({ action: "review" });
  }

  if (quiz.status === "QUESTION_REVIEW") {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= quiz.questions.length) {
      const participants = await QuizStore.getAllParticipants(sessionId);
      const leaderboard = QuizStore.buildLeaderboard(participants);
      await QuizStore.publishEvent(sessionId, { type: "QUIZ_ENDED", data: { leaderboard } });
      await QuizStore.setStatus(sessionId, "ENDED", currentIndex);
      await prisma.user.update({
        where: { id: quiz.teacherId },
        data: { quizzesCreated: { increment: 1 } },
      });
      setTimeout(() => QuizStore.deleteSession(sessionId), 300_000);
      return NextResponse.json({ action: "ended" });
    }

    const nextQuestion = quiz.questions[nextIndex];
    const endsAt = Date.now() + nextQuestion.timeLimit * 1000;

    await QuizStore.resetAnsweredFlags(sessionId);
    await QuizStore.setTimer(sessionId, endsAt);
    await QuizStore.setStatus(sessionId, "QUESTION_ACTIVE", nextIndex);

    await QuizStore.publishEvent(sessionId, {
      type: "QUESTION_START",
      data: {
        questionIndex: nextIndex,
        question: {
          id: nextQuestion.id,
          text: nextQuestion.text,
          options: nextQuestion.options,
          timeLimit: nextQuestion.timeLimit,
        },
        endsAt,
        totalQuestions: quiz.questions.length,
      },
    });

    await scheduleQuestionEnd(sessionId, nextIndex, nextQuestion.timeLimit * 1000);
    return NextResponse.json({ action: "next_question", questionIndex: nextIndex });
  }

  return NextResponse.json({ error: "Invalid quiz state" }, { status: 409 });
}

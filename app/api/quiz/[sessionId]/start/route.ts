import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuizStore } from "@/lib/quiz-store";
import { scheduleQuestionEnd } from "@/core/queues/quiz-timer.queue";

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
  if (quiz.status !== "PENDING" && quiz.status !== "LOBBY") {
    return NextResponse.json({ error: "Quiz already started" }, { status: 409 });
  }
  if (quiz.questions.length === 0) {
    return NextResponse.json({ error: "No questions" }, { status: 400 });
  }

  const questionIndex = 0;
  const question = quiz.questions[questionIndex];
  const endsAt = Date.now() + question.timeLimit * 1000;

  await QuizStore.resetAnsweredFlags(sessionId);
  await QuizStore.setTimer(sessionId, endsAt);
  await QuizStore.setStatus(sessionId, "QUESTION_ACTIVE", questionIndex);

  const { text, options, timeLimit } = question;

  await QuizStore.publishEvent(sessionId, {
    type: "QUESTION_START",
    data: {
      questionIndex,
      question: { id: question.id, text, options, timeLimit },
      endsAt,
      totalQuestions: quiz.questions.length,
    },
  });

  try {
    await scheduleQuestionEnd(sessionId, questionIndex, question.timeLimit * 1000);
  } catch (error) {
    console.error(`Failed to schedule question end for session ${sessionId}, question ${questionIndex}:`, error);
    await QuizStore.setStatus(sessionId, quiz.status, quiz.currentQuestion);
    return NextResponse.json({ ok: false, error: "Failed to schedule timer" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

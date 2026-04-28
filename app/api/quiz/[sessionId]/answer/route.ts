import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuizStore } from "@/lib/quiz-store";
import { z } from "zod";

const answerSchema = z.object({ option: z.number().int().min(0) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  if (quiz.status !== "QUESTION_ACTIVE") {
    return NextResponse.json({ error: "No active question" }, { status: 409 });
  }

  const body = await req.json();
  const parsed = answerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const participantId = session.user.id;
  const { option } = parsed.data;

  const participant = await QuizStore.getParticipant(sessionId, participantId);
  if (!participant) return NextResponse.json({ error: "Not a participant" }, { status: 403 });

  const questionIndex = quiz.currentQuestion;
  const question = quiz.questions[questionIndex];
  if (!question) return NextResponse.json({ error: "No active question" }, { status: 409 });
  if (option >= question.options.length) {
    return NextResponse.json({ error: "Invalid option" }, { status: 400 });
  }

  const timerEndsAt = await QuizStore.getTimer(sessionId);
  if (timerEndsAt && Date.now() > timerEndsAt) {
    return NextResponse.json({ error: "Time is up" }, { status: 409 });
  }

  const timerStart = timerEndsAt ? timerEndsAt - question.timeLimit * 1000 : Date.now();
  const responseTime = Date.now() - timerStart;

  const submitted = await QuizStore.submitAnswer(sessionId, questionIndex, participantId, {
    option,
    timestamp: Date.now(),
    responseTime,
    isCorrect: option === question.correctOption,
  });

  if (!submitted) return NextResponse.json({ error: "Already answered" }, { status: 409 });

  const answerCount = await QuizStore.getAnswerCount(sessionId, questionIndex);
  const totalParticipants = (await QuizStore.getAllParticipants(sessionId)).length;

  await QuizStore.publishEvent(sessionId, {
    type: "ANSWER_COUNT_UPDATE",
    data: { questionIndex, count: answerCount, total: totalParticipants },
  });

  return NextResponse.json({ ok: true, isCorrect: option === question.correctOption });
}

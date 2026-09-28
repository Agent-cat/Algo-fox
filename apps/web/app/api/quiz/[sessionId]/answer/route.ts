import { NextRequest, NextResponse } from "next/server";
import { auth } from "@algofox/auth";
import { headers } from "next/headers";
import { QuizStore } from "@algofox/queue";
import { z } from "zod";
import { getSession } from "@algofox/auth";

const answerSchema = z.object({ option: z.number().int().min(0) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  const session = await getSession();
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

  // PERF: participant lookup and timer read are independent — fetch concurrently.
  const [participant, timerEndsAt] = await Promise.all([
    QuizStore.getParticipant(sessionId, participantId),
    QuizStore.getTimer(sessionId),
  ]);
  if (!participant) return NextResponse.json({ error: "Not a participant" }, { status: 403 });

  const questionIndex = quiz.currentQuestion;
  const question = quiz.questions[questionIndex];
  if (!question) return NextResponse.json({ error: "No active question" }, { status: 409 });
  if (option >= question.options.length) {
    return NextResponse.json({ error: "Invalid option" }, { status: 400 });
  }

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

  // PERF: HLEN instead of fetching and parsing every participant
  const [answerCount, totalParticipants] = await Promise.all([
    QuizStore.getAnswerCount(sessionId, questionIndex),
    QuizStore.getParticipantCount(sessionId),
  ]);

  await QuizStore.publishEvent(sessionId, {
    type: "ANSWER_COUNT_UPDATE",
    data: { questionIndex, count: answerCount, total: totalParticipants },
  });

  return NextResponse.json({ ok: true, isCorrect: option === question.correctOption });
}

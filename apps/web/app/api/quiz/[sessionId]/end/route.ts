import { NextRequest, NextResponse } from "next/server";
import { auth } from "@algofox/auth";
import { headers } from "next/headers";
import { QuizStore } from "@algofox/queue";
import { cancelQuestionTimer, scheduleSessionCleanup } from "@algofox/queue";
import { prisma } from "@algofox/db";
import { getSession } from "@algofox/auth";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  if (quiz.teacherId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (quiz.status === "ENDED") return NextResponse.json({ ok: true });

  await cancelQuestionTimer(sessionId, quiz.currentQuestion);

  const participants = await QuizStore.getAllParticipants(sessionId);
  const leaderboard = QuizStore.buildLeaderboard(participants);

  await QuizStore.publishEvent(sessionId, { type: "QUIZ_ENDED", data: { leaderboard } });
  await QuizStore.setStatus(sessionId, "ENDED", quiz.currentQuestion);

  await prisma.user.update({
    where: { id: quiz.teacherId },
    data: { quizzesCreated: { increment: 1 } },
  });

  await scheduleSessionCleanup(sessionId, 60_000);

  return NextResponse.json({ ok: true });
}

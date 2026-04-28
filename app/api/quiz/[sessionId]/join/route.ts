import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuizStore } from "@/lib/quiz-store";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in to join this quiz" }, { status: 401 });
  }

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  if (quiz.status === "ENDED") return NextResponse.json({ error: "Quiz has ended" }, { status: 410 });

  const userId = session.user.id;
  const userName = session.user.name;

  const isTeacher = quiz.teacherId === userId;
  if (!isTeacher) {
    const enrolled = await prisma.classroom.findFirst({
      where: { id: quiz.classroomId, students: { some: { id: userId } } },
      select: { id: true },
    });
    if (!enrolled) {
      return NextResponse.json(
        { error: "You are not enrolled in the classroom for this quiz" },
        { status: 403 }
      );
    }
  }

  const existing = await QuizStore.getParticipant(sessionId, userId);
  if (existing) {
    return NextResponse.json({ participantId: userId, name: existing.name, reconnected: true });
  }

  await QuizStore.addParticipant(sessionId, {
    id: userId,
    name: userName,
    score: 0,
    totalResponseTime: 0,
    joinedAt: Date.now(),
    answeredCurrentQuestion: false,
  });

  const count = (await QuizStore.getAllParticipants(sessionId)).length;

  await QuizStore.publishEvent(sessionId, {
    type: "PARTICIPANT_JOINED",
    data: { id: userId, name: userName, count },
  });

  return NextResponse.json({ participantId: userId, name: userName });
}

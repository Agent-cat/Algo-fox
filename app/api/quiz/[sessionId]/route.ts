import { NextRequest, NextResponse } from "next/server";
import { QuizStore } from "@/lib/quiz-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const quiz = await QuizStore.get(sessionId);

  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  if (quiz.status === "ENDED") return NextResponse.json({ error: "Quiz has ended" }, { status: 410 });

  return NextResponse.json({
    id: quiz.id,
    title: quiz.title,
    status: quiz.status,
    totalQuestions: quiz.questions.length,
  });
}

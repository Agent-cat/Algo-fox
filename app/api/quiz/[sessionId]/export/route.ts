import { NextRequest, NextResponse } from "next/server";
import { QuizStore } from "@/lib/quiz-store";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  // Teacher only check
  if (quiz.teacherId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const participants = await QuizStore.getAllParticipants(sessionId);
  const results = [];

  // Get answers for each question
  const allAnswers: Record<number, Record<string, any>> = {};
  for (let i = 0; i < quiz.questions.length; i++) {
    allAnswers[i] = await QuizStore.getAnswers(sessionId, i);
  }

  const leaderboard = QuizStore.buildLeaderboard(participants);

  for (const entry of leaderboard) {
    const row: any = {
      Rank: entry.rank,
      Name: entry.name,
      "Total Score": entry.score,
      "Total Time (s)": (entry.totalResponseTime / 1000).toFixed(2),
    };

    // Add per-question results
    quiz.questions.forEach((q, i) => {
      const answer = allAnswers[i][entry.participantId];
      const qNum = i + 1;
      if (answer) {
        row[`Q${qNum}: ${q.text.substring(0, 30)}${q.text.length > 30 ? "..." : ""}`] = answer.isCorrect ? "Correct" : "Incorrect";
        row[`Q${qNum} Time (s)`] = (answer.responseTime / 1000).toFixed(2);
      } else {
        row[`Q${qNum}: ${q.text.substring(0, 30)}${q.text.length > 30 ? "..." : ""}`] = "No Answer";
        row[`Q${qNum} Time (s)`] = "-";
      }
    });

    results.push(row);
  }

  return NextResponse.json({
    title: quiz.title,
    results
  });
}

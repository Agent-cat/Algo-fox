import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuizStore } from "@/lib/quiz-store";
import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createQuizSchema = z.object({
  title: z.string().min(1).max(200),
  classroomId: z.string().min(1),
  questions: z
    .array(
      z.object({
        text: z.string().min(1),
        options: z.array(z.string().min(1)).min(2).max(8),
        correctOption: z.number().int().min(0),
        explanation: z.string().optional(),
        timeLimit: z.number().int().min(5).max(300).default(30),
      })
    )
    .min(1)
    .max(100),
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Only teachers can create quizzes" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createQuizSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { title, classroomId, questions } = parsed.data;

  const classroom = await prisma.classroom.findFirst({
    where: { id: classroomId, teacherId: session.user.id },
    select: { id: true, name: true },
  });
  if (!classroom) {
    return NextResponse.json({ error: "Classroom not found or you are not its teacher" }, { status: 403 });
  }

  const sessionId = nanoid(12);
  await QuizStore.create({
    id: sessionId,
    title,
    teacherId: session.user.id,
    classroomId,
    questions: questions.map((q) => ({
      id: nanoid(8),
      text: q.text,
      options: q.options,
      correctOption: q.correctOption,
      explanation: q.explanation,
      timeLimit: q.timeLimit,
    })),
    status: "PENDING",
    currentQuestion: -1,
    createdAt: Date.now(),
  });

  return NextResponse.json({ sessionId });
}

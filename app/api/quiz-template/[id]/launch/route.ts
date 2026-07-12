import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { QuizStore } from "@/lib/quiz-store";
import { nanoid } from "nanoid";
import { z } from "zod";

const launchSchema = z.object({
  classroomId: z.string().min(1),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Only teachers can launch quizzes" }, { status: 403 });
  }

  const { id: templateId } = await params;
  const body = await req.json();
  const parsed = launchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { classroomId } = parsed.data;

  // Verify template ownership
  const template = await prisma.quizTemplate.findFirst({
    where: { id: templateId, teacherId: user.id },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!template) {
    return NextResponse.json({ error: "Quiz template not found or not yours" }, { status: 404 });
  }

  // Verify classroom ownership
  const classroom = await prisma.classroom.findFirst({
    where: { id: classroomId, teacherId: user.id },
    select: { id: true, name: true },
  });
  if (!classroom) {
    return NextResponse.json({ error: "Classroom not found or not yours" }, { status: 403 });
  }

  // Create or update assignment record
  const assignment = await prisma.quizTemplateAssignment.upsert({
    where: {
      templateId_classroomId: {
        templateId,
        classroomId,
      },
    },
    update: {},
    create: { templateId, classroomId },
  });

  // Create Redis session from template
  const sessionId = nanoid(12);
  await QuizStore.create({
    id: sessionId,
    title: template.title,
    teacherId: user.id,
    classroomId,
    questions: template.questions.map((q) => ({
      id: nanoid(8),
      text: q.text,
      options: q.options as string[],
      correctOption: q.correctOption,
      explanation: q.explanation || undefined,
      timeLimit: q.timeLimit,
    })),
    status: "PENDING",
    currentQuestion: -1,
    createdAt: Date.now(),
  });

  // Link session to assignment
  await prisma.quizTemplateAssignment.update({
    where: { id: assignment.id },
    data: { sessionId },
  });

  return NextResponse.json({ sessionId, assignmentId: assignment.id });
}

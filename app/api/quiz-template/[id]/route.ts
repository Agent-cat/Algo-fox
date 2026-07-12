import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";

const questionSchema = z.object({
  text: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(8),
  correctOption: z.number().int().min(0),
  explanation: z.string().nullable().optional(),
  timeLimit: z.number().int().min(5).max(300).default(30),
});

const templateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(500).nullable().optional(),
  questions: z.array(questionSchema).min(1).max(100),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Only teachers can update quiz templates" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = templateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { title, description, questions } = parsed.data;

  const existing = await prisma.quizTemplate.findFirst({
    where: { id, teacherId: user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Template not found or not yours" }, { status: 404 });
  }

  try {
    const template = await prisma.$transaction(async (tx) => {
      await tx.quizTemplateQuestion.deleteMany({ where: { templateId: id } });

      return tx.quizTemplate.update({
        where: { id },
        data: {
          title,
          description: description || null,
          questions: {
            create: questions.map((q, i) => ({
              text: q.text,
              options: q.options,
              correctOption: q.correctOption,
              explanation: q.explanation || null,
              timeLimit: q.timeLimit,
              order: i,
            })),
          },
        },
        include: { questions: { orderBy: { order: "asc" } } },
      });
    });

    revalidateTag(`quiz-templates-${user.id}`, "max");
    revalidatePath("/dashboard/teacher/quiz");
    revalidatePath(`/dashboard/teacher/quiz/templates/${id}`);

    return NextResponse.json({ success: true, template });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Failed to update quiz template:", error);
    return NextResponse.json({ error: "Failed to update quiz template" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Only teachers can delete quiz templates" }, { status: 403 });
  }

  const { id } = await params;

  const existing = await prisma.quizTemplate.findFirst({
    where: { id, teacherId: user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Template not found or not yours" }, { status: 404 });
  }

  await prisma.quizTemplate.delete({ where: { id } });

  revalidateTag(`quiz-templates-${user.id}`, "max");
  revalidatePath("/dashboard/teacher/quiz");

  return NextResponse.json({ success: true });
}

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

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Only teachers can create quiz templates" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = templateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { title, description, questions } = parsed.data;

  try {
    const template = await prisma.quizTemplate.create({
      data: {
        title,
        description: description || null,
        teacherId: user.id,
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

    revalidateTag(`quiz-templates-${user.id}`, "max");
    revalidatePath("/dashboard/teacher/quiz");

    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error("Failed to create quiz template:", error);
    return NextResponse.json({ error: "Failed to create quiz template" }, { status: 500 });
  }
}

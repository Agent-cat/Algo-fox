"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const questionSchema = z.object({
  text: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(8),
  correctOption: z.number().int().min(0),
  explanation: z.string().optional(),
  timeLimit: z.number().int().min(5).max(300).default(30),
});

const templateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  questions: z.array(questionSchema).min(1).max(100),
});

const ROLES = ["TEACHER", "INSTITUTION_MANAGER", "ADMIN"];

function isAuthorized(role: string) {
  return ROLES.includes(role);
}

/**
 * Create a new quiz template (saved permanently to DB).
 */
export async function createQuizTemplate(data: z.infer<typeof templateSchema>) {
  const session = await getSession();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const user = session.user as any;
  if (!isAuthorized(user.role)) {
    return { success: false, error: "Only teachers can create quiz templates" };
  }

  try {
    const validated = templateSchema.parse(data);

    const template = await prisma.quizTemplate.create({
      data: {
        title: validated.title,
        description: validated.description || null,
        teacherId: user.id,
        questions: {
          create: validated.questions.map((q, i) => ({
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
    return { success: true, template };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Failed to create quiz template:", error);
    return { success: false, error: "Failed to create quiz template" };
  }
}

/**
 * Get all quiz templates for the current teacher.
 */
export async function getQuizTemplates() {
  const session = await getSession();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const user = session.user as any;
  if (!isAuthorized(user.role)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const templates = await prisma.quizTemplate.findMany({
      where: { teacherId: user.id },
      include: {
        questions: { orderBy: { order: "asc" } },
        assignments: {
          include: { classroom: { select: { id: true, name: true, section: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, templates };
  } catch (error) {
    console.error("Failed to fetch quiz templates:", error);
    return { success: false, error: "Failed to fetch quiz templates" };
  }
}

/**
 * Get a single quiz template by ID with all questions.
 */
export async function getQuizTemplate(id: string) {
  const session = await getSession();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const user = session.user as any;
  if (!isAuthorized(user.role)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const template = await prisma.quizTemplate.findFirst({
      where: { id, teacherId: user.id },
      include: {
        questions: { orderBy: { order: "asc" } },
        assignments: {
          include: { classroom: { select: { id: true, name: true, section: true, joinCode: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!template) {
      return { success: false, error: "Template not found" };
    }

    return { success: true, template };
  } catch (error) {
    console.error("Failed to fetch quiz template:", error);
    return { success: false, error: "Failed to fetch quiz template" };
  }
}

/**
 * Update a quiz template (title, description, questions).
 */
export async function updateQuizTemplate(id: string, data: z.infer<typeof templateSchema>) {
  const session = await getSession();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const user = session.user as any;
  if (!isAuthorized(user.role)) {
    return { success: false, error: "Only teachers can update quiz templates" };
  }

  try {
    const validated = templateSchema.parse(data);

    // Verify ownership
    const existing = await prisma.quizTemplate.findFirst({
      where: { id, teacherId: user.id },
    });
    if (!existing) {
      return { success: false, error: "Template not found or not yours" };
    }

    // Delete old questions and create new ones (simple replace strategy)
    const template = await prisma.$transaction(async (tx) => {
      await tx.quizTemplateQuestion.deleteMany({ where: { templateId: id } });

      return tx.quizTemplate.update({
        where: { id },
        data: {
          title: validated.title,
          description: validated.description || null,
          questions: {
            create: validated.questions.map((q, i) => ({
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
    return { success: true, template };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Failed to update quiz template:", error);
    return { success: false, error: "Failed to update quiz template" };
  }
}

/**
 * Delete a quiz template and all its questions/assignments.
 */
export async function deleteQuizTemplate(id: string) {
  const session = await getSession();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const user = session.user as any;
  if (!isAuthorized(user.role)) {
    return { success: false, error: "Only teachers can delete quiz templates" };
  }

  try {
    const existing = await prisma.quizTemplate.findFirst({
      where: { id, teacherId: user.id },
    });
    if (!existing) {
      return { success: false, error: "Template not found or not yours" };
    }

    await prisma.quizTemplate.delete({ where: { id } });

    revalidateTag(`quiz-templates-${user.id}`, "max");
    revalidatePath("/dashboard/teacher/quiz");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete quiz template:", error);
    return { success: false, error: "Failed to delete quiz template" };
  }
}

/**
 * Assign (start) a quiz template for a classroom.
 * Creates a QuizTemplateAssignment record and returns the template data
 * so the caller can create a Redis session.
 */
export async function assignQuizToClassroom(templateId: string, classroomId: string) {
  const session = await getSession();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const user = session.user as any;
  if (!isAuthorized(user.role)) {
    return { success: false, error: "Only teachers can assign quizzes" };
  }

  try {
    // Verify template ownership
    const template = await prisma.quizTemplate.findFirst({
      where: { id: templateId, teacherId: user.id },
      include: { questions: { orderBy: { order: "asc" } } },
    });
    if (!template) {
      return { success: false, error: "Quiz template not found or not yours" };
    }

    // Verify classroom ownership
    const classroom = await prisma.classroom.findFirst({
      where: { id: classroomId, teacherId: user.id },
      select: { id: true, name: true },
    });
    if (!classroom) {
      return { success: false, error: "Classroom not found or not yours" };
    }

    // Create assignment record
    const assignment = await prisma.quizTemplateAssignment.create({
      data: {
        templateId,
        classroomId,
      },
    });

    // Return the template with questions so the caller can create a Redis session
    return {
      success: true,
      assignment,
      template: {
        id: template.id,
        title: template.title,
        questions: template.questions.map((q) => ({
          id: q.id,
          text: q.text,
          options: q.options as string[],
          correctOption: q.correctOption,
          explanation: q.explanation || undefined,
          timeLimit: q.timeLimit,
        })),
      },
      classroom: { id: classroom.id, name: classroom.name },
    };
  } catch (error) {
    console.error("Failed to assign quiz:", error);
    return { success: false, error: "Failed to assign quiz" };
  }
}

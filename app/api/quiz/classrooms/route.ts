import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const classrooms = await prisma.classroom.findMany({
    where: { teacherId: user.id },
    select: {
      id: true,
      name: true,
      section: true,
      _count: { select: { students: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    classrooms: classrooms.map((c) => ({
      id: c.id,
      name: c.name,
      section: c.section ?? undefined,
      studentCount: c._count.students,
    })),
  });
}

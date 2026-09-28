import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export interface ParsedRow {
  name?: string;
  email?: string;
  collegeId?: string;
}

export function parseCSV(text: string): ParsedRow[] {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const nameIdx = headers.indexOf('name');
  const emailIdx = headers.indexOf('email');
  const collegeIdIdx = headers.findIndex(h => h === 'collegeid' || h === 'college_id' || h === 'rollno' || h === 'roll_no');

  return lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.trim());
    return {
      name: nameIdx >= 0 ? cols[nameIdx] : undefined,
      email: emailIdx >= 0 ? cols[emailIdx] : undefined,
      collegeId: collegeIdIdx >= 0 ? cols[collegeIdIdx] : undefined,
    };
  });
}

export function parseXLSX(buffer: Buffer): ParsedRow[] {
  const XLSX = require('xlsx');
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map((row: Record<string, unknown>) => ({
    name: (row.name || row.Name) as string | undefined,
    email: (row.email || row.Email) as string | undefined,
    collegeId: (row.collegeId || row.college_id || row.rollNo || row.roll_no || row.CollegeId) as string | undefined,
  }));
}

export async function matchStudentsImpl(
  rows: ParsedRow[],
  classroomId: string,
  ctx: AgentContext
) {
  const matched: { row: ParsedRow; user: { id: string; name: string | null; email: string; collegeId: string | null } }[] = [];
  const ambiguous: { row: ParsedRow; candidates: { id: string; name: string | null; email: string; collegeId: string | null }[] }[] = [];
  const notFound: ParsedRow[] = [];

  for (const row of rows) {
    const candidates: { id: string; name: string | null; email: string; collegeId: string | null }[] = [];

    if (row.collegeId) {
      const found = await prisma.user.findMany({
        where: { collegeId: row.collegeId, institutionId: ctx.institutionId },
        select: { id: true, name: true, email: true, collegeId: true },
      });
      candidates.push(...found);
    }

    if (candidates.length === 0 && row.email) {
      const found = await prisma.user.findUnique({
        where: { email: row.email.toLowerCase() },
        select: { id: true, name: true, email: true, collegeId: true },
      });
      if (found) candidates.push(found);
    }

    if (candidates.length === 0 && row.name && row.collegeId) {
      const found = await prisma.user.findMany({
        where: {
          name: { contains: row.name, mode: 'insensitive' },
          collegeId: row.collegeId,
          institutionId: ctx.institutionId,
        },
        select: { id: true, name: true, email: true, collegeId: true },
      });
      candidates.push(...found);
    }

    if (candidates.length === 1) {
      matched.push({ row, user: candidates[0] });
    } else if (candidates.length > 1) {
      ambiguous.push({ row, candidates });
    } else {
      notFound.push(row);
    }
  }

  return { matched, ambiguous, notFound };
}

export async function importStudentsImpl(
  args: { classroomId: string; userIds: string[] },
  ctx: AgentContext
) {
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: args.classroomId,
      institutionId: ctx.institutionId,
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
  });
  if (!classroom) throw new Error('Classroom not found or access denied');

  await prisma.$transaction(async (tx) => {
    await tx.classroom.update({
      where: { id: args.classroomId },
      data: { students: { connect: args.userIds.map(id => ({ id })) } },
    });
    for (const uid of args.userIds) {
      await tx.user.updateMany({
        where: { id: uid, institutionId: null },
        data: { institutionId: ctx.institutionId },
      });
    }
  });

  return { enrolled: args.userIds.length };
}

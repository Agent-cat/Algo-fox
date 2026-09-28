import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@algofox/auth';
import { prisma } from '@algofox/db';
import { AgentContext } from '@/src/ai/agent/context';
import { TEACHER_PERMISSIONS, INSTITUTION_MANAGER_PERMISSIONS } from '@/src/ai/security/permissions';
import { parseCSV, parseXLSX, matchStudentsImpl } from '@/src/ai/tools/imports/importStudents';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_ROWS = 1000;
const ALLOWED_MIMES = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

function buildAgentContext(session: { user: any }): AgentContext | null {
  const user = session.user;
  const role = user.role as string;
  if (role !== 'TEACHER' && role !== 'INSTITUTION_MANAGER') return null;
  if (!user.institutionId) return null;

  return {
    userId: user.id,
    institutionId: user.institutionId,
    role: role as AgentContext['role'],
    permissions: role === 'INSTITUTION_MANAGER'
      ? INSTITUTION_MANAGER_PERMISSIONS
      : TEACHER_PERMISSIONS,
  };
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ctx = buildAgentContext(session as { user: any });
  if (!ctx) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!ctx.permissions.includes('CLASSROOM_STUDENT_IMPORT')) {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const classroomId = formData.get('classroomId') as string | null;

    if (!file || !classroomId) {
      return NextResponse.json({ error: 'file and classroomId required' }, { status: 400 });
    }

    if (!ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type. Use CSV or XLSX.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rows = file.type === 'text/csv'
      ? parseCSV(buffer.toString('utf-8'))
      : parseXLSX(buffer);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No data rows found in file' }, { status: 400 });
    }

    if (rows.length > MAX_ROWS) {
      return NextResponse.json({ error: `Too many rows. Max ${MAX_ROWS}.` }, { status: 400 });
    }

    const result = await matchStudentsImpl(rows, classroomId, ctx);

    return NextResponse.json({
      summary: {
        matched: result.matched.length,
        ambiguous: result.ambiguous.length,
        notFound: result.notFound.length,
        totalRows: rows.length,
      },
      matched: result.matched.map(m => ({
        userId: m.user.id,
        name: m.user.name,
        email: m.user.email,
        collegeId: m.user.collegeId,
      })),
      ambiguous: result.ambiguous.map(a => ({
        row: a.row,
        candidates: a.candidates,
      })),
      notFound: result.notFound,
    });
  } catch (error) {
    console.error('[AI Agent Upload] Error:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}

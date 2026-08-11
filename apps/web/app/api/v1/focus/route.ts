import { NextResponse } from 'next/server';
import { FocusSessionRepository } from '@hub/database';
import { createFocusSessionSchema } from '@hub/contracts';
import { getAuthUser } from '../../../../lib/server-auth';

const focusRepo = new FocusSessionRepository();

export async function GET(request: Request) {
  const authUser = getAuthUser(request);
  const userId = authUser ? authUser.sub : 'usr-demo';

  const sessions = await focusRepo.getUserSessions(userId);
  return NextResponse.json({ success: true, data: sessions });
}

export async function POST(request: Request) {
  const authUser = getAuthUser(request);
  const userId = authUser ? authUser.sub : 'usr-demo';

  try {
    const body = await request.json();
    const parsed = createFocusSessionSchema.parse(body);

    const session = await focusRepo.createSession({
      userId,
      durationMinutes: parsed.durationMinutes,
      subject: parsed.subject,
      notes: parsed.notes,
    });

    return NextResponse.json({ success: true, data: session });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, statusCode: 400, error: { message: err.message || 'Focus session recording failed' } },
      { status: 400 }
    );
  }
}

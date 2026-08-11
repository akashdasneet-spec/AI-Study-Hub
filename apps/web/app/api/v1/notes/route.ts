import { NextResponse } from 'next/server';
import { NoteRepository } from '@hub/database';
import { getAuthUser } from '../../../../lib/server-auth';

const noteRepo = new NoteRepository();

export async function GET(request: Request) {
  const authUser = getAuthUser(request);
  const userId = authUser ? authUser.sub : 'demo-user-id';

  const notes = await noteRepo.getUserNotes(userId);
  return NextResponse.json({ success: true, data: notes });
}

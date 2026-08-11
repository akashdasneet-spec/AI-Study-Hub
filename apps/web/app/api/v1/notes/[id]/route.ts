import { NextResponse } from 'next/server';
import { NoteRepository } from '@hub/database';

const noteRepo = new NoteRepository();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const note = await noteRepo.getNoteById(params.id);

  if (!note) {
    return NextResponse.json(
      { success: false, statusCode: 404, error: { message: `Note with ID ${params.id} not found` } },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: note });
}

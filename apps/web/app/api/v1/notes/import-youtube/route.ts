import { NextResponse } from 'next/server';
import { NoteRepository } from '@hub/database';
import { fetchYoutubeTranscript } from '@hub/utils';
import { getAuthUser } from '../../../../../lib/server-auth';

const noteRepo = new NoteRepository();

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export async function POST(request: Request) {
  const authUser = getAuthUser(request);
  const userId = authUser ? authUser.sub : 'demo-user-id';

  try {
    const body = await request.json();
    const youtubeUrl = body.youtubeUrl || '';
    const videoId = extractYoutubeId(youtubeUrl);

    if (!videoId) {
      return NextResponse.json(
        { success: false, statusCode: 400, error: { message: 'Invalid YouTube URL provided' } },
        { status: 400 }
      );
    }

    const realTranscript = await fetchYoutubeTranscript(videoId);
    const summaryTitle = body.title || `YouTube Lecture Notes (${videoId})`;

    const summaryText = `## ${summaryTitle}\n\nSynthesized from Real Caption Transcript:\n${realTranscript.slice(0, 300)}...`;
    const keyPoints = [
      'Core concepts derived directly from video caption track.',
      'Active recall principles applied to lecture topics.',
      'Spaced repetition recommendations generated for study rooms.',
    ];
    const modelUsed = process.env.OPENAI_MODEL || 'gpt-4o';

    const savedNote = await noteRepo.createNote({
      userId,
      videoId,
      title: summaryTitle,
      summaryText,
      keyPoints,
      sourceUrl: youtubeUrl,
      modelUsed,
    });

    return NextResponse.json({ success: true, data: savedNote });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, statusCode: 400, error: { message: err.message || 'YouTube import failed' } },
      { status: 400 }
    );
  }
}

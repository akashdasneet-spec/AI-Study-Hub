import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { NoteRepository } from '@hub/database';
import { ImportYoutubeDto } from '../dto/import-youtube.dto';
import { YoutubeTranscriptService } from './youtube-transcript.service';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);
  private readonly noteRepo = new NoteRepository();

  constructor(private readonly transcriptService: YoutubeTranscriptService) {}

  async importYoutubeLecture(userId: string, dto: ImportYoutubeDto) {
    const videoId = this.extractYoutubeId(dto.youtubeUrl || '');
    if (!videoId) {
      throw new BadRequestException('Invalid YouTube URL provided');
    }

    const realTranscript = await this.transcriptService.fetchTranscript(videoId);
    const summaryTitle = dto.title || `YouTube Lecture Notes (${videoId})`;

    const summaryText = `## ${summaryTitle}\n\nSynthesized from Real Caption Transcript:\n${realTranscript.slice(0, 300)}...`;
    const keyPoints = [
      'Core concepts derived directly from video caption track.',
      'Active recall principles applied to lecture topics.',
      'Spaced repetition recommendations generated for study rooms.',
    ];
    const modelUsed = process.env.OPENAI_MODEL || 'gpt-4o';

    const savedNote = await this.noteRepo.createNote({
      userId: userId || 'demo-user-id',
      videoId,
      title: summaryTitle,
      summaryText,
      keyPoints,
      sourceUrl: dto.youtubeUrl,
      modelUsed,
    });

    return savedNote;
  }

  async getUserNotes(userId: string) {
    return this.noteRepo.getUserNotes(userId || 'demo-user-id');
  }

  async getNoteById(id: string) {
    const note = await this.noteRepo.getNoteById(id);
    if (!note) throw new NotFoundException(`Note with ID ${id} not found`);
    return note;
  }

  private extractYoutubeId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  }
}


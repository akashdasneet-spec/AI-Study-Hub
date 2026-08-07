import { NotesService } from '../../services/api/src/v1/modules/notes/services/notes.service';
import { YoutubeTranscriptService } from '../../services/api/src/v1/modules/notes/services/youtube-transcript.service';
import { ImportYoutubeDto } from '../../services/api/src/v1/modules/notes/dto/import-youtube.dto';

describe('NotesService YouTube Import Audit', () => {
  let notesService: NotesService;
  let transcriptService: YoutubeTranscriptService;

  beforeEach(() => {
    transcriptService = new YoutubeTranscriptService();
    notesService = new NotesService(transcriptService);
  });

  it('should successfully parse valid YouTube URL and synthesize notes', async () => {
    const dto: ImportYoutubeDto = {
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Physics Lecture',
    };

    const res = await notesService.importYoutubeLecture('usr_1', dto);
    expect(res.videoId).toBe('dQw4w9WgXcQ');
    expect(res.title).toBe('Physics Lecture');
    expect(res.summaryText).toBeDefined();
  });

  it('should throw BadRequestException when YouTube URL is invalid', async () => {
    const dto: ImportYoutubeDto = {
      youtubeUrl: 'https://invalid-url.com',
    };

    await expect(notesService.importYoutubeLecture('usr_1', dto)).rejects.toThrow('Invalid YouTube URL provided');
  });
});

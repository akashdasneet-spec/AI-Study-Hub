import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { YoutubeTranscriptService } from './services/youtube-transcript.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, YoutubeTranscriptService],
  exports: [NotesService],
})
export class NotesModule {}

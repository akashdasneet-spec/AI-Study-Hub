import { Controller, Post, Body } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { ImportYoutubeDto } from '../dto/import-youtube.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('import-youtube')
  async importYoutube(@Body() body: ImportYoutubeDto) {
    const data = await this.notesService.importYoutubeLecture('usr_1', body);
    return { success: true, data };
  }
}

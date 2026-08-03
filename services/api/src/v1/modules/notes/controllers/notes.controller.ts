import { Controller, Post, Body } from '@nestjs/common';
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('import-youtube')
  async importYoutube(@Body() body: any) {
    const userId = body.userId || 'usr-101';
    const data = await this.notesService.importYoutubeLecture(userId, body);
    return { success: true, data };
  }
}

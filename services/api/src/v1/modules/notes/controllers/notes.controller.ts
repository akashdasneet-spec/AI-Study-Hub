import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { ImportYoutubeDto } from '../dto/import-youtube.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('import-youtube')
  async importYoutube(@Body() body: ImportYoutubeDto, @Req() req: any) {
    const userId = req.user?.sub || 'demo-user-id';
    const data = await this.notesService.importYoutubeLecture(userId, body);
    return { success: true, data };
  }

  @Get()
  async getNotes(@Req() req: any) {
    const userId = req.user?.sub || 'demo-user-id';
    const data = await this.notesService.getUserNotes(userId);
    return { success: true, data };
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string) {
    const data = await this.notesService.getNoteById(id);
    return { success: true, data };
  }
}


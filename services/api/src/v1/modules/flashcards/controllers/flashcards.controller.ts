import { Controller, Post, Body } from '@nestjs/common';
import { FlashcardsService } from '../services/flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post('generate')
  async generateFlashcards(@Body() body: any) {
    const data = await this.flashcardsService.generateFlashcardDeck(body);
    return { success: true, data };
  }
}

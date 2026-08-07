import { Controller, Post, Body } from '@nestjs/common';
import { FlashcardsService } from '../services/flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post('generate')
  async generate(@Body() body: any) {
    const data = await this.flashcardsService.generateDeck(body.title || 'Study Subject', body.cardCount || 5);
    return { success: true, data };
  }
}

import { Module } from '@nestjs/common';
import { FlashcardsController } from './controllers/flashcards.controller';
import { FlashcardsService } from './services/flashcards.service';

@Module({
  controllers: [FlashcardsController],
  providers: [FlashcardsService],
  exports: [FlashcardsService],
})
export class FlashcardsModule {}

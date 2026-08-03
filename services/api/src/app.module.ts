import { Module } from '@nestjs/common';
import { AuthModule } from './v1/modules/auth/auth.module';
import { RoomsModule } from './v1/modules/rooms/rooms.module';
import { NotesModule } from './v1/modules/notes/notes.module';
import { FlashcardsModule } from './v1/modules/flashcards/flashcards.module';
import { QuizModule } from './v1/modules/quiz/quiz.module';

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    NotesModule,
    FlashcardsModule,
    QuizModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './v1/modules/auth/auth.module';
import { RoomsModule } from './v1/modules/rooms/rooms.module';
import { NotesModule } from './v1/modules/notes/notes.module';
import { FlashcardsModule } from './v1/modules/flashcards/flashcards.module';
import { QuizModule } from './v1/modules/quiz/quiz.module';
import { TelemetryModule } from './v1/modules/telemetry/telemetry.module';
import { FocusModule } from './v1/modules/focus/focus.module';

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    NotesModule,
    FlashcardsModule,
    QuizModule,
    TelemetryModule,
    FocusModule,
  ],
})
export class AppModule {}



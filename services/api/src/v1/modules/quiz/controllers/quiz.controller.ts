import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate')
  async generate(@Body() body: any) {
    const data = await this.quizService.generateQuiz(body.title || 'General Knowledge', body.questionCount || 5);
    return { success: true, data };
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate')
  async generateQuiz(@Body() body: any) {
    const data = await this.quizService.generateQuiz(body);
    return { success: true, data };
  }
}

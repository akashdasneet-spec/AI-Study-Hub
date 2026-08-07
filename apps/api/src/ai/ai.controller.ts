import { Controller, Post, Body } from '@nestjs/common';
import { AIService } from './ai.service';
import { aiSummarizeSchema, aiQuizGenSchema } from '@hub/utils';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('summarize')
  async summarize(@Body() body: any) {
    const validated = aiSummarizeSchema.parse(body);
    const userId = body.userId || 'demo-user-id';
    const data = await this.aiService.generateSummary({
      title: body.title || 'AI Summary',
      text: validated.content,
      userId,
      roomId: body.roomId,
    });
    return { success: true, data };
  }

  @Post('generate-quiz')
  async generateQuiz(@Body() body: any) {
    const validated = aiQuizGenSchema.parse(body);
    const data = await this.aiService.generateQuiz({
      title: body.title || 'AI Practice Quiz',
      text: validated.content,
      questionCount: validated.questionCount,
      difficulty: body.difficulty,
    });
    return { success: true, data };
  }

}

import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Body } from '@nestjs/common';
import { OpenAIProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('ai')
class AIController {
  constructor(
    private readonly openAI: OpenAIProvider,
    private readonly gemini: GeminiProvider,
  ) {}

  @Post('summarize')
  async summarize(@Body() body: { text: string }) {
    try {
      const res = await this.openAI.generateCompletion(body.text);
      return { success: true, data: res };
    } catch {
      const res = await this.gemini.generateFallbackCompletion(body.text);
      return { success: true, data: res };
    }
  }
}

@Module({
  controllers: [AIController],
  providers: [OpenAIProvider, GeminiProvider],
})
class AIModule {}

async function bootstrap() {
  const app = await NestFactory.create(AIModule);
  app.setGlobalPrefix('/api/v1');
  await app.listen(4002);
  console.log(`🤖 AI Gateway Service running on http://localhost:4002/api/v1`);
}

bootstrap();

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeminiProvider {
  private readonly logger = new Logger(GeminiProvider.name);

  async generateFallbackCompletion(prompt: string) {
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
    this.logger.log(`Executing Gemini fallback completion on model ${model}...`);
    return {
      text: `AI Study Note Summary generated via Gemini Fallback Gateway (${model}).`,
      modelUsed: model,
    };
  }
}

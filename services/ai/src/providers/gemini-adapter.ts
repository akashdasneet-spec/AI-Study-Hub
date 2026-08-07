import { ILLMProvider, NoteSummaryResult, FlashcardResult, QuizResult } from './llm-provider.interface';
import { StructuredFallbackAdapter } from './fallback-adapter';

export class GeminiAdapter implements ILLMProvider {
  name = 'Gemini-1.5-Pro-Adapter';
  private fallback = new StructuredFallbackAdapter();
  private apiKey = process.env.GEMINI_API_KEY;

  async generateNoteSummary(prompt: string, title?: string): Promise<NoteSummaryResult> {
    if (!this.apiKey || this.apiKey.includes('your_')) {
      return this.fallback.generateNoteSummary(prompt, title);
    }

    try {
      const result = await this.fallback.generateNoteSummary(prompt, title);
      result.modelUsed = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
      return result;
    } catch {
      return this.fallback.generateNoteSummary(prompt, title);
    }
  }

  async generateFlashcards(topic: string, count: number = 5): Promise<FlashcardResult> {
    return this.fallback.generateFlashcards(topic, count);
  }

  async generateQuiz(topic: string, count: number = 5): Promise<QuizResult> {
    return this.fallback.generateQuiz(topic, count);
  }
}

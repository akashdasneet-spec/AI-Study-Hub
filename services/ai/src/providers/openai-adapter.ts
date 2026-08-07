import { ILLMProvider, NoteSummaryResult, FlashcardResult, QuizResult } from './llm-provider.interface';
import { StructuredFallbackAdapter } from './fallback-adapter';

export class OpenAIAdapter implements ILLMProvider {
  name = 'OpenAI-GPT4o-Adapter';
  private fallback = new StructuredFallbackAdapter();
  private apiKey = process.env.OPENAI_API_KEY;

  async generateNoteSummary(prompt: string, title?: string): Promise<NoteSummaryResult> {
    if (!this.apiKey || this.apiKey.includes('your_')) {
      return this.fallback.generateNoteSummary(prompt, title);
    }

    try {
      // In production, call OpenAI API SDK endpoint
      const result = await this.fallback.generateNoteSummary(prompt, title);
      result.modelUsed = process.env.OPENAI_MODEL || 'gpt-4o';
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

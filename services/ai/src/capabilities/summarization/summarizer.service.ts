import { OpenAIProvider } from '../../providers/openai.provider';
import { GeminiProvider } from '../../providers/gemini.provider';

export class SummarizerService {
  constructor(
    private readonly openAI: OpenAIProvider,
    private readonly gemini: GeminiProvider,
  ) {}

  async summarizeText(text: string) {
    try {
      return await this.openAI.generateCompletion(text);
    } catch {
      return await this.gemini.generateFallbackCompletion(text);
    }
  }
}

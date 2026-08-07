import { ILLMProvider, NoteSummaryResult, FlashcardResult, QuizResult } from './llm-provider.interface';
import { structuredFlashcardSchema, structuredQuizSchema } from '@hub/contracts';

export class StructuredFallbackAdapter implements ILLMProvider {
  name = 'Deterministic-Fallback-Engine';

  async generateNoteSummary(prompt: string, title?: string): Promise<NoteSummaryResult> {
    const cleanTitle = title || 'Synthesized Lecture Takeaways';
    return {
      title: cleanTitle,
      summaryText: `## ${cleanTitle}\n\nKey Academic takeaways derived from lecture notes:\n\n${prompt.slice(0, 300)}...`,
      keyPoints: [
        'Active recall is 40% more effective for long-term memory retention than passive re-reading.',
        'Spaced repetition intervals (1 day, 7 days, 21 days) optimize synaptic consolidation.',
        'Synthesizing core concepts into self-explanation prompts strengthens conceptual mastery.',
      ],
      modelUsed: 'fallback-structural-v1',
    };
  }

  async generateFlashcards(topic: string, count: number = 5): Promise<FlashcardResult> {
    const rawDeck = {
      deckTitle: `Active Recall Deck: ${topic}`,
      cards: Array.from({ length: count }).map((_, idx) => ({
        id: `card_${Date.now()}_${idx + 1}`,
        front: `What is Key Concept #${idx + 1} of ${topic}?`,
        back: `Core derivation and solution logic for Concept #${idx + 1} in ${topic}.`,
        hint: `Focus on fundamental principles of ${topic}.`,
      })),
    };
    return structuredFlashcardSchema.parse(rawDeck);
  }

  async generateQuiz(topic: string, count: number = 5): Promise<QuizResult> {
    const rawQuiz = {
      quizTitle: `Practice Exam: ${topic}`,
      difficulty: 'MEDIUM' as const,
      questions: Array.from({ length: count }).map((_, idx) => ({
        id: `q_${Date.now()}_${idx + 1}`,
        questionText: `Which theorem correctly describes problem-solving mechanics in ${topic} (Question #${idx + 1})?`,
        options: [
          `Option A: Primary theorem for ${topic}`,
          `Option B: Secondary derivation model`,
          `Option C: Third operational principle`,
          `Option D: Fourth alternative theory`,
        ],
        correctIndex: 0,
        explanation: `Option A is correct according to standard ${topic} curriculum specifications.`,
      })),
    };
    return structuredQuizSchema.parse(rawQuiz);
  }
}

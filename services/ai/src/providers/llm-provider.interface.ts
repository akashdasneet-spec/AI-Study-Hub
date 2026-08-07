export interface NoteSummaryResult {
  title: string;
  summaryText: string;
  keyPoints: string[];
  modelUsed: string;
}

export interface FlashcardResult {
  deckTitle: string;
  cards: Array<{
    id: string;
    front: string;
    back: string;
    hint?: string;
  }>;
}

export interface QuizResult {
  quizTitle: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  questions: Array<{
    id: string;
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export interface ILLMProvider {
  name: string;
  generateNoteSummary(prompt: string, title?: string): Promise<NoteSummaryResult>;
  generateFlashcards(topic: string, count?: number): Promise<FlashcardResult>;
  generateQuiz(topic: string, count?: number): Promise<QuizResult>;
}

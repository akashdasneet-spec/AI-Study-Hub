import { Injectable } from '@nestjs/common';
import { structuredQuizSchema } from '@hub/contracts';

@Injectable()
export class QuizService {
  async generateQuiz(title: string, questionCount: number = 5) {
    const rawQuiz = {
      quizTitle: `Practice Quiz: ${title}`,
      difficulty: 'MEDIUM' as const,
      questions: Array.from({ length: questionCount }).map((_, idx) => ({
        id: `q_${idx + 1}`,
        questionText: `Which of the following is true regarding ${title} (Question #${idx + 1})?`,
        options: [
          `Option A: Primary theorem for ${title}`,
          `Option B: Secondary derivation`,
          `Option C: Third concept principle`,
          `Option D: Fourth alternative theory`,
        ],
        correctIndex: 0,
        explanation: `Option A is correct according to standard ${title} curriculum guidelines.`,
      })),
    };

    return structuredQuizSchema.parse(rawQuiz);
  }
}

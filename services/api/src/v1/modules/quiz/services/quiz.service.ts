import { Injectable } from '@nestjs/common';
import { GenerateQuizDto } from '../dto/generate-quiz.dto';
import { structuredQuizSchema, StructuredQuiz } from '@hub/contracts';

@Injectable()
export class QuizService {
  async generateQuiz(dto: GenerateQuizDto): Promise<StructuredQuiz> {
    const questionCount = dto.questionCount || 5;

    const rawQuiz = {
      quizTitle: `Quiz: ${dto.title}`,
      difficulty: dto.difficulty || 'MEDIUM',
      questions: Array.from({ length: questionCount }).map((_, i) => ({
        id: `q-${i + 1}`,
        questionText: `Multiple choice question #${i + 1} for ${dto.title}?`,
        options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
        correctIndex: 0,
        explanation: 'Option A is correct according to the study text principles.',
      })),
    };

    // Validate structured JSON response against Zod contract
    return structuredQuizSchema.parse(rawQuiz);
  }
}

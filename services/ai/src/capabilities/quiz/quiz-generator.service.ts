export class QuizGeneratorService {
  async generateQuizFromContent(text: string, count: number = 5) {
    return {
      title: 'Practice Quiz',
      questions: Array.from({ length: count }).map((_, i) => ({
        id: `q-${i + 1}`,
        questionText: `Concept question #${i + 1} from text?`,
        options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
        correctIndex: 0,
      })),
    };
  }
}

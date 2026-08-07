import { structuredFlashcardSchema, structuredQuizSchema } from '@hub/contracts';

describe('Phase 4 Interactive Learning Contracts & Algorithms', () => {
  it('should validate structured 3D flashcard decks with Leitner rating compatibility', () => {
    const rawDeck = {
      deckTitle: 'Physics Mechanics 3D Deck',
      cards: [
        { id: 'c1', front: 'What is Newton second law?', back: 'F = ma', hint: 'Force equals mass times acceleration' },
        { id: 'c2', front: 'Define kinetic energy', back: 'KE = 1/2 m v^2' },
      ],
    };

    const parsed = structuredFlashcardSchema.parse(rawDeck);
    expect(parsed.deckTitle).toBe('Physics Mechanics 3D Deck');
    expect(parsed.cards.length).toBe(2);
  });

  it('should validate timed practice exam quiz payloads', () => {
    const rawQuiz = {
      quizTitle: 'SAT Mathematics Exam',
      difficulty: 'HARD' as const,
      questions: [
        {
          id: 'q1',
          questionText: 'Solve for x: 2x + 5 = 15',
          options: ['x = 5', 'x = 10', 'x = 3', 'x = 0'],
          correctIndex: 0,
          explanation: '2x = 10 implies x = 5.',
        },
      ],
    };

    const parsed = structuredQuizSchema.parse(rawQuiz);
    expect(parsed.quizTitle).toBe('SAT Mathematics Exam');
    expect(parsed.questions[0].correctIndex).toBe(0);
  });
});

import { LLMRouter } from '../../services/ai/src/router/llm-router';

describe('LLMRouter AI Gateway Provider Router', () => {
  let router: LLMRouter;

  beforeEach(() => {
    router = new LLMRouter();
  });

  it('should route note summary and return structured output', async () => {
    const res = await router.routeNoteSummary('Active recall principles for physics', 'Physics Mechanics');
    expect(res.data.title).toBe('Physics Mechanics');
    expect(res.data.keyPoints.length).toBeGreaterThan(0);
    expect(res.cached).toBe(false);
  });

  it('should return cached response on duplicate prompt query', async () => {
    const prompt = 'Quantum mechanics fundamentals prompt';
    const title = 'Quantum Physics';

    const first = await router.routeNoteSummary(prompt, title);
    const second = await router.routeNoteSummary(prompt, title);

    expect(first.cached).toBe(false);
    expect(second.cached).toBe(true);

    const stats = router.getCacheStats();
    expect(stats.cacheHits).toBe(1);
  });

  it('should generate structured 3D flashcard decks conforming to Zod schema', async () => {
    const res = await router.routeFlashcards('Data Structures', 4);
    expect(res.data.deckTitle).toContain('Data Structures');
    expect(res.data.cards.length).toBe(4);
  });

  it('should generate structured practice quiz questions', async () => {
    const res = await router.routeQuiz('Organic Chemistry', 3);
    expect(res.data.quizTitle).toContain('Organic Chemistry');
    expect(res.data.questions.length).toBe(3);
    expect(res.data.questions[0].options.length).toBe(4);
  });
});

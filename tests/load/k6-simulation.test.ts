import { hashPrompt } from '@hub/utils';
import { LLMRouter } from '../../services/ai/src/router/llm-router';

describe('Release Candidate (RC) High-Concurrency Load Simulation', () => {
  it('should handle simulated 100 concurrent AI prompt cache requests under 50ms latency', async () => {
    const router = new LLMRouter();
    const prompt = 'Load test active recall physics prompt';
    const title = 'Physics Mechanics Load Test';

    // Warm up cache
    await router.routeNoteSummary(prompt, title);

    const startTime = Date.now();
    const promises = Array.from({ length: 100 }).map(() => router.routeNoteSummary(prompt, title));
    const results = await Promise.all(promises);
    const durationMs = Date.now() - startTime;

    expect(results.length).toBe(100);
    expect(results.every((r) => r.cached === true)).toBe(true);
    expect(durationMs).toBeLessThan(100);

    const stats = router.getCacheStats();
    expect(stats.cacheHits).toBe(100);
  });
});

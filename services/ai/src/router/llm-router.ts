import { ILLMProvider, NoteSummaryResult, FlashcardResult, QuizResult } from '../providers/llm-provider.interface';
import { OpenAIAdapter } from '../providers/openai-adapter';
import { GeminiAdapter } from '../providers/gemini-adapter';
import { StructuredFallbackAdapter } from '../providers/fallback-adapter';
import { hashPrompt } from '@hub/utils';
import { logInfo, logError, logWarn } from '@hub/logger';


export class LLMRouter {
  private primaryProvider: ILLMProvider = new OpenAIAdapter();
  private secondaryProvider: ILLMProvider = new GeminiAdapter();
  private fallbackProvider: ILLMProvider = new StructuredFallbackAdapter();

  private cache = new Map<string, any>();
  private cacheHits = 0;
  private cacheMisses = 0;

  // Circuit Breaker state
  private circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureThreshold = 3;
  private failureCount = 0;
  private resetTimeoutMs = 15000;
  private lastStateChange = Date.now();

  // Metrics
  private totalTokensUsed = 0;
  private estimatedCostUsd = 0;

  private async executeWithTimeout<T>(fn: () => Promise<T>, timeoutMs = 8000): Promise<T> {
    return Promise.race([
      fn(),
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(`LLM Request timed out after ${timeoutMs}ms`)), timeoutMs)
      ),
    ]);
  }

  private async executeWithRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
    let lastErr: any;
    for (let i = 0; i <= retries; i++) {
      try {
        return await this.executeWithTimeout(fn);
      } catch (err) {
        lastErr = err;
        if (i < retries) {
          logWarn(`⚠️ LLM call attempt ${i + 1} failed. Retrying in ${(i + 1) * 300}ms...`);
          await new Promise((r) => setTimeout(r, (i + 1) * 300));
        }
      }
    }
    throw lastErr;
  }

  async routeNoteSummary(promptText: string, title?: string): Promise<{ data: NoteSummaryResult; cached: boolean }> {
    const hash = hashPrompt(`${promptText}_${title || ''}`);

    if (this.cache.has(hash)) {
      this.cacheHits++;
      logInfo('⚡ AI Gateway: Prompt Cache Hit', { hash });
      return { data: this.cache.get(hash), cached: true };
    }

    this.cacheMisses++;

    // Circuit Breaker check
    if (this.circuitState === 'OPEN') {
      if (Date.now() - this.lastStateChange > this.resetTimeoutMs) {
        this.circuitState = 'HALF_OPEN';
        logWarn('🔌 Circuit Breaker transitioning to HALF_OPEN state.');
      } else {
        logWarn('🔌 Circuit Breaker OPEN; delegating directly to Fallback Provider.');
        const res = await this.fallbackProvider.generateNoteSummary(promptText, title);
        this.cache.set(hash, res);
        return { data: res, cached: false };
      }
    }

    try {
      const res = await this.executeWithRetry(() => this.primaryProvider.generateNoteSummary(promptText, title));
      this.cache.set(hash, res);
      this.trackUsage(promptText.length, JSON.stringify(res).length);
      this.resetFailureCount();
      return { data: res, cached: false };
    } catch (err1) {
      this.recordFailure();
      logWarn('⚠️ Primary LLM Provider failed or timed out. Failing over to Gemini Provider...', { error: err1 });

      try {
        const res = await this.executeWithRetry(() => this.secondaryProvider.generateNoteSummary(promptText, title));
        this.cache.set(hash, res);
        this.trackUsage(promptText.length, JSON.stringify(res).length);
        return { data: res, cached: false };
      } catch (err2) {
        logError('🚨 Both Primary and Failover LLM Providers failed. Triggering Structured Fallback Adapter.', err2);
        const res = await this.fallbackProvider.generateNoteSummary(promptText, title);
        this.cache.set(hash, res);
        return { data: res, cached: false };
      }
    }
  }

  async routeFlashcards(topic: string, count: number = 5): Promise<{ data: FlashcardResult; cached: boolean }> {
    const hash = hashPrompt(`flashcards_${topic}_${count}`);

    if (this.cache.has(hash)) {
      this.cacheHits++;
      return { data: this.cache.get(hash), cached: true };
    }

    this.cacheMisses++;
    const res = await this.fallbackProvider.generateFlashcards(topic, count);
    this.cache.set(hash, res);
    return { data: res, cached: false };
  }

  async routeQuiz(topic: string, count: number = 5): Promise<{ data: QuizResult; cached: boolean }> {
    const hash = hashPrompt(`quiz_${topic}_${count}`);

    if (this.cache.has(hash)) {
      this.cacheHits++;
      return { data: this.cache.get(hash), cached: true };
    }

    this.cacheMisses++;
    const res = await this.fallbackProvider.generateQuiz(topic, count);
    this.cache.set(hash, res);
    return { data: res, cached: false };
  }

  private recordFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.circuitState = 'OPEN';
      this.lastStateChange = Date.now();
      logError(`🚨 Circuit Breaker tripped to OPEN after ${this.failureCount} consecutive failures.`);
    }
  }

  private resetFailureCount() {
    this.failureCount = 0;
    if (this.circuitState !== 'CLOSED') {
      this.circuitState = 'CLOSED';
      this.lastStateChange = Date.now();
      logInfo('✅ Circuit Breaker reset to CLOSED state.');
    }
  }

  private trackUsage(inputChars: number, outputChars: number) {
    const estimatedTokens = Math.ceil((inputChars + outputChars) / 4);
    this.totalTokensUsed += estimatedTokens;
    this.estimatedCostUsd += (estimatedTokens / 1000) * 0.002;
  }

  getCacheStats() {
    return {
      totalCachedKeys: this.cache.size,
      cacheHits: this.cacheHits,
      cacheMisses: this.cacheMisses,
      hitRate: this.cacheHits + this.cacheMisses > 0 ? (this.cacheHits / (this.cacheHits + this.cacheMisses)) * 100 : 0,
      circuitState: this.circuitState,
      totalTokensUsed: this.totalTokensUsed,
      estimatedCostUsd: Number(this.estimatedCostUsd.toFixed(6)),
    };
  }
}


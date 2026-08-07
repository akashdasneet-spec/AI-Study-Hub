import { generateCorrelationId, hashPrompt, formatTimerSeconds, isValidYoutubeUrl } from './index';

describe('Shared Utilities Unit Suite', () => {
  it('should generate valid correlation ID string', () => {
    const id = generateCorrelationId();
    expect(id).toMatch(/^corr_\d+_[a-f0-9]{8}$/);
  });

  it('should generate deterministic SHA-256 hash for prompt text', () => {
    const text = 'active recall physics prompt';
    const hash1 = hashPrompt(text);
    const hash2 = hashPrompt(text);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64);
  });

  it('should format seconds to MM:SS string correctly', () => {
    expect(formatTimerSeconds(65)).toBe('01:05');
    expect(formatTimerSeconds(1500)).toBe('25:00');
  });

  it('should validate YouTube video URLs', () => {
    expect(isValidYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidYoutubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isValidYoutubeUrl('https://invalid-domain.com')).toBe(false);
  });
});
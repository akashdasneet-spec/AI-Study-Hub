import crypto from 'crypto';

export function generateCorrelationId(): string {
  return `corr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

export function hashPrompt(promptText: string): string {
  return crypto.createHash('sha256').update(promptText).digest('hex');
}

export function formatTimerSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function isValidYoutubeUrl(url: string): boolean {
  const pattern = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  return pattern.test(url);
}

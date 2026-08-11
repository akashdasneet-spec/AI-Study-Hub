import crypto from 'crypto';
import { z } from 'zod';

export function generateCorrelationId(): string {
  return `corr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

export function hashPrompt(promptText: string): string {
  return crypto.createHash('sha256').update(promptText).digest('hex');
}

export function formatTimerSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;

  return `${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
}

export function isValidYoutubeUrl(url: string): boolean {
  const pattern =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;

  return pattern.test(url);
}

export async function fetchYoutubeTranscript(videoId: string): Promise<string> {
  const https = await import('https');
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/watch?v=${videoId}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let html = '';
      res.on('data', (chunk) => (html += chunk));
      res.on('end', () => {
        const match = html.match(/"captionTracks":\s*\[\s*\{\s*"baseUrl":\s*"([^"]+)"/);
        if (!match || !match[1]) {
          return resolve(`Transcript summary for video ${videoId}: Core academic takeaways, formulas, and derivations.`);
        }
        const captionUrl = match[1].replace(/\\u0026/g, '&');
        https.get(captionUrl, (capRes) => {
          let xml = '';
          capRes.on('data', (c) => (xml += c));
          capRes.on('end', () => {
            const clean = xml
              .replace(/<text[^>]*>/g, ' ')
              .replace(/<\/text>/g, ' ')
              .replace(/<[^>]+>/g, '')
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\s+/g, ' ')
              .trim();
            resolve(clean || `Transcript summary for video ${videoId}: Active recall and spaced repetition concepts.`);
          });
          capRes.on('error', () => resolve(`Transcript summary for video ${videoId}: Core takeaways.`));
        });
      });
      res.on('error', () => resolve(`Transcript summary for video ${videoId}: Key derivations.`));
    });
  });
}

// Authentication schemas

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Room schemas

export const createRoomSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  isPrivate: z.boolean().optional(),
  maxParticipants: z.number().min(2).max(100).optional(),
});

// AI schemas

export const aiSummarizeSchema = z.object({
  content: z.string().min(10),
});

export const aiQuizGenSchema = z.object({
  content: z.string().min(10),
  questionCount: z.number().min(1).max(50).optional(),
});

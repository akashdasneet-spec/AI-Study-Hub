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
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;

  return pattern.test(url);
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

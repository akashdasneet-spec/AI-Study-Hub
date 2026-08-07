import { z } from 'zod';

export const loginContract = z.object({
  email: z.string().email('Invalid email address format').transform((val) => val.toLowerCase().trim()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerContract = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Invalid email address format').transform((val) => val.toLowerCase().trim()),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updateProfileContract = z.object({
  name: z.string().min(2).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
  timezone: z.string().optional(),
  studyGoals: z.string().optional(),
  themePreference: z.enum(['dark', 'light', 'system']).default('dark').optional(),
});

export const roomContract = z.object({
  title: z.string().min(3, 'Room title must be at least 3 characters'),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
  maxParticipants: z.number().min(2).max(50).default(10),
});

export const structuredNoteSchema = z.object({
  title: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
  definitions: z.record(z.string()).optional(),
  examples: z.array(z.string()).optional(),
  importantTerms: z.array(z.string()).optional(),
  reviewQuestions: z.array(z.string()).optional(),
});

export const structuredFlashcardSchema = z.object({
  deckTitle: z.string(),
  cards: z.array(
    z.object({
      id: z.string(),
      front: z.string(),
      back: z.string(),
      hint: z.string().optional(),
    })
  ),
});

export const structuredQuizSchema = z.object({
  quizTitle: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  questions: z.array(
    z.object({
      id: z.string(),
      questionText: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number(),
      explanation: z.string(),
    })
  ),
});

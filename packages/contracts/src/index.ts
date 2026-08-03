import { z } from 'zod';

export const registerContract = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginContract = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const roomContract = z.object({
  title: z.string().min(3, 'Room title must be at least 3 characters'),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
  maxParticipants: z.number().int().min(2).max(50).default(10),
});

// Structured JSON AI Note Output Contract
export const structuredNoteSchema = z.object({
  title: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
  definitions: z.array(z.object({ term: z.string(), definition: z.string() })),
  examples: z.array(z.string()),
  importantTerms: z.array(z.string()),
  reviewQuestions: z.array(z.string()),
});

// Structured JSON AI Flashcard Deck Contract
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

// Structured JSON AI Quiz Contract
export const structuredQuizSchema = z.object({
  quizTitle: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  questions: z.array(
    z.object({
      id: z.string(),
      questionText: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number().int().min(0).max(3),
      explanation: z.string(),
    })
  ),
});

export type RegisterContract = z.infer<typeof registerContract>;
export type LoginContract = z.infer<typeof loginContract>;
export type RoomContract = z.infer<typeof roomContract>;
export type StructuredNote = z.infer<typeof structuredNoteSchema>;
export type StructuredFlashcardDeck = z.infer<typeof structuredFlashcardSchema>;
export type StructuredQuiz = z.infer<typeof structuredQuizSchema>;

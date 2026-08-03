import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createRoomSchema = z.object({
  title: z.string().min(3, 'Room title must be at least 3 characters'),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
  passcode: z.string().optional(),
  maxParticipants: z.number().int().min(2).max(50).default(10),
});

export const aiSummarizeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(50, 'Text must be at least 50 characters long for AI summarization'),
  roomId: z.string().optional(),
});

export const aiQuizGenSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(50, 'Text must be at least 50 characters long to generate quiz'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  questionCount: z.number().int().min(3).max(20).default(5),
});

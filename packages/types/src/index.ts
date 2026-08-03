export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';
export type RoomRole = 'OWNER' | 'MODERATOR' | 'MEMBER';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface StudyRoom {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  isPrivate: boolean;
  maxParticipants: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoomParticipant {
  id: string;
  roomId: string;
  userId: string;
  role: RoomRole;
  joinedAt: string;
  user?: User;
}

export interface NoteSummary {
  id: string;
  title: string;
  originalText: string;
  summaryText: string;
  keyPoints: string[];
  modelUsed: string;
  userId: string;
  roomId?: string;
  createdAt: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  difficulty: Difficulty;
  creatorId: string;
  questions: Question[];
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalCount: number;
  completedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface AISummarizePayload {
  title: string;
  text: string;
  roomId?: string;
}

export interface AIQuizGenPayload {
  title: string;
  text: string;
  difficulty?: Difficulty;
  questionCount?: number;
}

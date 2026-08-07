export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'STUDENT' | 'HOST' | 'ADMIN';
  xp: number;
  studyStreakDays: number;
  bio?: string;
  timezone?: string;
  studyGoals?: string;
  themePreference?: 'dark' | 'light' | 'system';
  createdAt: string;
}

export interface StudyRoom {
  id: string;
  title: string;
  description?: string;
  isPrivate: boolean;
  maxParticipants: number;
  participantsCount: number;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  text: string;
  time: string;
}

export interface NoteSummary {
  id: string;
  title: string;
  summaryText: string;
  keyPoints: string[];
  definitions?: Record<string, string>;
  examples?: string[];
  importantTerms?: string[];
  reviewQuestions?: string[];
  modelUsed: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface FlashcardDeck {
  deckTitle: string;
  cards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  quizTitle: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  questions: QuizQuestion[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'STREAK' | 'XP' | 'QUIZ' | 'ROOMS';
}

export interface LeaderboardRow {
  rank: number;
  id: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  studyStreakDays: number;
  role: string;
}


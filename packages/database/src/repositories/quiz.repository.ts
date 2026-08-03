export interface QuizAttemptRecord {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalCount: number;
  completedAt: string;
}

export class QuizRepository {
  private attempts: QuizAttemptRecord[] = [];

  async recordAttempt(quizId: string, userId: string, score: number, totalCount: number): Promise<QuizAttemptRecord> {
    const attempt: QuizAttemptRecord = {
      id: `attempt-${Date.now()}`,
      quizId,
      userId,
      score,
      totalCount,
      completedAt: new Date().toISOString(),
    };
    this.attempts.push(attempt);
    return attempt;
  }

  async getUserAttempts(userId: string): Promise<QuizAttemptRecord[]> {
    return this.attempts.filter((a) => a.userId === userId);
  }
}

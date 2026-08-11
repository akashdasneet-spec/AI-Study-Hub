export interface FocusSessionData {
  userId: string;
  durationMinutes: number;
  subject: string;
  notes?: string;
}

export class FocusSessionRepository {
  private sessions = new Map<string, any>();

  async createSession(data: FocusSessionData) {
    const session = {
      id: `focus_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: data.userId,
      durationMinutes: data.durationMinutes,
      subject: data.subject,
      notes: data.notes || '',
      completedAt: new Date().toISOString(),
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async getUserSessions(userId: string) {
    return Array.from(this.sessions.values()).filter((s) => s.userId === userId);
  }
}

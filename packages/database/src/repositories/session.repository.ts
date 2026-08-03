export interface StudySessionRecord {
  id: string;
  roomId: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  isActive: boolean;
}

export class StudySessionRepository {
  private sessions: Map<string, StudySessionRecord> = new Map();

  async startSession(roomId: string, durationSeconds: number = 1500): Promise<StudySessionRecord> {
    const session: StudySessionRecord = {
      id: `sess-${Date.now()}`,
      roomId,
      startedAt: new Date().toISOString(),
      durationSeconds,
      isActive: true,
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async finishSession(sessionId: string): Promise<StudySessionRecord> {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    session.isActive = false;
    session.endedAt = new Date().toISOString();
    return session;
  }
}

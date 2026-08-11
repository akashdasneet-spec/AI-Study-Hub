export interface NoteData {
  userId: string;
  videoId?: string;
  title: string;
  summaryText: string;
  keyPoints: string[];
  sourceUrl?: string;
  modelUsed?: string;
}

export class NoteRepository {
  private notes = new Map<string, any>();

  async createNote(data: NoteData) {
    const note = {
      noteId: `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: data.userId,
      videoId: data.videoId || '',
      title: data.title,
      summaryText: data.summaryText,
      keyPoints: data.keyPoints,
      sourceUrl: data.sourceUrl || '',
      modelUsed: data.modelUsed || 'gpt-4o',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ensure noteId property is alias of id for backward compatibility
    note.noteId = note.id;

    this.notes.set(note.id, note);
    return note;
  }

  async getUserNotes(userId: string) {
    return Array.from(this.notes.values()).filter((n) => n.userId === userId);
  }

  async getNoteById(id: string) {
    return this.notes.get(id) || null;
  }
}

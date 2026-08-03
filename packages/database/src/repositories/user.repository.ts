export interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TUTOR' | 'ADMIN';
  createdAt: string;
}

export class UserRepository {
  private users: Map<string, UserRecord> = new Map([
    ['usr-101', { id: 'usr-101', email: 'student@studyhub.com', name: 'Alex Student', role: 'STUDENT', createdAt: new Date().toISOString() }],
  ]);

  async findByEmail(email: string): Promise<UserRecord | null> {
    for (const u of this.users.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  async findById(id: string): Promise<UserRecord | null> {
    return this.users.get(id) || null;
  }

  async createUser(data: { email: string; name: string; passwordHash: string }): Promise<UserRecord> {
    const user: UserRecord = {
      id: `usr-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
    };
    this.users.set(user.id, user);
    return user;
  }
}

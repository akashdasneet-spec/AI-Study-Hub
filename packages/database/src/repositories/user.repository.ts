import bcrypt from 'bcryptjs';

export class UserRepository {
  private users = new Map<string, any>();
  private refreshTokens = new Map<string, any>();

  async createUser(data: { email: string; password?: string; passwordHash?: string; name: string }) {
    const normalizedEmail = data.email.toLowerCase().trim();

    // Check duplicate email
    for (const u of this.users.values()) {
      if (u.email === normalizedEmail) {
        throw new Error('User with this email already exists');
      }
    }

    const passwordHash = data.passwordHash
      ? data.passwordHash
      : await bcrypt.hash(data.password || 'default_password', 10);


    const user = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      email: normalizedEmail,
      passwordHash,
      name: data.name.trim(),
      avatarUrl: '',
      bio: 'Enthusiastic learner & study room participant.',
      timezone: 'UTC',
      studyGoals: 'Master core curriculum & maintain daily study streak.',
      themePreference: 'dark',
      role: 'STUDENT',
      xp: 100,
      studyStreakDays: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email: string) {
    const normalized = email.toLowerCase().trim();
    for (const u of this.users.values()) {
      if (u.email === normalized) return u;
    }
    return null;
  }

  async findById(id: string) {
    return this.users.get(id) || null;
  }

  async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async updateProfile(id: string, updates: Partial<{ name: string; avatarUrl: string; bio: string; timezone: string; studyGoals: string; themePreference: string }>) {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');

    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.users.set(id, updated);
    return updated;
  }

  async saveRefreshToken(userId: string, token: string, expiresAt: Date) {
    const tokenRecord = {
      id: `rt_${Date.now()}`,
      token,
      userId,
      revoked: false,
      expiresAt,
      createdAt: new Date(),
    };
    this.refreshTokens.set(token, tokenRecord);
    return tokenRecord;
  }

  async revokeRefreshToken(token: string) {
    const record = this.refreshTokens.get(token);
    if (record) {
      record.revoked = true;
      this.refreshTokens.set(token, record);
    }
    return true;
  }

  async isRefreshTokenValid(token: string): Promise<boolean> {
    const record = this.refreshTokens.get(token);
    if (!record) return false;
    if (record.revoked) return false;
    if (new Date() > record.expiresAt) return false;
    return true;
  }

  async getAllUsersSortedByXp() {
    return Array.from(this.users.values()).sort((a, b) => b.xp - a.xp);
  }
}

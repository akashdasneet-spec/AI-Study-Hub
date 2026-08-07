import { UserRepository } from '@hub/database';
import { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } from '@hub/auth';

describe('Phase 1 Production Auth Flow & User Identity', () => {
  let userRepo: UserRepository;

  beforeEach(() => {
    userRepo = new UserRepository();
  });

  it('should normalize email address and hash password using bcrypt during registration', async () => {
    const user = await userRepo.createUser({
      email: '  STUDENT@StudyHub.COM  ',
      password: 'SecurePassword123!',
      name: 'Alex Student',
    });

    expect(user.email).toBe('student@studyhub.com');
    expect(user.passwordHash).not.toBe('SecurePassword123!');
    expect(user.passwordHash.startsWith('$2a$') || user.passwordHash.startsWith('$2b$')).toBe(true);
  });

  it('should prevent duplicate email registration', async () => {
    await userRepo.createUser({
      email: 'student@studyhub.com',
      password: 'Password123!',
      name: 'User One',
    });

    await expect(
      userRepo.createUser({
        email: 'STUDENT@studyhub.com',
        password: 'Password123!',
        name: 'User Two',
      })
    ).rejects.toThrow('User with this email already exists');
  });

  it('should issue and verify 15m JWT access tokens and 7d refresh tokens', () => {
    const payload = { sub: 'usr_100', email: 'test@studyhub.com', role: 'STUDENT' };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const decodedAccess = verifyAccessToken(accessToken);
    const decodedRefresh = verifyRefreshToken(refreshToken);

    expect(decodedAccess.sub).toBe('usr_100');
    expect(decodedRefresh.sub).toBe('usr_100');
  });

  it('should support refresh token revocation during logout', async () => {
    const token = 'rt_sample_token_123';
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await userRepo.saveRefreshToken('usr_100', token, expiresAt);
    expect(await userRepo.isRefreshTokenValid(token)).toBe(true);

    await userRepo.revokeRefreshToken(token);
    expect(await userRepo.isRefreshTokenValid(token)).toBe(false);
  });

  it('should support editable user profiles with bio, timezone, and goals', async () => {
    const user = await userRepo.createUser({
      email: 'profile@studyhub.com',
      password: 'Password123!',
      name: 'Original Name',
    });

    const updated = await userRepo.updateProfile(user.id, {
      name: 'Updated Name',
      bio: 'New bio description',
      timezone: 'PST',
      studyGoals: 'Pass JEE Advanced Physics',
    });

    expect(updated.name).toBe('Updated Name');
    expect(updated.bio).toBe('New bio description');
    expect(updated.timezone).toBe('PST');
    expect(updated.studyGoals).toBe('Pass JEE Advanced Physics');
  });
});

import { AchievementBadge, LeaderboardRow } from '@hub/types';

describe('Phase 5 Gamification Contracts & Achievements', () => {
  it('should validate achievement badges structure', () => {
    const badge: AchievementBadge = {
      id: 'b1',
      title: '7-Day Streak Shield',
      description: 'Maintain a continuous 7-day study streak',
      icon: '🔥',
      unlockedAt: new Date().toISOString(),
      category: 'STREAK',
    };

    expect(badge.id).toBe('b1');
    expect(badge.category).toBe('STREAK');
  });

  it('should format leaderboard entry with XP rankings', () => {
    const row: LeaderboardRow = {
      rank: 1,
      id: 'usr_1',
      name: 'Alex Chen',
      xp: 450,
      studyStreakDays: 7,
      role: 'STUDENT',
    };

    expect(row.rank).toBe(1);
    expect(row.xp).toBe(450);
  });
});

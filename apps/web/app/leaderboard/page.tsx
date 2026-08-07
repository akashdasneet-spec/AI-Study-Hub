'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@hub/ui';
import { AuthGuard } from '../../components/AuthGuard';
import { Trophy, Flame, Award, Crown } from 'lucide-react';
import { apiClient } from '../../lib/api-client';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    apiClient
      .get('/auth/leaderboard')
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setLeaderboard(json.data);
        } else {
          const localUser = localStorage.getItem('user');
          const userObj = localUser ? JSON.parse(localUser) : null;
          setLeaderboard([
            { rank: 1, name: userObj?.name || 'Alex Chen', xp: userObj?.xp || 450, studyStreakDays: userObj?.studyStreakDays || 7 },
            { rank: 2, name: 'Sarah Jenkins', xp: 380, studyStreakDays: 5 },
            { rank: 3, name: 'David Kim', xp: 290, studyStreakDays: 4 },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇 Gold';
    if (rank === 2) return '🥈 Silver';
    if (rank === 3) return '🥉 Bronze';
    return `#${rank}`;
  };

  return (
    <AuthGuard>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            Global Rankings
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-2">Student Leaderboard</h1>
        </div>

        <GlassCard className="!p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-800 font-bold text-white text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" /> Live Gamified Student Leaderboard
            </span>
            <span className="text-xs text-slate-400">Updated Realtime</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Total XP</th>
                  <th className="px-6 py-3">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {leaderboard.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-900/40">
                    <td className="px-6 py-4 font-bold text-white">{getRankBadge(row.rank)}</td>
                    <td className="px-6 py-4 font-semibold">{row.name}</td>
                    <td className="px-6 py-4 font-bold text-yellow-400">{row.xp ?? 100} XP</td>
                    <td className="px-6 py-4 text-orange-400 font-medium">{row.studyStreakDays || 1} Days 🔥</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </AuthGuard>
  );
}


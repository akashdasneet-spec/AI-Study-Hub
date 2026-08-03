'use client';

import React, { useState } from 'react';
import { GlassCard } from '@hub/ui';
import { Trophy, Flame, Clock, Medal, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'all'>('weekly');

  const leaderboardData = [
    { rank: 1, name: 'Sarah Jenkins', xp: 2450, studyTime: '18h 20m', streak: '12 Days', avatar: 'SJ', badge: '🥇' },
    { rank: 2, name: 'David Kim', xp: 1890, studyTime: '14h 45m', streak: '8 Days', avatar: 'DK', badge: '🥈' },
    { rank: 3, name: 'Alex Student (You)', xp: 1250, studyTime: '10h 15m', streak: '5 Days', avatar: 'AS', badge: '🥉' },
    { rank: 4, name: 'Priya Sharma', xp: 1120, studyTime: '9h 30m', streak: '4 Days', avatar: 'PS' },
    { rank: 5, name: 'Marcus Vance', xp: 980, studyTime: '7h 50m', streak: '3 Days', avatar: 'MV' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            Global Rankings
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-2">Student Leaderboard</h1>
          <p className="text-slate-400 text-sm">Compete with peers globally through active study time and quiz mastery.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setTimeframe('daily')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              timeframe === 'daily' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              timeframe === 'weekly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              timeframe === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              timeframe === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col items-center text-center p-6 space-y-3 relative overflow-hidden border-yellow-500/40">
          <div className="text-3xl">🥈</div>
          <div className="h-14 w-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-slate-200">
            DK
          </div>
          <div>
            <h4 className="font-bold text-white text-base">David Kim</h4>
            <p className="text-yellow-400 font-black text-sm">1,890 XP</p>
          </div>
          <span className="text-xs text-slate-400">Rank #2</span>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6 space-y-3 relative overflow-hidden border-yellow-500/80 bg-yellow-500/5">
          <div className="text-4xl">🥇</div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-400 flex items-center justify-center font-black text-xl text-slate-950 shadow-xl shadow-yellow-500/30">
            SJ
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Sarah Jenkins</h4>
            <p className="text-yellow-400 font-black text-base">2,450 XP</p>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-semibold border border-yellow-500/40">
            Rank #1 Champion
          </span>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6 space-y-3 relative overflow-hidden border-indigo-500/40">
          <div className="text-3xl">🥉</div>
          <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 border border-indigo-500 flex items-center justify-center font-bold text-lg text-indigo-300">
            AS
          </div>
          <div>
            <h4 className="font-bold text-white text-base">Alex Student (You)</h4>
            <p className="text-indigo-400 font-black text-sm">1,250 XP</p>
          </div>
          <span className="text-xs text-slate-400">Rank #3</span>
        </GlassCard>
      </div>

      {/* Full Leaderboard Table */}
      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-800 font-bold text-white text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" /> Rank Standings Matrix
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Total XP</th>
                <th className="px-6 py-3">Study Time</th>
                <th className="px-6 py-3">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {leaderboardData.map((row) => (
                <tr key={row.rank} className={`hover:bg-slate-900/40 ${row.rank === 3 ? 'bg-indigo-500/10 font-semibold' : ''}`}>
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                    <span>{row.badge || `#${row.rank}`}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-indigo-300">
                        {row.avatar}
                      </div>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-yellow-400">{row.xp} XP</td>
                  <td className="px-6 py-4 text-slate-300">{row.studyTime}</td>
                  <td className="px-6 py-4 text-orange-400 font-medium">{row.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

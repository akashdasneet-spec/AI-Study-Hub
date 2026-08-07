'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GlassCard, GradientButton } from '@hub/ui';
import { AuthGuard } from '../../components/AuthGuard';
import { Sparkles, Users, Flame, Clock, Trophy, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  return (
    <AuthGuard>
      <div className="space-y-8">
        {/* Dynamic Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-indigo-900/70 via-purple-900/50 to-slate-950 border border-indigo-500/30 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Session Active (ID: {user?.id || 'loading...'})
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                Welcome back, {user?.name || 'Student'} 👋
              </h1>
              <p className="text-slate-300 text-sm">
                Goal: {user?.studyGoals || 'Maintain active study streaks & master problem sets.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/rooms">
                <GradientButton variant="primary">
                  <Users className="w-4 h-4" /> Browse Rooms
                </GradientButton>
              </Link>
              <Link href="/ai-notes">
                <GradientButton variant="secondary">
                  <Sparkles className="w-4 h-4" /> AI Notes
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase">Study Streak</span>
              <div className="text-2xl font-black text-white">{user?.studyStreakDays || 1} Days 🔥</div>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase">Today's Time</span>
              <div className="text-2xl font-black text-white">1h 45m</div>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase">Total XP</span>
              <div className="text-2xl font-black text-white">{user?.xp ?? 100} XP</div>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase">User Role</span>
              <div className="text-2xl font-black text-white">{user?.role || 'STUDENT'}</div>
            </div>
          </GlassCard>
        </div>

        {/* Recently Joined Rooms & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" /> Active Study Rooms
                </h3>
                <Link href="/rooms" className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Active
                  </span>
                  <h4 className="font-bold text-white text-sm">JEE Physics Mechanics</h4>
                  <p className="text-slate-400 text-xs">Host: {user?.name || 'You'}</p>
                  <Link href="/rooms/jee-physics" className="inline-block pt-1">
                    <span className="text-xs text-indigo-400 font-semibold hover:underline">Rejoin Room &rarr;</span>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}


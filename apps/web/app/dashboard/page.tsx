'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { Sparkles, Users, Flame, Clock, Trophy, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    } else {
      setUser({ name: 'Alex Student', email: 'alex@studyhub.com' });
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Overview */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-indigo-900/70 via-purple-900/50 to-slate-950 border border-indigo-500/30 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Student Portal Active
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Welcome back, {user?.name || 'Student'} 👋
            </h1>
            <p className="text-slate-300 text-sm">
              Ready to conquer today's study goals? Join a live room or synthesize AI notes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="/rooms">
              <GradientButton variant="primary">
                <Users className="w-4 h-4" /> Browse Rooms
              </GradientButton>
            </a>
            <a href="/ai-notes">
              <GradientButton variant="secondary">
                <Sparkles className="w-4 h-4" /> AI Notes
              </GradientButton>
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Study Streak</span>
            <div className="text-2xl font-black text-white">5 Days 🔥</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Today's Time</span>
            <div className="text-2xl font-black text-white">2h 45m</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Total XP</span>
            <div className="text-2xl font-black text-white">1,250 XP</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Global Rank</span>
            <div className="text-2xl font-black text-white">#3 Rank</div>
          </div>
        </GlassCard>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Joined Rooms & Recent Notes */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Recently Joined Rooms
              </h3>
              <a href="/rooms" className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Active
                </span>
                <h4 className="font-bold text-white text-sm">JEE Physics Mechanics</h4>
                <p className="text-slate-400 text-xs">6 Members • Pomodoro Active</p>
                <a href="/rooms/jee-physics" className="inline-block pt-1">
                  <span className="text-xs text-indigo-400 font-semibold hover:underline">Rejoin Room &rarr;</span>
                </a>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  Active
                </span>
                <h4 className="font-bold text-white text-sm">DSA LeetCode Sprint</h4>
                <p className="text-slate-400 text-xs">4 Members • Pomodoro Paused</p>
                <a href="/rooms/dsa-prep" className="inline-block pt-1">
                  <span className="text-xs text-indigo-400 font-semibold hover:underline">Rejoin Room &rarr;</span>
                </a>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" /> Recent AI Notes & Summaries
              </h3>
              <a href="/ai-notes" className="text-xs text-purple-400 font-semibold hover:underline flex items-center gap-1">
                Generate Notes <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-200 text-sm">Quantum Mechanics & Wave Duality</h5>
                  <p className="text-slate-400 text-xs mt-0.5">3 key takeaways • OpenAI gpt-4o</p>
                </div>
                <span className="text-xs text-slate-400">Today, 14:30</span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-200 text-sm">Organic Chemistry Reaction Mechanisms</h5>
                  <p className="text-slate-400 text-xs mt-0.5">5 key takeaways • Gemini Fallback</p>
                </div>
                <span className="text-xs text-slate-400">Yesterday</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar: Recent Flashcards & Quizzes */}
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-pink-400" /> AI Flashcard Decks
              </h3>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <p className="font-semibold text-sm text-slate-200">Physics Formulas Deck</p>
                <p className="text-slate-400 text-xs mt-1">12 Cards • 80% Mastery</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <p className="font-semibold text-sm text-slate-200">Calculus Integration Deck</p>
                <p className="text-slate-400 text-xs mt-1">8 Cards • 100% Mastery</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Practice Quiz History
              </h3>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-slate-200">Mechanics Quiz #1</p>
                  <p className="text-slate-400 text-xs mt-0.5">Score: 4/5 (80%)</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">PASSED</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

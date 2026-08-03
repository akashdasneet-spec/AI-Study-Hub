'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { User, Flame, Trophy, Clock, BookOpen, Layers, CheckCircle2, Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function UserProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    } else {
      setUser({ name: 'Alex Student', email: 'alex@studyhub.com', role: 'STUDENT' });
    }
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header Banner */}
      <GlassCard className="!p-8 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-6">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-3xl text-white shadow-xl shadow-indigo-500/30 border border-white/20">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AS'}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold text-white">{user?.name || 'Alex Student'}</h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Level 5 Student
              </span>
            </div>
            <p className="text-slate-400 text-sm">{user?.email || 'alex@studyhub.com'}</p>
            <p className="text-slate-300 text-xs italic">"Striving for peak cognitive performance and JEE physics mastery."</p>
          </div>

          <div className="flex items-center gap-3">
            <GradientButton variant="outline" className="!py-2">
              Edit Profile
            </GradientButton>
          </div>
        </div>
      </GlassCard>

      {/* Stats Summary Grid */}
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
          <div className="h-12 w-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Total XP</span>
            <div className="text-2xl font-black text-white">1,250 XP</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">AI Notes</span>
            <div className="text-2xl font-black text-white">14 Generated</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Quizzes Passed</span>
            <div className="text-2xl font-black text-white">8 Completed</div>
          </div>
        </GlassCard>
      </div>

      {/* Badges & Achievements Section */}
      <GlassCard className="space-y-4">
        <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" /> Earned Badges & Achievements
          </h3>
          <span className="text-xs text-indigo-300 font-semibold">3 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Study Sprint Master</h4>
            <p className="text-slate-400 text-xs">Completed 5 consecutive days of study sessions.</p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">AI Note Synthesizer</h4>
            <p className="text-slate-400 text-xs">Generated over 10 AI study guides from lecture transcripts.</p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Quiz Whiz</h4>
            <p className="text-slate-400 text-xs">Achieved 100% score on 3 consecutive practice quizzes.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

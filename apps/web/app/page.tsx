'use client';

import React from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { Users, Sparkles, BookOpen, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/20 shadow-2xl">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Dual-Model Active (OpenAI + Gemini Fallback)
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Collaborative AI Study Hub for Peak Performance
          </h1>
          <p className="text-slate-300 text-lg">
            Join real-time study rooms, brainstorm on shared whiteboards, and let AI synthesize instant note summaries & practice quizzes.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a href="/rooms/demo-room">
              <GradientButton variant="primary">
                <Users className="w-4 h-4" /> Enter Live Study Room
              </GradientButton>
            </a>
            <a href="/ai-notes">
              <GradientButton variant="secondary">
                <Sparkles className="w-4 h-4" /> Open AI Note Summarizer
              </GradientButton>
            </a>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Realtime Whiteboard & Rooms</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Multi-user synchronized canvas, real-time participant chat, and shared Pomodoro timers powered by Socket.IO.
          </p>
        </GlassCard>

        <GlassCard>
          <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Dual-Model AI Synthesis</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            High-resilience AI completions with automatic failover between OpenAI and Google Gemini and Redis 24h caching.
          </p>
        </GlassCard>

        <GlassCard>
          <div className="h-12 w-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Instant Quiz Generator</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Transform dense lecture transcripts into structured practice quizzes with detailed explanations & scoring metrics.
          </p>
        </GlassCard>
      </section>

      {/* Active Public Rooms Preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" /> Active Public Study Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Session
              </span>
              <h4 className="text-lg font-semibold text-white mt-1">JEE Advanced Physics Sprint</h4>
              <p className="text-slate-400 text-xs mt-1">Owner: Alex Chen • 6/10 Members</p>
            </div>
            <a href="/rooms/jee-physics">
              <GradientButton variant="outline">Join Room</GradientButton>
            </a>
          </GlassCard>

          <GlassCard className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Active Session
              </span>
              <h4 className="text-lg font-semibold text-white mt-1">Data Structures & Algorithms Prep</h4>
              <p className="text-slate-400 text-xs mt-1">Owner: Sarah Jenkins • 4/10 Members</p>
            </div>
            <a href="/rooms/dsa-prep">
              <GradientButton variant="outline">Join Room</GradientButton>
            </a>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

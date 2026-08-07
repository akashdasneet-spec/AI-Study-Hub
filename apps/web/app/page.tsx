import React from 'react';
import Link from 'next/link';
import { GlassCard, GradientButton } from '@hub/ui';
import { Sparkles, Users, BookOpen, Trophy, ArrowRight, ShieldCheck, Flame, Zap, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8 pb-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          The AI-First Collaborative Study Platform for Students
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto">
          Study Smarter Together with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Realtime AI & Peer Rooms
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Transform YouTube lectures, PDFs, and notes into 3D Spaced-Repetition Flashcards and Timed Practice Quizzes in seconds. Collaborate with peers in synchronized Pomodoro rooms.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/register">
            <GradientButton variant="primary" className="!px-8 !py-3.5 text-base shadow-indigo-500/30">
              Get Started for Free <ArrowRight className="w-5 h-5 ml-1" />
            </GradientButton>
          </Link>

          <Link href="/login">
            <GradientButton variant="outline" className="!px-8 !py-3.5 text-base">
              Student Sign In
            </GradientButton>
          </Link>
        </div>

        {/* Live Social Proof Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 max-w-3xl mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">50,000+</div>
            <div className="text-xs text-slate-400 font-medium">Notes Synthesized</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">98.4%</div>
            <div className="text-xs text-slate-400 font-medium">Exam Pass Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-pink-400">12,000+</div>
            <div className="text-xs text-slate-400 font-medium">Active Study Rooms</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-yellow-400">1.2M+</div>
            <div className="text-xs text-slate-400 font-medium">Flashcards Mastered</div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Why Top Students Choose StudyHub AI</h2>
          <p className="text-slate-400 text-sm">Engineered specifically for active recall and peer learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1-Click AI Summarizer</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Paste any YouTube lecture URL or notes to instantly generate key takeaways, definitions, and review questions.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3 hover:border-purple-500/40 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3D Spaced-Repetition Decks</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Active recall cards powered by Leitner SM-2 interval algorithms to lock concepts into long-term memory.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3 hover:border-pink-500/40 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Realtime Group Rooms</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Join public/private study rooms with synchronized Pomodoro timers, interactive canvas whiteboards, and live chat.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Pricing / Tiers CTA */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 border border-indigo-500/30 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Start Mastering Your Curriculum Today</h2>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Tier Available
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Credit Card Required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Access
          </div>
        </div>
        <Link href="/register">
          <GradientButton variant="primary" className="!px-8 !py-3 font-bold">
            Create Free Student Account <ArrowRight className="w-4 h-4 ml-1" />
          </GradientButton>
        </Link>
      </section>
    </div>
  );
}

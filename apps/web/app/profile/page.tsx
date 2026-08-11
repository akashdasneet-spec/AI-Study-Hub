'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard, GradientButton, GamificationBadge, XPProgressBar } from '@hub/ui';
import { AuthGuard } from '../../components/AuthGuard';
import { updateProfileContract } from '@hub/contracts';
import { Flame, Trophy, Save, User, Globe, Target, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { apiClient } from '../../lib/api-client';


export default function UserProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [studyGoals, setStudyGoals] = useState('');
  const [themePreference, setThemePreference] = useState<'dark' | 'light' | 'system'>('dark');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setUser(u);
        setName(u.name || '');
        setAvatarUrl(u.avatarUrl || '');
        setBio(u.bio || '');
        setTimezone(u.timezone || 'UTC');
        setStudyGoals(u.studyGoals || '');
        setThemePreference(u.themePreference || 'dark');
      } catch {}
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);

    try {
      updateProfileContract.parse({ name, avatarUrl, bio, timezone, studyGoals, themePreference });

      const res = await apiClient.put('/auth/profile', {
        name,
        avatarUrl,
        bio,
        timezone,
        studyGoals,
        themePreference,
      });

      if (!res.success) throw new Error(typeof res.error === 'string' ? res.error : res.error?.message || 'Failed to update profile');
      const updatedUser = { ...user, ...(res.data?.data || res.data) };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Profile update failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGuard>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Profile Header */}
        <GlassCard className="!p-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-3xl text-white shadow-xl shadow-indigo-500/30 border border-white/20 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-white">{user?.name || 'Student Profile'}</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {user?.role || 'STUDENT'}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              <p className="text-slate-300 text-xs italic">&quot;{bio || 'No bio set yet.'}&quot;</p>
            </div>
          </div>
        </GlassCard>

        {/* Dynamic User Stats & XP Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase">Streak</span>
              <div className="text-2xl font-black text-white">{user?.studyStreakDays || 1} Days 🔥</div>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <XPProgressBar currentXp={user?.xp ?? 100} nextLevelXp={500} />
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase">Timezone</span>
              <div className="text-xl font-bold text-white">{timezone}</div>
            </div>
          </GlassCard>
        </div>

        {/* Gamification Achievements Grid */}
        <GlassCard className="space-y-4">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" /> Unlocked Achievement Badges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <GamificationBadge icon="🔥" title="7-Day Streak Shield" description="Maintain a continuous 7-day study streak" unlocked={true} />
            <GamificationBadge icon="🧠" title="Active Recall Master" description="Complete 50 spaced-repetition flashcards" unlocked={true} />
            <GamificationBadge icon="🏆" title="Quiz Titan" description="Score 100% on a practice exam" unlocked={true} />
            <GamificationBadge icon="🚀" title="Study Room Host" description="Host a group study session with 5+ peers" unlocked={false} />
          </div>
        </GlassCard>

        {/* Editable Profile Form */}
        <GlassCard className="space-y-6">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Edit Profile Details
            </h3>
          </div>

          {message && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {message}
            </div>
          )}

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Avatar Image URL</label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell peers about your study interests..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST (America/New_York)</option>
                  <option value="PST">PST (America/Los_Angeles)</option>
                  <option value="IST">IST (Asia/Kolkata)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Theme Preference</label>
                <select
                  value={themePreference}
                  onChange={(e) => setThemePreference(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="dark">Dark Mode First</option>
                  <option value="light">Light Mode</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Study Goals</label>
              <input
                type="text"
                value={studyGoals}
                onChange={(e) => setStudyGoals(e.target.value)}
                placeholder="e.g. Master JEE Physics Mechanics"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <GradientButton variant="primary" type="submit" disabled={saving} className="w-full py-3">
              {saving ? 'Saving Profile Changes...' : <><Save className="w-4 h-4" /> Save Profile Changes</>}
            </GradientButton>
          </form>
        </GlassCard>
      </div>
    </AuthGuard>
  );
}

'use client';

import React, { useState } from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { loginContract } from '@hub/contracts';
import { Sparkles, Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate input against Zod contract
      loginContract.parse({ email, password });

      // Call API or simulate authentication response
      const res = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error?.message || 'Invalid credentials');
      }

      // Persist access token in localStorage
      localStorage.setItem('accessToken', json.data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(json.data.user));

      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <GlassCard className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to access your study rooms and AI workspace</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@studyhub.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <GradientButton variant="primary" type="submit" className="w-full py-3" disabled={loading}>
            {loading ? 'Authenticating...' : <><LogIn className="w-4 h-4" /> Sign In</>}
          </GradientButton>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-400 font-semibold hover:underline">
            Register here
          </a>
        </div>
      </GlassCard>
    </div>
  );
}

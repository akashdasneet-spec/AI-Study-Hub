import './globals.css';
import React from 'react';

export const metadata = {
  title: 'AI-Powered Group Study Hub | Collaborative Learning Platform',
  description: 'The world\'s best AI-powered group study platform featuring real-time whiteboards, automated note summaries, and smart quiz generation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen text-slate-100 selection:bg-indigo-500 selection:text-white">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30 text-white">
              S
            </div>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              StudyHub AI
            </span>
          </a>

          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</a>
            <a href="/rooms" className="hover:text-indigo-400 transition-colors">Study Rooms</a>
            <a href="/ai-notes" className="hover:text-indigo-400 transition-colors">AI Workspace</a>
            <a href="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</a>
            <a href="/profile" className="hover:text-indigo-400 transition-colors">Profile</a>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}

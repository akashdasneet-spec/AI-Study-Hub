import './globals.css';
import React from 'react';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Powered Group Study Hub | Collaborative Learning Platform',
  description: "The world's premier AI-powered group study platform featuring 3D spaced-repetition flashcards, automated lecture summaries, practice quizzes, and real-time collaborative whiteboards.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aistudyhub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI-Powered Group Study Hub | Collaborative Learning Platform',
    description: 'Master subjects 40% faster with AI lecture notes, 3D flashcard decks, practice exams, and real-time study rooms.',
    url: 'https://aistudyhub.com',
    siteName: 'StudyHub AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Group Study Hub',
    description: 'Master subjects 40% faster with AI lecture notes, 3D flashcards, and real-time study rooms.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen text-slate-100 bg-slate-950 selection:bg-indigo-500 selection:text-white">
        <header role="banner" className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" aria-label="StudyHub AI Dashboard Home" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30 text-white" aria-hidden="true">
              S
            </div>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              StudyHub AI
            </span>
          </Link>

          <nav aria-label="Global Navigation" className="flex items-center gap-6 text-sm font-semibold text-slate-300">
            <Link href="/dashboard" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1 transition-colors">Dashboard</Link>
            <Link href="/rooms" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1 transition-colors">Study Rooms</Link>
            <Link href="/ai-notes" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1 transition-colors">AI Workspace</Link>
            <Link href="/leaderboard" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1 transition-colors">Leaderboard</Link>
            <Link href="/profile" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1 transition-colors">Profile</Link>
          </nav>
        </header>

        <main role="main" id="main-content" className="max-w-7xl mx-auto px-6 py-8">{children}</main>

      </body>
    </html>
  );
}


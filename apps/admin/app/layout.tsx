import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Admin Dashboard | AI-Powered Group Study Hub',
  description: 'System telemetry, user management, and AI token budget analytics.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen text-slate-100">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-500 to-rose-500 flex items-center justify-center font-black text-lg shadow-lg">
              A
            </div>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-300">
              StudyHub Admin
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              System Health: 100%
            </span>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}

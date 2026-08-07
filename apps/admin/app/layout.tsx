import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Admin Dashboard | AI-Powered Group Study Hub',
  description: 'Telemetry, microservice health, and AI usage monitoring',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen text-slate-100 bg-slate-950">
        <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white">
              A
            </div>
            <span className="font-extrabold text-lg text-white">Admin Telemetry Portal</span>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}

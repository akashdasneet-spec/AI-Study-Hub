'use client';

import { useState, useEffect } from 'react';

interface FocusSession {
  id: string;
  durationMinutes: number;
  subject: string;
  notes?: string;
  completedAt: string;
}

export default function FocusTrackerPage() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState('');
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      handleCompleteSession();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    if (!subject.trim()) {
      setError('Please enter a study subject before starting timer.');
      return;
    }
    setError('');
    setIsActive(true);
  };

  const handlePause = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(25 * 60);
    setError('');
  };

  const handleCompleteSession = () => {
    setLoading(true);
    const newSession: FocusSession = {
      id: `session_${Date.now()}`,
      durationMinutes: 25,
      subject: subject || 'General Focus',
      notes,
      completedAt: new Date().toISOString(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setSuccess('🎉 Focus session completed and logged successfully!');
    setLoading(false);
    setSecondsLeft(25 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <main role="main" aria-label="Smart AI Pomodoro Focus Tracker" className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            🧠 Smart AI Pomodoro Focus Analytics
          </h1>
          <p className="text-slate-400">Track deep work sessions, boost study streak, and optimize focus intervals.</p>
        </header>

        {/* Timer Box */}
        <section aria-label="Timer Control Panel" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6">
          <div role="timer" aria-live="polite" className="text-7xl font-mono font-bold text-blue-400 tracking-wider">
            {formatTime(secondsLeft)}
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="What subject are you studying? (e.g. Physics, Calculus)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Study Subject"
            />
            <input
              type="text"
              placeholder="Session notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Session Notes"
            />
          </div>

          {error && (
            <div role="alert" className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div role="alert" className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30"
              >
                Start Session
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-500 font-semibold rounded-xl transition-all shadow-lg shadow-amber-600/30"
              >
                Pause Session
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Focus Analytics Log */}
        <section aria-label="Focus Analytics Log" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl space-y-4">
          <h2 className="text-xl font-bold text-slate-200">📊 Focus Analytics History</h2>

          {loading ? (
            <div role="status" className="text-center py-8 text-slate-400">
              Loading session analytics...
            </div>
          ) : sessions.length === 0 ? (
            <div role="status" className="text-center py-8 text-slate-500 border border-dashed border-slate-800 rounded-xl">
              No completed focus sessions logged yet. Start a session above!
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="flex justify-between items-center bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-blue-300">{s.subject}</h3>
                    {s.notes && <p className="text-xs text-slate-400">{s.notes}</p>}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono bg-blue-950 text-blue-300 border border-blue-800/50 px-2 py-1 rounded">
                      {s.durationMinutes} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { Users, Send, Play, Pause, RotateCcw, Sparkles, BookOpen, Layers, ShieldCheck, MessageSquare, Mic, PenTool } from 'lucide-react';

export default function StudyRoomPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', userName: 'Alex Chen', text: 'Welcome to the room! Let\'s tackle Mechanics Problem #4.', time: '14:20' },
    { id: '2', userName: 'Sarah Jenkins', text: 'I\'m uploading the lecture transcript to generate AI notes.', time: '14:21' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'ai-tools'>('chat');

  // Timer countdown hook
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        userName: 'You',
        text: inputMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMsg('');
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Room Header & Synchronized Pomodoro Widget */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Room ID: {params.id}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Session
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Active Study Room</h1>
        </div>

        {/* Synchronized Pomodoro Control */}
        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-5 py-2.5 rounded-2xl shadow-xl">
          <div className="font-mono text-2xl font-black text-indigo-400">{formatTimer(timerSeconds)}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              title={isTimerRunning ? 'Pause Session' : 'Start Session'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setIsTimerRunning(false); setTimerSeconds(1500); }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset Pomodoro"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Placeholders for Whiteboard (v1.1) & Feature Extensions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vector Whiteboard Placeholder Card (v1.1) */}
          <GlassCard className="flex flex-col h-[380px] justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white flex items-center gap-2">
                <PenTool className="w-4 h-4 text-indigo-400" /> Collaborative Vector Whiteboard
              </h3>
              <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                v1.1 Feature Placeholder
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-slate-950/60 rounded-xl border border-slate-800/80 my-2">
              <PenTool className="w-12 h-12 text-slate-700 animate-pulse" />
              <div>
                <h4 className="font-bold text-white text-base">Shared Interactive Canvas</h4>
                <p className="text-slate-400 text-xs mt-1 max-w-md">
                  Real-time multi-user stroke drawing, math equations, and diagram synchronization is scheduled for the v1.1 release.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Voice Room Placeholder Card (v2.0) */}
          <GlassCard className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Realtime Voice Channel</h4>
                <p className="text-slate-400 text-xs">Low-latency WebRTC audio channel for room members.</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
              v2.0 Feature
            </span>
          </GlassCard>
        </div>

        {/* Right Column: Chat, Participants & AI Tools Sidebar */}
        <GlassCard className="flex flex-col h-[520px]">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'participants' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Members (3)
            </button>
            <button
              onClick={() => setActiveTab('ai-tools')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'ai-tools' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Tools
            </button>
          </div>

          {/* Tab 1: Realtime Room Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-indigo-300">{msg.userName}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="text-slate-200 text-sm">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type message..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <GradientButton variant="primary" type="submit" className="!px-3">
                  <Send className="w-4 h-4" />
                </GradientButton>
              </form>
            </div>
          )}

          {/* Tab 2: Active Participants List */}
          {activeTab === 'participants' && (
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-500/20 border border-indigo-500 flex items-center justify-center font-bold text-xs text-indigo-300">
                    AC
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Alex Chen</p>
                    <p className="text-slate-400 text-[10px]">Room Host</p>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center font-bold text-xs text-purple-300">
                    SJ
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Sarah Jenkins</p>
                    <p className="text-slate-400 text-[10px]">Member</p>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          )}

          {/* Tab 3: AI Tools Sidebar */}
          {activeTab === 'ai-tools' && (
            <div className="flex-1 space-y-3">
              <a href="/ai-notes" className="block">
                <div className="p-4 bg-slate-900/80 hover:bg-slate-800/90 rounded-xl border border-slate-800 space-y-2 transition-colors">
                  <div className="flex items-center gap-2 text-purple-400">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-bold text-sm text-white">Generate AI Notes</span>
                  </div>
                  <p className="text-slate-400 text-xs">Synthesize smart note summaries & key takeaways.</p>
                </div>
              </a>

              <a href="/ai-notes" className="block">
                <div className="p-4 bg-slate-900/80 hover:bg-slate-800/90 rounded-xl border border-slate-800 space-y-2 transition-colors">
                  <div className="flex items-center gap-2 text-pink-400">
                    <Layers className="w-4 h-4" />
                    <span className="font-bold text-sm text-white">Flashcard & Quiz Generator</span>
                  </div>
                  <p className="text-slate-400 text-xs">Convert study text into structured practice quizzes.</p>
                </div>
              </a>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

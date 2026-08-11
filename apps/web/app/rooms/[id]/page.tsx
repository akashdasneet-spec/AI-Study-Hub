'use client';

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { GlassCard, GradientButton } from '@hub/ui';
import { Users, Send, Play, Pause, RotateCcw, Sparkles, MessageSquare, Mic, PenTool, Wifi } from 'lucide-react';

export default function StudyRoomPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', userName: 'System', text: `Connected to Study Room (${params.id}).`, time: 'Now' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    let effectiveUserName = 'Student';
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.name) {
          effectiveUserName = u.name;
          setUserName(u.name);
        }
      } catch {}
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4001/realtime/rooms';
    const s = io(wsUrl, { transports: ['websocket', 'polling'] });

    s.on('connect', () => {
      s.emit('room:join', { roomId: params.id, userName: effectiveUserName });
    });

    s.on('chat:broadcast', (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on('timer:state', (data: { isRunning: boolean }) => {
      setIsTimerRunning(data.isRunning);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [params.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    const nextState = !isTimerRunning;
    setIsTimerRunning(nextState);
    if (socket) {
      socket.emit('timer:toggle', { roomId: params.id, isRunning: nextState });
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    if (socket) {
      socket.emit('chat:message', { roomId: params.id, userName, text: inputMsg });
    } else {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), userName: 'You', text: inputMsg, time: 'Now' },
      ]);
    }
    setInputMsg('');
  };


  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Room ID: {params.id}
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Active Study Room</h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-5 py-2.5 rounded-2xl shadow-xl">
          <div className="font-mono text-2xl font-black text-indigo-400">{formatTimer(timerSeconds)}</div>
          <button
            onClick={toggleTimer}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
              <h4 className="font-bold text-white text-base">Shared Interactive Canvas</h4>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="flex flex-col h-[500px] justify-between">
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
        </GlassCard>
      </div>
    </div>
  );
}

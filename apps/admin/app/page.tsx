'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@hub/ui';
import { Activity, Server, Cpu, Database, ShieldCheck, Zap } from 'lucide-react';

export default function AdminDashboardPage() {
  const [health, setHealth] = useState<any>({
    status: 'HEALTHY',
    uptimeSeconds: 3600,
    services: { apiGateway: 'HEALTHY', aiService: 'HEALTHY', websockets: 'HEALTHY', database: 'CONNECTED' },
  });

  const [metrics, setMetrics] = useState<any>({
    activeConnections: 42,
    aiTokenBudget: { usedToday: 12500, softCap: 500000, hardCap: 1000000 },
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

    fetch(`${apiUrl}/telemetry/health`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.services) setHealth(json);
      })
      .catch(() => {});

    fetch(`${apiUrl}/telemetry/metrics`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMetrics(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            System Overview
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Admin Telemetry & Health</h1>
          <p className="text-slate-400 text-sm">Monitor microservices cluster status, AI token usage, and database metrics.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" /> System Uptime: {Math.floor(health.uptimeSeconds / 60)}m
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">API Gateway</span>
            <div className="text-xl font-bold text-white">{health.services?.apiGateway || 'HEALTHY'}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">AI Service</span>
            <div className="text-xl font-bold text-white">{health.services?.aiService || 'HEALTHY'}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">WebSockets</span>
            <div className="text-xl font-bold text-white">{health.services?.websockets || 'HEALTHY'}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">PostgreSQL</span>
            <div className="text-xl font-bold text-white">{health.services?.database || 'CONNECTED'}</div>
          </div>
        </GlassCard>
      </div>

      {/* AI Token Budget & Active Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-3">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" /> AI Daily Token Consumption
          </h3>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Used Today</span>
              <span className="text-indigo-400">{metrics.aiTokenBudget?.usedToday.toLocaleString()} / {metrics.aiTokenBudget?.softCap.toLocaleString()} Tokens</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                style={{ width: `${Math.min(100, Math.round((metrics.aiTokenBudget?.usedToday / metrics.aiTokenBudget?.softCap) * 100))}%` }}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-3">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Active WebSocket Sessions
          </h3>
          <div className="text-3xl font-black text-white">{metrics.activeConnections} Peer Clients</div>
          <p className="text-xs text-slate-400">Connected to realtime study room namespaces</p>
        </GlassCard>
      </div>
    </div>
  );
}


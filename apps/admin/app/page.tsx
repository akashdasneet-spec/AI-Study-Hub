'use client';

import React from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { Activity, Users, Cpu, ShieldAlert, Database, Server, RefreshCw } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">System Telemetry & AI Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time overview of active cluster nodes, AI token budget, and database connections.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>Total Active Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">1,248</div>
          <span className="text-xs text-emerald-400 font-medium">+14% from last week</span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>AI Token Usage (Today)</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">248.5k</div>
          <span className="text-xs text-indigo-300 font-medium">Soft Limit: 500k / day</span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>Redis Cache Hit Rate</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">88.4%</div>
          <span className="text-xs text-emerald-400 font-medium">24h TTL Prompt Caching</span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>API Latency (p95)</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-white">42 ms</div>
          <span className="text-xs text-emerald-400 font-medium">Target: &lt; 200 ms</span>
        </GlassCard>
      </div>

      {/* Infrastructure & Services Status */}
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-400" /> Services Health Matrix
          </h3>
          <GradientButton variant="outline" className="!py-1.5 !px-3 !text-xs">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">NestJS API Gateway</p>
              <p className="text-slate-400 text-xs mt-0.5">Port 4000 • `/api/v1`</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">ONLINE</span>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">PostgreSQL Cluster</p>
              <p className="text-slate-400 text-xs mt-0.5">Port 5432 • Prisma ORM</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">HEALTHY</span>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">Redis Memory Store</p>
              <p className="text-slate-400 text-xs mt-0.5">Port 6379 • PubSub & Cache</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">READY</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

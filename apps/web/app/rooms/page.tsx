'use client';

import React, { useState } from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { AuthGuard } from '../../components/AuthGuard';
import { Users, Search, Globe, ArrowRight } from 'lucide-react';

export default function RoomsDiscoveryPage() {
  const [rooms] = useState<any[]>([
    { id: 'jee-physics', title: 'JEE Physics Mechanics Sprint', description: 'Active problem solving on mechanics & thermodynamics', isPrivate: false, maxParticipants: 10, participantsCount: 6, ownerName: 'Alex Chen' },
    { id: 'dsa-prep', title: 'Data Structures & Algorithms', description: 'LeetCode Medium/Hard practice & code reviews', isPrivate: false, maxParticipants: 10, participantsCount: 4, ownerName: 'Sarah Jenkins' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = rooms.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Realtime Collaboration
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Study Room Discovery</h1>
            <p className="text-slate-400 text-sm">Join active group rooms or launch your own study session.</p>
          </div>
        </div>

        <GlassCard className="!p-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search study rooms by title or topic..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <GlassCard key={room.id} className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    <Globe className="w-3 h-3 inline mr-1" /> Public
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {room.participantsCount} / {room.maxParticipants} Members
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{room.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{room.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Host: <strong className="text-slate-200">{room.ownerName}</strong></span>
                <a href={`/rooms/${room.id}`}>
                  <GradientButton variant="outline" className="!py-1.5 !px-3 !text-xs">
                    Enter Room <ArrowRight className="w-3 h-3" />
                  </GradientButton>
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}

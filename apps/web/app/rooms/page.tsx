'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard, GradientButton } from '@hub/ui';
import { roomContract } from '@hub/contracts';
import { Users, Search, Plus, Lock, Globe, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RoomsDiscoveryPage() {
  const [rooms, setRooms] = useState<any[]>([
    { id: 'jee-physics', title: 'JEE Physics Mechanics Sprint', description: 'Active problem solving on mechanics & thermodynamics', isPrivate: false, maxParticipants: 10, participantsCount: 6, ownerName: 'Alex Chen' },
    { id: 'dsa-prep', title: 'Data Structures & Algorithms', description: 'LeetCode Medium/Hard practice & code reviews', isPrivate: false, maxParticipants: 10, participantsCount: 4, ownerName: 'Sarah Jenkins' },
    { id: 'organic-chem', title: 'Organic Chemistry Reactions', description: 'Reaction mechanisms & functional group drills', isPrivate: true, maxParticipants: 8, participantsCount: 3, ownerName: 'David Kim' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/rooms');
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setRooms(json.data);
      }
    } catch {}
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      roomContract.parse({ title: newTitle, description: newDesc, isPrivate });

      const res = await fetch('http://localhost:4000/api/v1/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc, isPrivate }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to create room');

      setShowCreateModal(false);
      setNewTitle('');
      setNewDesc('');
      fetchRooms();
    } catch (err: any) {
      setError(err.message || 'Room creation failed');
    }
  };

  const filteredRooms = rooms.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Realtime Collaboration
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Study Room Discovery</h1>
          <p className="text-slate-400 text-sm">Join active group rooms or launch your own study session.</p>
        </div>

        <GradientButton variant="primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" /> Create Study Room
        </GradientButton>
      </div>

      {/* Search & Filter Bar */}
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

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <GlassCard key={room.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                  room.isPrivate
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {room.isPrivate ? <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Private</span> : <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Public</span>}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {room.participantsCount || room.participants?.length || 1} / {room.maxParticipants || 10} Members
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{room.title}</h3>
              {room.description && <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{room.description}</p>}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Host: <strong className="text-slate-200">{room.ownerName || 'Alex'}</strong></span>
              <a href={`/rooms/${room.id}`}>
                <GradientButton variant="outline" className="!py-1.5 !px-3 !text-xs">
                  Enter Room <ArrowRight className="w-3 h-3" />
                </GradientButton>
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="w-full max-w-lg space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" /> Create New Study Room
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Room Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Physics Calculus Problem Solving"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief summary of room topics & goals..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500"
                />
                <label htmlFor="isPrivate" className="text-sm text-slate-300 font-medium">Make room private (require passcode)</label>
              </div>

              <div className="flex gap-3 pt-2">
                <GradientButton variant="primary" type="submit" className="flex-1">Create & Launch</GradientButton>
                <GradientButton variant="secondary" type="button" onClick={() => setShowCreateModal(false)}>Cancel</GradientButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

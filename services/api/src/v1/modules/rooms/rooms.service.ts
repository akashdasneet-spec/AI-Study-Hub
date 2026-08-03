import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RoomsService {
  private rooms: any[] = [
    { id: 'physics-101', title: 'Physics Sprint Room', isPrivate: false, maxParticipants: 10, ownerId: 'usr-101' },
    { id: 'dsa-prep', title: 'Data Structures & Algorithms', isPrivate: false, maxParticipants: 10, ownerId: 'usr-102' },
  ];

  async createRoom(ownerId: string, data: { title: string; description?: string; isPrivate?: boolean; maxParticipants?: number }) {
    const room = {
      id: `room-${Date.now()}`,
      title: data.title,
      description: data.description,
      isPrivate: data.isPrivate ?? false,
      maxParticipants: data.maxParticipants ?? 10,
      ownerId,
      createdAt: new Date().toISOString(),
    };
    this.rooms.push(room);
    return room;
  }

  async listRooms() {
    return this.rooms;
  }

  async getRoomById(id: string) {
    const room = this.rooms.find((r) => r.id === id);
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);
    return room;
  }
}

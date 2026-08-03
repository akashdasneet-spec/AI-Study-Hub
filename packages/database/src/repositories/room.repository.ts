export interface RoomRecord {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  isPrivate: boolean;
  maxParticipants: number;
  participants: string[];
}

export class RoomRepository {
  private rooms: Map<string, RoomRecord> = new Map([
    [
      'jee-physics',
      {
        id: 'jee-physics',
        title: 'JEE Physics Sprint',
        description: 'Active problem solving on mechanics and thermodynamics',
        ownerId: 'usr-101',
        isPrivate: false,
        maxParticipants: 10,
        participants: ['usr-101', 'usr-102'],
      },
    ],
  ]);

  async listPublicRooms(): Promise<RoomRecord[]> {
    return Array.from(this.rooms.values()).filter((r) => !r.isPrivate);
  }

  async findRoomById(roomId: string): Promise<RoomRecord | null> {
    return this.rooms.get(roomId) || null;
  }

  async joinRoom(roomId: string, userId: string): Promise<RoomRecord> {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`Room ${roomId} not found`);

    if (!room.participants.includes(userId)) {
      if (room.participants.length >= room.maxParticipants) {
        throw new Error(`Room ${roomId} is full`);
      }
      room.participants.push(userId);
    }
    return room;
  }

  async leaveRoom(roomId: string, userId: string): Promise<void> {
    const room = this.rooms.get(roomId);
    if (room) {
      room.participants = room.participants.filter((id) => id !== userId);
    }
  }

  async createRoom(ownerId: string, data: { title: string; description?: string; isPrivate?: boolean; maxParticipants?: number }): Promise<RoomRecord> {
    const room: RoomRecord = {
      id: `room-${Date.now()}`,
      title: data.title,
      description: data.description,
      ownerId,
      isPrivate: data.isPrivate ?? false,
      maxParticipants: data.maxParticipants ?? 10,
      participants: [ownerId],
    };
    this.rooms.set(room.id, room);
    return room;
  }
}

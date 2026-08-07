export class RoomRepository {
  private rooms = new Map<string, any>();

  async createRoom(data: { title: string; description?: string; isPrivate?: boolean; maxParticipants?: number; ownerId: string; ownerName?: string }) {
    const room = {
      id: `room_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: data.title,
      description: data.description || '',
      isPrivate: data.isPrivate || false,
      maxParticipants: data.maxParticipants || 10,
      participantsCount: 1,
      participants: [data.ownerId],
      ownerId: data.ownerId,
      ownerName: data.ownerName || 'Study Room Host',
      createdAt: new Date().toISOString(),
    };
    this.rooms.set(room.id, room);
    return room;
  }

  async listPublicRooms() {
    return Array.from(this.rooms.values()).filter((r) => !r.isPrivate);
  }

  async findById(id: string) {
    return this.rooms.get(id) || null;
  }

  async findRoomById(id: string) {
    return this.findById(id);
  }

  async joinRoom(roomId: string, userId: string) {
    const room = await this.findById(roomId);
    if (!room) return null;
    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
      room.participantsCount = room.participants.length;
    }
    this.rooms.set(roomId, room);
    return room;
  }

}

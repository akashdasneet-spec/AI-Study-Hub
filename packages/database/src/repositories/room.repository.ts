export class RoomRepository {
  private rooms = new Map<string, any>();

  async createRoom(data: { title: string; description?: string; isPrivate: boolean; ownerId: string; ownerName: string }) {
    const room = {
      id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title: data.title,
      description: data.description || '',
      isPrivate: data.isPrivate,
      maxParticipants: 10,
      participantsCount: 1,
      ownerId: data.ownerId,
      ownerName: data.ownerName,
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
}

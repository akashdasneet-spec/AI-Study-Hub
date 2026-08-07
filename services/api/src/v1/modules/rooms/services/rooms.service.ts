import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomRepository } from '@hub/database';

@Injectable()
export class RoomsService {
  private roomRepo = new RoomRepository();

  async createRoom(title: string, description?: string, isPrivate: boolean = false, ownerId: string = 'usr_1', ownerName: string = 'Alex') {
    return this.roomRepo.createRoom({ title, description, isPrivate, ownerId, ownerName });
  }

  async listRooms() {
    return this.roomRepo.listPublicRooms();
  }

  async getRoomById(id: string) {
    const room = await this.roomRepo.findById(id);
    if (!room) throw new NotFoundException('Study room not found');
    return room;
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RoomRepository } from '@hub/database';
import { RoomEntity } from '../domain/room.entity';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomService {
  private readonly roomRepo = new RoomRepository();

  async createRoom(ownerId: string, dto: CreateRoomDto) {
    const raw = await this.roomRepo.createRoom(ownerId, dto);
    return new RoomEntity(raw);
  }

  async listRooms() {
    const rooms = await this.roomRepo.listPublicRooms();
    return rooms.map((r) => new RoomEntity(r));
  }

  async joinRoom(roomId: string, userId: string) {
    const raw = await this.roomRepo.findRoomById(roomId);
    if (!raw) throw new NotFoundException(`Room ${roomId} not found`);

    const room = new RoomEntity(raw);
    if (!room.canUserJoin(userId)) {
      throw new BadRequestException(`User ${userId} cannot join room ${roomId}`);
    }

    const updated = await this.roomRepo.joinRoom(roomId, userId);
    return new RoomEntity(updated);
  }
}

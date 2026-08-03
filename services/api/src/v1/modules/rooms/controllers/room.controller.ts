import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoomService } from '../services/room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async listRooms() {
    const rooms = await this.roomService.listRooms();
    return { success: true, data: rooms };
  }

  @Post()
  async createRoom(@Body() body: any) {
    const ownerId = body.ownerId || 'usr-101';
    const room = await this.roomService.createRoom(ownerId, body);
    return { success: true, data: room };
  }

  @Post(':id/join')
  async joinRoom(@Param('id') id: string, @Body() body: any) {
    const userId = body.userId || 'usr-102';
    const room = await this.roomService.joinRoom(id, userId);
    return { success: true, data: room };
  }
}

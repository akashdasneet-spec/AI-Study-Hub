import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { createRoomSchema } from '@hub/utils';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async listRooms() {
    const rooms = await this.roomsService.listRooms();
    return { success: true, data: rooms };
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    const room = await this.roomsService.getRoomById(id);
    return { success: true, data: room };
  }

  @Post()
  async createRoom(@Body() body: any) {
    const validated = createRoomSchema.parse(body);
    // Standard ownerId fallback for development demo until auth guard header extraction
    const ownerId = body.ownerId || 'demo-owner-id';
    const room = await this.roomsService.createRoom(ownerId, validated);
    return { success: true, data: room };
  }
}

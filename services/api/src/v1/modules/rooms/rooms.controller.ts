import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { createRoomSchema } from '@hub/utils';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async listRooms() {
    const data = await this.roomsService.listRooms();
    return { success: true, data };
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    const data = await this.roomsService.getRoomById(id);
    return { success: true, data };
  }

  @Post()
  async createRoom(@Body() body: any) {
    const validated = createRoomSchema.parse(body);
    const ownerId = body.ownerId || 'demo-owner';
    const data = await this.roomsService.createRoom(ownerId, validated);
    return { success: true, data };
  }
}

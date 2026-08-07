import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async listRooms() {
    const data = await this.roomsService.listRooms();
    return { success: true, data };
  }

  @Post()
  async createRoom(@Body() body: any) {
    const data = await this.roomsService.createRoom(body.title, body.description, body.isPrivate);
    return { success: true, data };
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    const data = await this.roomsService.getRoomById(id);
    return { success: true, data };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(ownerId: string, data: { title: string; description?: string; isPrivate?: boolean; maxParticipants?: number }) {
    const room = await this.prisma.studyRoom.create({
      data: {
        title: data.title,
        description: data.description,
        isPrivate: data.isPrivate ?? false,
        maxParticipants: data.maxParticipants ?? 10,
        ownerId,
        participants: {
          create: {
            userId: ownerId,
            role: 'OWNER',
          },
        },
      },
      include: {
        owner: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
    });

    return room;
  }

  async listRooms() {
    return this.prisma.studyRoom.findMany({
      where: { isPrivate: false },
      include: {
        owner: { select: { id: true, name: true, avatarUrl: true } },
        _count: { select: { participants: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRoomById(id: string) {
    const room = await this.prisma.studyRoom.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, avatarUrl: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Study room with ID ${id} not found`);
    }

    return room;
  }
}

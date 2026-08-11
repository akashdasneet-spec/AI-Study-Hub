import { Injectable, BadRequestException } from '@nestjs/common';
import { FocusSessionRepository } from '@hub/database';
import { createFocusSessionSchema } from '@hub/contracts';
import { CreateFocusSessionDto } from '../dto/create-focus-session.dto';

@Injectable()
export class FocusService {
  private readonly repo = new FocusSessionRepository();

  async recordSession(userId: string, dto: CreateFocusSessionDto) {
    const parsed = createFocusSessionSchema.parse(dto);
    const session = await this.repo.createSession({
      userId,
      durationMinutes: parsed.durationMinutes,
      subject: parsed.subject,
      notes: parsed.notes,
    });
    return session;
  }

  async getUserSessions(userId: string) {
    if (!userId) throw new BadRequestException('User ID is required');
    return this.repo.getUserSessions(userId);
  }
}

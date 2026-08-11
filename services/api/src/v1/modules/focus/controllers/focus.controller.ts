import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { FocusService } from '../services/focus.service';
import { CreateFocusSessionDto } from '../dto/create-focus-session.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Post('session')
  @UseGuards(JwtAuthGuard)
  async recordSession(@Req() req: any, @Body() body: CreateFocusSessionDto) {
    const data = await this.focusService.recordSession(req.user.sub, body);
    return { success: true, data };
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  async getSessions(@Req() req: any) {
    const data = await this.focusService.getUserSessions(req.user.sub);
    return { success: true, data };
  }
}

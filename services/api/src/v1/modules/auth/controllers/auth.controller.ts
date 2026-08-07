import { Controller, Post, Get, Put, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.register(body);

    res.cookie('refreshToken', data.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true, data };
  }

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(body);

    res.cookie('refreshToken', data.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true, data };
  }

  @Post('refresh')
  async refresh(@Req() req: any, @Body('refreshToken') bodyToken: string, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken || bodyToken;
    const data = await this.authService.refreshToken(token);

    res.cookie('refreshToken', data.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true, data };
  }

  @Post('logout')
  async logout(@Req() req: any, @Body('refreshToken') bodyToken: string, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken || bodyToken;
    await this.authService.logout(token);

    res.clearCookie('refreshToken');
    return { success: true, message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    const data = await this.authService.getProfile(req.user.sub);
    return { success: true, data };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: any, @Body() body: any) {
    const data = await this.authService.updateProfile(req.user.sub, body);
    return { success: true, data };
  }

  @Get('leaderboard')
  async getLeaderboard() {
    const data = await this.authService.getLeaderboard();
    return { success: true, data };
  }
}


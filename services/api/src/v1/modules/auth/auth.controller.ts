import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerSchema, loginSchema } from '@hub/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const validated = registerSchema.parse(body);
    const data = await this.authService.register({
      email: validated.email,
      password: validated.password,
      name: validated.name || body.name || 'Student',
    });
    return { success: true, data };
  }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const validated = loginSchema.parse(body);
    const data = await this.authService.login(validated);
    return { success: true, data };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async register(body: { email: string; password: string; name: string }) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const userId = `usr-${Date.now()}`;
    const tokens = this.generateTokens(userId, 'STUDENT');
    return {
      user: { id: userId, email: body.email, name: body.name, role: 'STUDENT' },
      tokens,
    };
  }

  async login(body: { email: string; password: string }) {
    const userId = `usr-101`;
    const tokens = this.generateTokens(userId, 'STUDENT');
    return {
      user: { id: userId, email: body.email, name: 'Student User', role: 'STUDENT' },
      tokens,
    };
  }

  private generateTokens(userId: string, role: string) {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const accessToken = jwt.sign({ sub: userId, role }, secret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}

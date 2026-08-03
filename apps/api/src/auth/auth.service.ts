import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(body: { email: string; password: string; name: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        passwordHash,
      },
    });

    const tokens = this.generateTokens(user.id, user.role);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      tokens,
    };
  }

  async login(body: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(body.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.generateTokens(user.id, user.role);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
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

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@hub/database';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@hub/auth';
import { registerContract, loginContract, updateProfileContract } from '@hub/contracts';

@Injectable()
export class AuthService {
  private userRepo = new UserRepository();

  async register(body: { email: string; password: string; name?: string }) {
    const parsed = registerContract.parse(body);

    const existing = await this.userRepo.findByEmail(parsed.email);
    if (existing) {
      throw new BadRequestException('An account with this email address already exists');
    }

    const user = await this.userRepo.createUser({
      email: parsed.email,
      password: parsed.password,
      name: parsed.name,
    });


    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, email: user.email, role: user.role });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await this.userRepo.saveRefreshToken(user.id, refreshToken, expiresAt);

    // Omit passwordHash from response
    const { passwordHash, ...userClean } = user;

    return {
      user: userClean,
      tokens: { accessToken, refreshToken },
    };
  }

  async login(body: any) {
    const parsed = loginContract.parse(body);

    const user = await this.userRepo.findByEmail(parsed.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email address or password');
    }

    const isMatch = await this.userRepo.verifyPassword(parsed.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email address or password');
    }

    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, email: user.email, role: user.role });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.userRepo.saveRefreshToken(user.id, refreshToken, expiresAt);

    const { passwordHash, ...userClean } = user;

    return {
      user: userClean,
      tokens: { accessToken, refreshToken },
    };
  }

  async refreshToken(token: string) {
    if (!token) throw new UnauthorizedException('Refresh token is required');

    const isValid = await this.userRepo.isRefreshTokenValid(token);
    if (!isValid) throw new UnauthorizedException('Refresh token is invalid or expired');

    try {
      const payload = verifyRefreshToken(token);
      const user = await this.userRepo.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');

      const newAccessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
      const newRefreshToken = signRefreshToken({ sub: user.id, email: user.email, role: user.role });

      await this.userRepo.revokeRefreshToken(token);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await this.userRepo.saveRefreshToken(user.id, newRefreshToken, expiresAt);

      const { passwordHash, ...userClean } = user;

      return {
        user: userClean,
        tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string) {
    if (refreshToken) {
      await this.userRepo.revokeRefreshToken(refreshToken);
    }
    return { success: true, message: 'Successfully logged out' };
  }

  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    const { passwordHash, ...userClean } = user;
    return userClean;
  }

  async updateProfile(userId: string, body: any) {
    const parsed = updateProfileContract.parse(body);
    const updated = await this.userRepo.updateProfile(userId, parsed);
    const { passwordHash, ...userClean } = updated;
    return userClean;
  }

  async getLeaderboard() {
    const users = await this.userRepo.getAllUsersSortedByXp();
    return users.map(({ passwordHash, ...clean }, idx) => ({
      rank: idx + 1,
      ...clean,
    }));
  }
}

import { NextResponse } from 'next/server';
import { UserRepository } from '@hub/database';
import { signAccessToken, signRefreshToken } from '@hub/auth';
import { registerContract } from '@hub/contracts';

const userRepo = new UserRepository();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerContract.parse(body);

    const existing = await userRepo.findByEmail(parsed.email);
    if (existing) {
      return NextResponse.json(
        { success: false, statusCode: 400, error: { message: 'An account with this email address already exists' } },
        { status: 400 }
      );
    }

    const user = await userRepo.createUser({
      email: parsed.email,
      password: parsed.password,
      name: parsed.name,
    });

    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, email: user.email, role: user.role });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await userRepo.saveRefreshToken(user.id, refreshToken, expiresAt);

    const { passwordHash, ...userClean } = user;

    const response = NextResponse.json({
      success: true,
      data: {
        user: userClean,
        tokens: { accessToken, refreshToken },
      },
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, statusCode: 400, error: { message: err.message || 'Registration failed' } },
      { status: 400 }
    );
  }
}

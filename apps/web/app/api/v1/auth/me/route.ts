import { NextResponse } from 'next/server';
import { UserRepository } from '@hub/database';
import { getAuthUser } from '../../../../../lib/server-auth';

const userRepo = new UserRepository();

export async function GET(request: Request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json(
      { success: false, statusCode: 401, error: { message: 'Authorization header is required' } },
      { status: 401 }
    );
  }

  const user = await userRepo.findById(authUser.sub);
  if (!user) {
    return NextResponse.json(
      { success: false, statusCode: 404, error: { message: 'User not found' } },
      { status: 404 }
    );
  }

  const { passwordHash, ...userClean } = user;
  return NextResponse.json({ success: true, data: userClean });
}

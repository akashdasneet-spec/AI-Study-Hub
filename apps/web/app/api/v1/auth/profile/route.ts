import { NextResponse } from 'next/server';
import { UserRepository } from '@hub/database';
import { updateProfileContract } from '@hub/contracts';
import { getAuthUser } from '../../../../../lib/server-auth';

const userRepo = new UserRepository();

export async function PUT(request: Request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json(
      { success: false, statusCode: 401, error: { message: 'Authorization header is required' } },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = updateProfileContract.parse(body);

    const updated = await userRepo.updateProfile(authUser.sub, parsed);
    const { passwordHash, ...userClean } = updated;

    return NextResponse.json({ success: true, data: userClean });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, statusCode: 400, error: { message: err.message || 'Profile update failed' } },
      { status: 400 }
    );
  }
}

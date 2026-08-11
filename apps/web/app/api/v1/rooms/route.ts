import { NextResponse } from 'next/server';
import { RoomRepository } from '@hub/database';
import { roomContract } from '@hub/contracts';
import { getAuthUser } from '../../../../lib/server-auth';

const roomRepo = new RoomRepository();

export async function GET() {
  const rooms = await roomRepo.listPublicRooms();
  return NextResponse.json({ success: true, data: rooms });
}

export async function POST(request: Request) {
  const authUser = getAuthUser(request);
  const userId = authUser ? authUser.sub : 'usr-demo';

  try {
    const body = await request.json();
    const parsed = roomContract.parse(body);

    const room = await roomRepo.createRoom({
      title: parsed.title,
      description: parsed.description,
      isPrivate: parsed.isPrivate,
      maxParticipants: parsed.maxParticipants,
      ownerId: userId,
    });

    return NextResponse.json({ success: true, data: room });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, statusCode: 400, error: { message: err.message || 'Room creation failed' } },
      { status: 400 }
    );
  }
}

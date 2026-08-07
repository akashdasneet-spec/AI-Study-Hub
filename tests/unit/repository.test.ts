import { UserRepository, RoomRepository } from '@hub/database';

describe('Domain Repository Abstractions', () => {
  it('should create and retrieve a user entity', async () => {
    const repo = new UserRepository();
    const created = await repo.createUser({ email: 'test@studyhub.com', passwordHash: 'hash123', name: 'Test Student' });
    expect(created.id).toBeDefined();

    const found = await repo.findByEmail('test@studyhub.com');
    expect(found?.name).toBe('Test Student');
  });

  it('should create and list public study rooms', async () => {
    const repo = new RoomRepository();
    await repo.createRoom({ title: 'Physics Sprint', isPrivate: false, ownerId: 'u1', ownerName: 'Alex' });
    const publicRooms = await repo.listPublicRooms();
    expect(publicRooms.length).toBe(1);
  });
});

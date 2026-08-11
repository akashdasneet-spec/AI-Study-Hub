import { RoomService } from '../../services/api/src/v1/modules/rooms/services/room.service';

describe('RoomService Domain Logic Suite', () => {
  let roomService: RoomService;

  beforeEach(() => {
    roomService = new RoomService();
  });

  it('should create public study rooms with host as initial participant', async () => {
    const room = await roomService.createRoom('usr_host_1', {
      title: 'Physics Homework Study Group',
      description: 'Solving mechanics problems',
      isPrivate: false,
    });

    expect(room.id).toBeDefined();
    expect(room.title).toBe('Physics Homework Study Group');
    expect(room.isPrivate).toBe(false);
    expect(room.participants).toContain('usr_host_1');
  });

  it('should allow valid participants to join open study rooms', async () => {
    const room = await roomService.createRoom('usr_host_1', {
      title: 'Math Olympiad Prep',
      isPrivate: false,
    });

    const updated = await roomService.joinRoom(room.id, 'usr_student_2');
    expect(updated.participants).toContain('usr_student_2');
  });

  it('should list only public study rooms in search list', async () => {
    await roomService.createRoom('usr_host_1', { title: 'Public Room 1', isPrivate: false });
    await roomService.createRoom('usr_host_2', { title: 'Private Room 2', isPrivate: true });

    const publicRooms = await roomService.listRooms();
    expect(publicRooms.some((r) => r.title === 'Public Room 1')).toBe(true);
    expect(publicRooms.some((r) => r.title === 'Private Room 2')).toBe(false);
  });
});

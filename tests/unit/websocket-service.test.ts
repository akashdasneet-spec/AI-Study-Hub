import { EventEmitter } from 'events';

class MockSocketServer extends EventEmitter {
  public rooms = new Map<string, Set<string>>();

  joinRoom(socketId: string, roomId: string) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId)!.add(socketId);
    this.emit('user-joined', { socketId, roomId });
  }

  leaveRoom(socketId: string, roomId: string) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(socketId);
      this.emit('user-left', { socketId, roomId });
    }
  }

  broadcastToRoom(roomId: string, event: string, payload: any) {
    const room = this.rooms.get(roomId);
    if (room) {
      this.emit('room-message', { roomId, event, payload, recipientsCount: room.size });
    }
  }
}

describe('WebSocket Service & Realtime Event Suite', () => {
  let io: MockSocketServer;

  beforeEach(() => {
    io = new MockSocketServer();
  });

  it('should allow clients to join study rooms and broadcast join events', async () => {
    const promise = new Promise<void>((resolve) => {
      io.on('user-joined', (data) => {
        expect(data.socketId).toBe('socket_peer_1');
        expect(data.roomId).toBe('room_calc_101');
        resolve();
      });
    });

    io.joinRoom('socket_peer_1', 'room_calc_101');
    await promise;
  });

  it('should track active peer count when clients join study rooms', () => {
    io.joinRoom('peer_1', 'room_physics');
    io.joinRoom('peer_2', 'room_physics');

    const room = io.rooms.get('room_physics');
    expect(room?.size).toBe(2);
  });

  it('should handle client disconnect and leave room cleanup', () => {
    io.joinRoom('peer_1', 'room_chem');
    io.leaveRoom('peer_1', 'room_chem');

    const room = io.rooms.get('room_chem');
    expect(room?.size).toBe(0);
  });

  it('should broadcast whiteboards and chat events to room participants', async () => {
    io.joinRoom('peer_1', 'room_cs');
    io.joinRoom('peer_2', 'room_cs');

    const promise = new Promise<void>((resolve) => {
      io.on('room-message', (msg) => {
        expect(msg.roomId).toBe('room_cs');
        expect(msg.event).toBe('draw-stroke');
        expect(msg.payload.x).toBe(100);
        expect(msg.recipientsCount).toBe(2);
        resolve();
      });
    });

    io.broadcastToRoom('room_cs', 'draw-stroke', { x: 100, y: 200, color: '#4f46e5' });
    await promise;
  });

});

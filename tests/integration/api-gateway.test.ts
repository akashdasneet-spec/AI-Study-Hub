import { InfrastructureEventBus } from '@hub/events';

describe('Event Bus Infrastructure Integration', () => {
  it('should publish and receive domain events cleanly', async () => {
    const bus = new InfrastructureEventBus();
    const received = await new Promise((resolve) => {
      bus.subscribe('RoomCreated', (data) => {
        resolve(data);
      });
      bus.publish('RoomCreated', { roomId: 'r100', title: 'Calculus Study' });
    });

    expect((received as any).roomId).toBe('r100');
  });
});


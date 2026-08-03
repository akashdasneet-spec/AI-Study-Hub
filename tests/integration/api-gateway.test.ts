import { eventBus } from '@hub/events';

describe('Integration & Event Bus Workflow Test', () => {
  it('dispatches and handles RoomCreated event', (done) => {
    eventBus.subscribeEvent('RoomCreated', (payload: any) => {
      expect(payload.roomId).toBe('room-999');
      expect(payload.title).toBe('Integration Test Room');
      done();
    });

    eventBus.publishEvent('RoomCreated', {
      roomId: 'room-999',
      title: 'Integration Test Room',
      ownerId: 'usr-101',
      timestamp: new Date().toISOString(),
    });
  });
});

import { InfrastructureEventBus } from '@hub/events';

const bus = new InfrastructureEventBus();

bus.subscribe('RoomCreated', (data) => {
  console.log(`📢 Event Service Received [RoomCreated]:`, data);
});

console.log('📡 Infrastructure Event Service Active.');

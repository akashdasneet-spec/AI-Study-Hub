import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/realtime/rooms' })
class RoomsGateway {
  @WebSocketServer() server!: Server;

  @SubscribeMessage('room:join')
  handleJoin(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    client.join(payload.roomId);
    client.to(payload.roomId).emit('room:user-joined', payload);
  }

  @SubscribeMessage('whiteboard:draw')
  handleDraw(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    client.to(payload.roomId).emit('whiteboard:update', payload.strokeData);
  }
}

@Module({
  providers: [RoomsGateway],
})
class WsModule {}

async function bootstrap() {
  const app = await NestFactory.create(WsModule);
  await app.listen(4001);
  console.log(`🔌 WebSockets Microservice running on ws://localhost:4001/realtime/rooms`);
}

bootstrap();

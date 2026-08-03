import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/realtime/rooms',
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(RoomsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; userId: string; userName: string },
  ) {
    client.join(payload.roomId);
    this.logger.log(`User ${payload.userName} (${payload.userId}) joined room ${payload.roomId}`);
    client.to(payload.roomId).emit('room:user-joined', {
      userId: payload.userId,
      userName: payload.userName,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('whiteboard:draw')
  handleWhiteboardDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; strokeData: any },
  ) {
    client.to(payload.roomId).emit('whiteboard:update', payload.strokeData);
  }

  @SubscribeMessage('chat:message')
  handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; userId: string; userName: string; message: string },
  ) {
    const broadcastPayload = {
      id: `msg-${Date.now()}`,
      userId: payload.userId,
      userName: payload.userName,
      message: payload.message,
      timestamp: new Date().toISOString(),
    };
    this.server.to(payload.roomId).emit('chat:broadcast', broadcastPayload);
  }

  @SubscribeMessage('timer:toggle')
  handleTimerToggle(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; action: 'start' | 'pause' | 'reset'; durationSeconds?: number },
  ) {
    this.server.to(payload.roomId).emit('timer:sync', {
      action: payload.action,
      durationSeconds: payload.durationSeconds || 1500, // Default 25m Pomodoro
      timestamp: new Date().toISOString(),
    });
  }
}

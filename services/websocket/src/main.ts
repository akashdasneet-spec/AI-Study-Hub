import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: '*' },
});

const roomNamespace = io.of('/realtime/rooms');

roomNamespace.on('connection', (socket) => {
  console.log(`⚡ Client connected to room socket: ${socket.id}`);

  socket.on('room:join', ({ roomId, userName }) => {
    socket.join(roomId);
    socket.to(roomId).emit('room:user-joined', { userId: socket.id, userName });
  });

  socket.on('chat:message', ({ roomId, userName, text }) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    roomNamespace.to(roomId).emit('chat:broadcast', { id: Date.now().toString(), userName, text, time });
  });

  socket.on('timer:toggle', ({ roomId, isRunning }) => {
    roomNamespace.to(roomId).emit('timer:state', { isRunning });
  });
});

const port = process.env.PORT || 4001;
server.listen(port, () => {
  console.log(`🚀 WebSockets Realtime Service running on port ${port}`);
});

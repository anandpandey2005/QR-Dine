import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import database from './config/database.config.js';

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    database();
    server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
})();

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('message', (data: any) => {
    console.log('Data from Postman:', data);

    socket.emit('message_received', { status: 'ok', yourData: data });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export { io };

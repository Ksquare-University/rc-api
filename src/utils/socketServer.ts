import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server();

io.attach(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

io.on('connection', (socket) => {
  // ...
});

httpServer.listen(4000);

export default io;

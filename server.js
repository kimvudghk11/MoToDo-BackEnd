const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const env = require('./src/config/env');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: env.corsOrigin,
        Credentials: true,
    },
});

// socket 설정
const initChatSocket = require('./src/sockets/chat.socket');

initChatSocket(io);

server.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
});
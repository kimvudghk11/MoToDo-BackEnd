const http = require('http');
const { Server } = reqire('socket.io');
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
const initChatSocker = require('./src/sockets/chat.socket');

initChatSocker(io);

server.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
});
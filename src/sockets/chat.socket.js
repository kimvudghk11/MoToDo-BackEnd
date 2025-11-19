const messageRepo = require('../repositories/message.repository');

function initChatSocket(io) {
    io.on('connection', (socket) => {
        console.log('[Socket] A user connected:', socket.id);

        socket.on('joinRoom', ({ chatRoomId }) => {
            socket.join(chatRoomId);

            console.log(`[Socket] User joined room: ${chatRoomId}`);
        });

        socket.on('chatMessage', async ({ chatRoomId, senderId, message }) => {
            try {
                await messageRepo.saveChatRoomMessage({
                    chatId: chatRoomId,
                    senderId,
                    message,
                });

                io.to(chatRoomId).emit('message', {
                    senderId,
                    message,
                    timestamp: new Date().toISOString(),
                });
            } catch (error) {
                console.log('[Socket] Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('[Socket] A user disconnected:', socket.id);
        });
    })
}

module.exports = initChatSocket;
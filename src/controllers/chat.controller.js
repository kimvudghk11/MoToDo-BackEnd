const messageRepo = require('../repositories/message.repository');

async function getChatHistory(req, res) {
    const senderId = req.user.id;
    const receiverId = req.params.receiverId;

    const messages = await messageRepo.findChatHistory(senderId, receiverId);

    res.status(200).json({ messages });
}

async function saveMessage(req, res) {
    const { sender_id, receiver_id, message } = req.body;

    await messageRepo.saveDirectMessage({
        senderId: sender_id, receiverId: receiver_id, message,
    });

    res.status(201).json({ message: '메시지가 저장되었습니다.' });
}

async function createChatRoom(req, res) {
    const userId = req.user.id;
    const { userIds } = req.body;
    const friendId = userIds[0];

    const existing = await messageRepo.findChatRoomByUsers(userId, friendId);

    if (existing)
        return res.status(200).json({ chatRoomId: existing.id });

    const chatRoomId = await messageRepo.createChatRoom(userId, friendId);

    res.status(201).json({ chatRoomId });
}

async function getChatRooms(req, res) {
    const userId = req.user.id;
    const chatRooms = await messageRepo.findChatRoomsByUser(userId);

    res.json({ chatRooms });
}

module.exports = {
    getChatHistory,
    saveMessage,
    createChatRoom,
    getChatRooms,
}
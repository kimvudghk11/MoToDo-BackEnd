const db = require('../config/db');

async function findChatHistory(senderId, receiverId) {
    const sql = `
        SELECT * FROM message
        WHERE (sender_id = ? AND receiver_id =?)
        OR (sender_id = ? AND recevier_id = ?)
        ORDER BY created_at ASC
    `;
    const [rows] = await db.query(sql, [senderId, receiverId, receiverId, senderId]);

    return rows;
}

async function saveDirectMessage({ senderId, receiverId, message }) {
    const sql = `
        INSERT INTO messages (sender_id, receiver_id, message, created_at)
        VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(sql, [senderId, receiverId, message]);

    return result.insertId;
}

async function saveChatRoomMessage({ chatId, senderId, message }) {
    const sql = `
        INSERT INTO messages (chat_id, sender_id, message, created_at)
        VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(sql, [chatId, senderId, message]);

    return result.insertId;
}

async function findChatRoomByUsers(userId, friendId) {
    const sql = `
        SELECT id FROM chats
        WHERE (user_id = ? AND friend_id = ?)
        OR (user_id = ? AND friend_id = ?)
    `;
    const [rows] = await db.query(sql, [userId, friendId, friendId, userId]);

    return rows[0] || null;
}

async function createChatRoom(userId, friendId) {
    const sql = 'INSERT INTO chats (user_id, friend_id, created_at) VALUES (?, ?, NOW())';
    const [result] = await db.query(sql, [userId, friendId]);

    return result.insertId;
}

async function findChatRoomsByUser(userId) {
    const sql = `
        SELECT
            c.id AS chatRoomId,
            c.created_at AS createdAt,
            CASE
                WHEN c.user_id = ? THEN c.friend_id
                ELSE c.user_id
            END AS otherUserId
        FROM chats c
        WHERE c.user_id = ? OR c.friend_id = ?
        ORDER BY c.created_at DESC
    `;
    const [rows] = await db.query(sql, [userId, userId, userId]);

    return rows;
}

module.exports = {
    findChatHistory,
    saveDirectMessage,
    saveChatRoomMessage,
    findChatRoomByUsers,
    createChatRoom,
    findChatRoomsByUser,
}
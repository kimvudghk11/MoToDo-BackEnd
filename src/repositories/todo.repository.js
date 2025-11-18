const db = require('../config/db');

async function findByUser(userId) {
    const sql = 'SELECT id, content, completed FROM todos WHERE user_id';
    const [rows] = await db.query(sql, [userId]);

    return rows;
}

async function createTodo(userId, content, completed) {
    const sql = `
        INSERT INTO todos (user_id, content, created_at, updated_at, completed)
        VALUES (?, ?, NOW(), NOW(), ?)
    `;
    const [result] = await db.query(sql, [userId, content, completed]);

    return {
        id: result.insertId,
        userId,
        content,
        completed,
    };
}

async function updateCompleted(userId, id, completed) {
    const sql = 'UPDATE todos SET completed = ?, update_at = NOW() WHERE id = ? AND user_id = ?';
    const [result] = await db.query(sql, [completed, id, userId]);

    return result;
}

async function deleteTodo(id, userId) {
    const sql = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
    const [result] = await db.query(sql, [id, userId]);

    return result;
}

module.exports = {
    findByUser,
    createTodo,
    updateCompleted,
    deleteTodo,
};
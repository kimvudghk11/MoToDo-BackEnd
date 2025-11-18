const db = require('../config/db');

async function findByUser(userId) {
    const sql = 'SELECT * FROM sticky WHERE user_id = ?';
    const [rows] = await db.query(sql, [userId]);

    return rows;
}

async function createSticky(data) {
    const sql = `
        INSERT INTO sticky (user_id, content, position_x, position_y, width, height, created_at, update_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.query(sql ,[
        data.userId,
        data.content,
        data.position_x,
        data.position_y,
        data.width,
        data.height,
    ]);

    return result;
}

async function updateSticky(id, userId, data) {
    const sql = `
        UPDATE sticky
        SET content = ?, position_x = ?, position_y = ?, width = ?, height = ?, updated_at = NOW()
        WHERE id = ? AND user_id = ?
    `;

    const [result] = await db.query(sql, [
        data.content,
        data.position_x,
        data.position_y,
        data.width,
        data.height,
        id,
        userId,
    ]);

    return result;
}

async function deleteSticky(id, userId) {
    const sql = 'DELETE FROM sticky WHERE id = ? AND user_id = ?';
    const [result] = await db.query(sql, [id, userId]);

    return result;
}

module.exports = {
    findByUser,
    createSticky,
    updateSticky,
    deleteSticky,
};
const db = require('../config/db');

async function findByGroup(groupId) {
    const sql = 'SELECT id, title, content, author FROM notice WHERE group_id';
    const [rows] = await db.query(sql, [groupId]);

    return rows;
}

async function createNotice({ userId, groupId, title, content, author }) {
    const sql = `
        INSERT INTO notice (user_id, group_id, title, content, author, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await db.query(sql, [userId, groupId, title, content, author]);

    return {
        id: result.insertId,
        groupId,
        userId,
        title,
        content,
        author,
    };
}

async function deleteNotice(id) {
    const sql = 'DELETE FROM notice WHERE id = ?';
    const [result] = await db.query(sql, [id]);

    return result;
}

async function updateNotice({ id, groupId, title, content }) {
    const sql = `
        UPDATE notice
        SET title = ?, content = ?, updated_at = NOW()
        WHERE id = ? AND group_id = ?
    `;
    const [result] = await db.query(sql, [title, content, id, groupId]);

    return result;
}

module.exports = {
    findByGroup,
    createNotice,
    deleteNotice,
    updateNotice,
}
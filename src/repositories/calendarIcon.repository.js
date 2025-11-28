const db = require('../config/db');

async function findByUser(userId) {
    const sql = 'SELECT * FROM calendar_icon WHERE user_id = ?';
    const [rows] = await db.query(sql, [userId]);

    return rows;
}

async function createIcon({ userId, iconNumber, iconDate }) {
    const sql = 'INSERT INTO calendar_icon (user_id, icon_number, icon_date) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [userId, iconNumber, iconDate]);

    return result.insertId;
}

async function updateIcon({ userId, iconId, iconNumber }) {
    const sql = 'UPDATE calendar_icon SET icon_number = ? WHERE id = ? AND user_id = ?';
    const [result] = await db.query(sql, [iconNumber, iconId, userId]);

    return result;
}

async function deleteIcon({ userId, iconId }) {
    const sql = 'DELETE FROM calendar_icon WHERE id = ? AND user_id = ?';
    const [result] = await db.query(sql, [iconId, userId]);

    return result;
}

module.exports = {
    findByUser,
    createIcon,
    updateIcon,
    deleteIcon,
}
const db = require('../config/db');

async function findById(id) {
    const sql = 'SELECT content FROM quotes WHERE id = ?';
    const [rows] = await db.query(sql, [id]);

    return rows[0] || null;
}

module.exports = { findById };
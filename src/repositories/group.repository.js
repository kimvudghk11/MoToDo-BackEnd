const db = require('../config/db');

async function findGroupsByUser(userId) {
    const sql = `
        SELECT g.id, g.name, g.code
        FROM groups g
        JOIN group_members gm ON g.id = gm.group_id
        WHERE gm.user_id = ?
    `
    const [rows] = await db.query(sql, [userId]);

    return rows;
}

async function createGroup({ code, name, creatorId }) {
    const sql = `
        INSERT INTO groups (code, name, created_at, updated_at, creator_id)
        VALUES (?, ?, NOW(), NOW(), ?)
    `;
    const [result] = await db.query(sql, [code, name, creatorId]);

    return result.insertId;
}

async function addMember(groupId, userId) {
    const sql = 'INSERT INTO group_members (group_id, user_id, joined_at) VALUES (?, ?, NOW())';
    const [result] = await db.query(sql, [groupId, userId]);

    return result;
}

async function checkGroupCodeExists(code) {
    const sql = 'SELECT COUNT(*) AS count FROM groups WHERE code = ?';
    const [rows] = await db.query(sql, [code]);

    return rows[0]?.count > 0;
}

async function findGroupByCode(code) {
    const sql = 'SELECT id FROM groups WHERE code = ?';
    const [rows] = await db.query(sql, [code]);

    return rows[0] || null;
}

async function removeMemberByCode(groupCode, userId) {
    const group = await findGroupByCode(groupCode);

    if (!group)
        return { affectedRows: 0 };

    const sql = 'DELETE FROM group_members WHERE group_id = ? AND user_id = ?';
    const [result] = await db.query(sql, [group.id, userId]);

    return result;
}

module.exports = {
    findGroupsByUser,
    createGroup,
    addMember,
    checkGroupCodeExists,
    findGroupByCode,
    removeMemberByCode,
}
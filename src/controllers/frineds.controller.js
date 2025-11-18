const userRepo = require('../repositories/user.repository');
const db = require('../config/db');

async function getUserInfo(req, res) {
    const userId = req.user.id;
    const user = await userRepo.findById(userId);

    if (!user)
        return res.status(404).json({ error: 'User not found' });

    res.json(user);
}

// 기존 friendsList 쿼리를 그대로 사용하지만, repository에 넣기 애매하여 여기에서만 직접 수행
async function getFriendsList(req, res) {
    const userId = req.user.id;

    const [groupResults] = await db.query(
        'SELECT group_id FROM group_members WHERE user_id = ?',
        [userId],
    );

    if (!groupResults.length)
        return res.status(200).json({ friends: [] });

    const groupIds = groupResults.map((g) => g.group_id);
    const placeholders = groupIds.map(() => '?').join(', ');

    const [membersRows] = await db.query(
        `SELECT user_id FROM group_members WHERE group_id IN (${placeholders}) AND user_id != ?`,
        [...groupIds, userId],
    );

    const memberIds = membersRows.map((m) => m.user_id);

    if (!memberIds.length)
        return res.status(200).json({ friends: [] });

    const memberPlaceholders = memberIds.map(() => '?').join(', ');

    const [friends] = await db.query(
        `SELECT * FROM users WHERE id IN (${memberPlaceholders})`,
        memberIds,
    );

    res.status(200).json({ friends });
}

module.exports = {
    getUserInfo,
    getFriendsList,
}
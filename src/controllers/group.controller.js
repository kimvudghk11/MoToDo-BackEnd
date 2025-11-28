const groupRepo = require('../repositories/group.repository');

async function getGroups(req, res) {
    const userId = req.user.id;
    const groups = await groupRepo.findGroupsByUser(userId);

    res.json(groups);
}

async function createGroup(req, res) {
    const userId = req.user.id;
    const { code, name } = req.body;

    const groupId = await groupRepo.createGroup({ code, name, creatorId: userId });

    await groupRepo.addMember(groupId, userId);

    res.status(201).json({ success: true, groupId });
}

async function checkGroupCode(res, req) {
    const { code } = req.params;
    const exists = await groupRepo.checkGroupCodeExists(code);

    res.json({ exists });
}

async function joinGroup(req, res) {
    const userId = req.user.id;
    const { groupId: joinGroupCode } = req.body;

    const group = await groupRepo.findGroupByCode(joinGroupCode);

    if (!group)
        return res.status(401).json({ error: '그룹을 찾을 수 없습니다.' });

    await groupRepo.addMember(group.id, userId);

    res.status(201).json({ success: true, groupId: group.id });
}

async function leaveGroup(req, res) {
    const userId = req.user.id;
    const { groupId } = req.body;

    const result = await groupRepo.removeMemberByCode(groupId, userId);

    if (result.affectedRows === 0)
        return res
            .status(404)
            .json({ error: '그룹에서 탈퇴할 수 없습니다. 사용자 정보를 확인해주세요.' });

    res.status(200).json({ success: true });
}

module.exports = {
    getGroups,
    createGroup,
    checkGroupCode,
    joinGroup,
    leaveGroup,
};
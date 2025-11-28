const noticeRepo = require('../repositories/notice.repository');
const userRepo = require('../repositories/user.repository');

async function getNotices(req, res) {
    const groupId = req.query.groupId;
    const notices = await noticeRepo.findByGroup(groupId);

    res.status(200).json({ notices });
}

async function createNotice(req, res) {
    const userId = req.user.id;
    const { groupId, title, content } = req.body;

    const user = await userRepo.findById(userId);
    const author = user?.name || 'Unknown';

    const newNotice = await noticeRepo.createNotice({
        userId, groupId, title, content, author,
    });

    res.status(200).json({ newNotice });
}

async function deleteNotice(req, res) {
    const { noticeId } = req.params;

    await noticeRepo.deleteNotice(noticeId);

    res.status(200).json({ message: 'Notice item deleted successfully' });
}

async function patchNotice(req, res) {
    const { noticeId } = req.params;
    const { title, content, groupId } = req.body;

    await noticeRepo.updateNotice({ id: noticeId, groupId, title, content });

    res.status(200).json({ message: 'Notice item updated successfully' });
}

module.exports = {
    getNotices,
    createNotice,
    deleteNotice,
    patchNotice,
};
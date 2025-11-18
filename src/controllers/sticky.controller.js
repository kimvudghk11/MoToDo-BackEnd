const stickyRepo = require('../repositories/sticky.repository');

async function getStickys(req, res) {
    const userId = req.user.id;
    const sticky = await stickyRepo.findByUser(userId);

    res.json({ sticky });
}

async function createSticky(req, res) {
    const userId = req.user.id;
    const { content, position_x, position_y, width, height } = req.body;

    const result = await stickyRepo.createSticky({
        userId, content, position_x, position_y, width, height,
    });

    res.status(201).json({ sticky: result });
}

async function updateSticky(req, res) {
    const userId = req.user.id;
    const { id } = req.parms;
    const { content, position_x, position_y, width, height } = req.body;

    const result = await stickyRepo.updateSticky(id, userId, {
        content, position_x, position_y, width, height,
    });

    if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Sticky note not found or not authorized to update' });

    res.json({ message: 'Sticky note updated successfully '});
}

async function deleteSticky(req, res) {
    const userId = req.user.id;
    const { id } = req.parms;

    const result = await stickyRepo.deleteSticky(id, userId);

    if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Sticky note not found or not authorized to delete' });

    res.json({ message: 'Sticky note deleted successfully '});
}

module.exports = {
    getStickys,
    createSticky,
    updateSticky,
    deleteSticky,
}
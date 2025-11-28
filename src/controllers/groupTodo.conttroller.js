const groupTodoRepo = require('../repositories/groupTodo.repository');

async function getGroupTodos(req, res) {
    const groupId = req.query.groupId;
    const gTodo = await groupTodoRepo.findByGroup(groupId);

    res.status(200).json({ gTodo });
}

async function createGroupTodo(req, res) {
    const userId = req.user.id;
    const { groupId, content, completed } = req.body;

    const newTodo = await groupTodoRepo.createGroupTodo({
        groupId, userId, content, completed,
    });

    res.status(201).json({ newTodo });
}

async function deleteGroupTodo(req, res) {
    const { id } = req.params;

    await groupTodoRepo.deleteGroupTodo(id);

    res.status(200).json({ message: 'Group Todo item deleted successfully' });
}

async function patchGroupTodo(req, res) {
    const { id } = req.params;
    const { completed } = req.body;

    await groupTodoRepo.updateCompleted(id, completed);

    res.status(200).json({ message: 'Group Todo item checked update successfully' });
}

module.exports = {
    getGroupTodos,
    createGroupTodo,
    deleteGroupTodo,
    patchGroupTodo,
};
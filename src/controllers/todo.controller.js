const todoRepo = require('../repositories/todo.repository');

async function getTodos(req, rs) {
    const userId = req.user.id;
    const todos = await todoRepo.findByUser(userId);

    res.json({ todos });
}

async function createTodo(req, res) {
    const userId = req.user.id;
    const { content, completed } = req.body;

    const newTodo = await todoRepo.createTodo(userId, content, completed);

    res.status(201).json({ newTodo });
}

async function patchTodo(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const { completed } = req.body;

    await todoRepo.updateCompleted(userId, id, completed);

    res.status(200).json({ message: 'Todo item checked update successfully' });
}

async function deleteTodo(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    await todoRepo.deleteTodo(id, userId);

    res.status(200).json({ message: 'Todo item deleted successfully' });
}

module.exports = {
    getTodos,
    createTodo,
    patchTodo,
    deleteTodo,
}
const express = require('express');
const groupTodoController = require('../controllers/groupTodo.controller');
const { authenticateToken } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticateToken, asyncHandler(groupTodoController.getGroupTodos));
router.post('/', authenticateToken, asyncHandler(groupTodoController.createGroupTodo));
router.delete('/:id', authenticateToken, asyncHandler(groupTodoController.deleteGroupTodo));
router.patch('/:id', authenticateToken, asyncHandler(groupTodoController.patchGroupTodo));

module.exports = router;
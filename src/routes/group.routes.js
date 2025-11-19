const express = require('express');
const groupController = require('../controllers/group.controller');
const { authenticateToken } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticateToken, asyncHandler(groupController.getGroups));
router.post('/create', authenticateToken, asyncHandler(groupController.createGroup));
router.get('/checkCode/:code', asyncHandler(groupController.checkGroupCode));
router.post('/join', authenticateToken, asyncHandler(groupController.joinGroup));
router.delete('/', authenticateToken, asyncHandler(groupController.leaveGroup));

module.exports = router;
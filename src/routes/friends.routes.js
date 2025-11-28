const express = require('express');
const friendsController = require('../controllers/friends.controller');
const { authenticateToken } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/userInfo', authenticateToken, asyncHandler(friendsController.getUserInfo));
router.get('/friendsList', authenticateToken, asyncHandler(friendsController.getFriendsList));

module.exports = router;
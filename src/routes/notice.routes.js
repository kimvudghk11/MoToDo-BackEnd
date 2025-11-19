const express = require('express');
const noticeController = require('../controllers/notice.controller');
const { authenticateToken } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticateToken, asyncHandler(noticeController.getNotices));
router.post('/', authenticateToken, asyncHandler(noticeController.createNotice));
router.delete('/:noticeId', authenticateToken, asyncHandler(noticeController.deleteNotice));
router.patch('/:noticedId', authenticateToken, asyncHandler(noticeController.patchNotice));

module.exports = router;
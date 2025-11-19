const express = require('express');
const homeController = require('../controllers/home.controller');
const { authenticateToken } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticateToken, asyncHandler(homeController.getHomeData));

module.exports = router;
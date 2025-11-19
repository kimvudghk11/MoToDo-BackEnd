const express = require('express');
const calendarController = require('../controllers/calendar.controller');
const { authenticateToken } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticateToken, asyncHandler(calendarController.getEvents));
router.post('/', authenticateToken, asyncHandler(calendarController.createEvent));
router.put('/:id', authenticateToken, asyncHandler(calendarController.updateEvent));
router.delete('/:id', authenticateToken, asyncHandler(calendarController.deleteEvent));
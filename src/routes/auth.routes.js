const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middlewares/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post(
    '/register',
    [
        body('name').isString(),
        body('age').isInt({ min: 1 }),
        body('studentId').isString(),
        body('department').isString(),
        body('username')
            .matches(/^[A-Za-z0-9@_\-~]+$/)
            .notEmpty(),
        body('password').isLength({ min: 6}),
    ],
    validateRequest,
    asyncHandler(authController.register),
);

router.post('/login', asyncHandler(authController.login));

module.exports = router;
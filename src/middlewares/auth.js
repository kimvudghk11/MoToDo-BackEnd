const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    // 401
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, env.jwtSecret, (error, payload) => {
        if (error)
            return res.status(403).json({ error: 'Forbidden' });

        req.user = payload;

        next();
    });
}

module.exports = { authenticateToken };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const userRepo = require('../repositories/user.repository');

async function register(req, res) {
    const { name, age, studentId, department, username, password } = req.body;

    const existing = await userRepo.findByUsername(username);

    if (existing)
        return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userRepo.createUser({
        name,
        age,
        studentId,
        department,
        username,
        password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', userId });
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await userRepo.findByUsername(username);

    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
        return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, env.jwtSecret, {
        expiresIn: '24h',
    });

    res.json({ message: 'Login successful', token });
}

module.exports = {
    register,
    login,
}
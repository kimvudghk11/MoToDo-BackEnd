const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

// Router
const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');
const calendarRoutes = require('./routes/calendar.routes');
const stickyRoutes = require('./routes/sticky.routes');
const todoRoutes = require('./routes/todo.routes');
const friendsRoutes = require('./routes/friends.routes');
const chatRoutes = require('./routes/chat.routes');
const groupRoutes = require('./routes/group.routes');
const groupTodoRoutes = require('./routes/groupTodo.routes');
const noticeRoutes = require('./routes/notice.routes');
const miscRoutes = require('./routes/misc.routes');

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: env.corsOrigin,
        credentials: true,
    }),
);

// API prefix
app.use('/api', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/events', calendarRoutes);
app.use('/api/stickys', stickyRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api', friendsRoutes);
app.use('/api', chatRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/groupTodos', groupTodoRoutes);
app.use('/api/notice', noticeRoutes);
app.use('/api', miscRoutes);

// 전역 에러 핸들러
app.use(errorHandler);

module.exports = app;
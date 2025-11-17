function errorHandler(error, req, res, next) {
    console.error('[ERROR]', error);

    if (res.headersSent)
        return next(error);

    const status = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    res.status(status).json({
        error: message,
    });
}

module.exports = errorHandler;
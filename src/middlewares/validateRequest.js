const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
    const erros = validationResult(req);

    if (erros.isEmpty())
        return next();

    return res.status(400).json({
        erros: erros.array(),
    });
}

module.exports = validateRequest;
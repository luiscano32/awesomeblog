const { validationResult  } = require('express-validator');

/**
 * Valida parámetros requeridos en solicitud http
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object || null
 */
const validateRequiredParams = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'one or more required params are invalid',
            errors: errors.array(),
        });
    }

    return null;
}

module.exports = validateRequiredParams;
const jwt = require('jsonwebtoken');

const { validateRequiredParams } = require('../utils');
const { UserService } = require('../services');


/**
 * Creación de usuario en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const create = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    const userData = req.body;

    const result = await UserService.create(userData);
    return res.send(result);
};

/**
 * Validación de credenciales de usuario y generación de token
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const login = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    const {
        username,
        password,
    } = req.body;

    // validación de credenciales de usuario
    const isValidUser = await UserService.login(username, password);

    if(isValidUser.status === 'success') {

        // generación de jwt
        const token = jwt.sign(isValidUser.data, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        return res.send({
            status: 'success',
            message:'successful account login',
            token,
        });
    }

    return res.status(401).json(isValidUser);
}

module.exports = {
    create,
    login,
}

const { validateRequiredParams } = require('../utils');
const { BlogEntriesService } = require('../services');


/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const getAll = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    return res.send('test get all');
};

/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const getById = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    return res.send('test get by id');
};

/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const create = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    return res.send('test create');
};

/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const update = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    return res.send('test update');
};

/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const destroy = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    return res.send('test delete');
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
}
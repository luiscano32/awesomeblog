
const { validateRequiredParams } = require('../utils');
const { BlogEntriesService } = require('../services');


/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const getAll = async(req, res) => {

    // obtiene todas las entradas existentes
    const result = await BlogEntriesService.getAll();

    // devuelve respuesta http
    return (result.status === 'success') 
        ? res.send(result)
        : res.status(400).json(result);
};

/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const getById = async(req, res) => {

    // llama a método para obtención de entrada por id
    const { entryId } = req.params;
    const result = await BlogEntriesService.getById(entryId);

    // devuelve respuesta http
    return (result.status === 'success') 
        ? res.send(result)
        : res.status(400).json(result);
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

    // extracción de parámetros del body de la solicitud
    const { title, author, content } = req.body;

    // creación de usuario mediante servicio
    const result = await BlogEntriesService.create(title, author, content);
    // devuelve respuesta http
    return (result.status === 'success') 
        ? res.send(result)
        : res.status(400).json(result);
};

/**
 * Actualiza una entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const update = async(req, res) => {

    // valida que solicitud tenga parámetros requeridos
    const validationResult = validateRequiredParams(req, res);
    if(validationResult) return validationResult;

    const { entryId } = req.params;
    const entry = req.body;

    // actualiza datos de entrada
    const result = await BlogEntriesService.update(entryId, entry);
    // devuelve respuesta http
    return (result.status === 'success') 
        ? res.send(result)
        : res.status(400).json(result);
};

/**
 * Creación de entrada de blog en base de datos
 * @param { object } req - Objeto con datos de solicitud http
 * @param { object } res - Objeto con datos de respuesta http
 * @returns object
 */
const destroy = async(req, res) => {

    const { entryId } = req.params;
    // elimina entrada de blog por id
    const result = await BlogEntriesService.delete(entryId);

    // devuelve respuesta http
    return (result.status === 'success') 
        ? res.send(result)
        : res.status(400).json(result);
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
}
const { Router } = require('express');
const { body } = require('express-validator');

const { validateToken } = require('../middlewares');
const { BlogEntriesController } = require('../controllers');

const router = Router();

/*****************************************
 * Definición de rutas
 *****************************************/
// obtención de todas las entradas
router.get('/', validateToken, BlogEntriesController.getAll);

// obtención de entrada por id
router.get('/:entryId', validateToken, BlogEntriesController.getById);

// creación de entrada
router.post('/', [
    /**
     * Middlewares
     */
    validateToken,

    // validación de parámetros
    body('title')
        .notEmpty()
        .withMessage('invalid title'),
    body('author')
        .notEmpty()
        .withMessage('invalid author'),
    body('content')
        .notEmpty()
        .withMessage('invalid content'),
        
], BlogEntriesController.create);

// actualización de entrada por id
router.put('/:entryId', validateToken, BlogEntriesController.update);

// eliminación de entrada por id
router.delete('/:entryId', validateToken, BlogEntriesController.destroy);

module.exports = router;
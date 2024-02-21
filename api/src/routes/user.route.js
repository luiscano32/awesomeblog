const { Router } = require('express');
const { body } = require('express-validator');

const { UserController } = require('../controllers');

const router = Router();

/*****************************************
 * Definición de rutas
 *****************************************/

// creación de usuarios
router.post('/', [
    
    body('username')
        .notEmpty()
        .withMessage('invalid username'),
    body('password')
        .notEmpty()
        .withMessage('invalid password'),
        
], UserController.create);

// login de usuario
router.post('/login', [
    
    body('username')
        .notEmpty()
        .withMessage('invalid username'),
    body('password')
        .notEmpty()
        .withMessage('invalid password'),

], UserController.login);

module.exports = router;
const bcrypt = require('bcrypt');

/**
 * Valida la contraseña de un usuario contra la almacenada y cifrada en bdd
 * @param { string } password - contraseña a validar 
 * @returns 
 */
const validatePassword = (password, encryptedPassword) =>  {
    return bcrypt.compare(password, encryptedPassword);
}

module.exports = validatePassword;
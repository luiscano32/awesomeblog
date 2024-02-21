const User = require('../db/models/user.model');
const { validatePassword } = require('../utils');

class UserService {

    /**
     * Crea usuario en base de datos
     * @param { object } user - Datos de usuario a crear
     * @returns object
     */
    static async create(user) {
        try {
            
            await User.create(user);

            return {
                status: 'success',
                message: 'user succesfully created',
            }
        } catch (err) {
            
            // valida error de constrain por username duplicado
            if(err.original.code === 'ER_DUP_ENTRY') {
                return {
                    status: 'error',
                    message: `username '${ user.username }' already exists`
                }
            }

            console.log(err.original.code);
            return {
                status: 'error',
                message: `error creating user, error: ${ err.message }`,
            }
        }
    }

    /**
     * Valida nombre de usuario y contraseña con los existentes en base de datos
     * @param { string } username - Nombre de usuario
     * @param { string } password - Contraseña del usuario
     * @returns 
     */
    static async login(username, password) {

        try {
            // realiza búsqueda por usuario en la base de datos
            const searchUser = await User.findOne({
                where: {
                    username
                }
            });

            // valida que el usuario haya sido encontrado
            if(searchUser) {

                // valida la contraseña del usuario
                const isValidPassword = await validatePassword(password, searchUser.password);
                
                if(isValidPassword) {
                    // devuelve datos de usuario sin contraseña
                    delete searchUser.dataValues.password;
                    return {
                        status: 'success',
                        data: {
                            ...searchUser.dataValues,
                        }
                    }
                }
            }

            throw new Error('invalid user or password');

        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }

    }

}

module.exports = UserService;
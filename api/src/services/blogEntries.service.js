const BlogEntries = require('../db/models/blogEntries.model');

class BlogEntriesService {

    /**
     * Obtiene todas las entradas de blog existentes
     * @returns object
     */
    static async getAll() {
        try {
            const result = await BlogEntries.findAll();

            return {
                status: 'success',
                message: 'entries successfully obtained',
                data: result,
            }
        } catch (err) {
            console.error(err.message);
            return {
                status: 'error',
                message: 'error trying to get entries',
            }
        }
    }

    /**
     * Devuelve una entrada de blog por medio del id de la entrada
     * @param { integer } id - ID de entrada de blog
     * @returns object
     */
    static async getById(id) {
        try {
            
            const result = await BlogEntries.findOne({ where: { id } });

            return {
                status: 'success',
                message: result 
                    ? 'entry successfully obtained'
                    : 'no entries were found with the given id',
                data: result,
            }

        } catch (err) {
            console.error(err.message);
            return {
                status: 'error',
                message: `error trying to get entry with id: ${ id }`,
            }
        }
    }

    /**
     * Crea una entrada de blog en la base de datos
     * @param { string } title - Título de la entrada
     * @param { string } author - Nombre de usuario del autor
     * @param { string } content - Contenido de la entrada
     * @returns 
     */
    static async create(title, author, content) {
        try {
            
            const result = await BlogEntries.create({
                title, 
                author, 
                content
            });

            return {
                status: 'success',
                message: 'entry successfully created',
                data: result,
            }

        } catch (err) {
            console.error(err.message);
            return {
                status: 'error',
                message: 'error trying to create entry',
                data: { title, author, content },
            }
        }
    }


    /**
     * Actualiza una entrada de blog
     * @param { integer } id - ID de entrada de blog
     * @param { object } entry - Datos a actualizar de entrada de blog
     * @returns 
     */
    static async update(id, entry) {
        try {

            const result = await BlogEntries.update(entry, { where: { id }});

            return {
                status: 'success',
                message: 'entry successfully updated',
                data: result,
            }
            
        } catch (err) {
            console.error(err.message);
            return {
                status: 'error',
                message: 'error trying to update entry',
                data: {
                    id,
                    ...entry
                }
            }
        }
    }

    /**
     * Elimina una entrada de blog la base de datos
     * @param { integer } id - ID de entrada
     * @returns object
     */
    static async delete(id) {
        try {
            
            await BlogEntries.destroy({ where:{ id } });

            return {
                status: 'success',
                message: 'entry successfully deleted',
            }
            
        } catch (err) {
            console.error(err.message);
            return {
                status: 'error',
                message: 'error trying to delete entry',
            }
        }
    }
}

module.exports = BlogEntriesService;
const express = require('express');
const cors = require('cors');

const db = require('./db/connection');

class Server {

    app = null;
    port = null;
    apiPaths = {
        'user': '/api/user',
        'entries': '/api/entries',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        // inciialización de servicios
        this.middlewares();
        // finaliza sincronización de base de datos previo a inicilizar rutas
        this.initDbConnection(() => this.initRoutes());
    }

    /**
     * Inicialización de middlewares configurados
     */
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    /**
     * Inicialización de conexión a base de datos
     */
    async initDbConnection(callback) {
        try {
            // realiza conexión a bdd
            await db.initializeSequelize();
            callback && callback();
        } catch (error) {
            console.error('Error while connecting to database');
            throw new Error(error.message);
        }
    }

    /**
     * Inicialización de rutas de aplicación
     */
    initRoutes() {
        const Route = require('./routes');
        this.app.use(this.apiPaths.user, Route.user);
        this.app.use(this.apiPaths.entries, Route.blogEntries);
    }

    /**
     * inicializa servidor y coloca en modo escucha
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(
                `****************************************************\n` + 
                ` AWESOMEBLOG APP (created by Luis Cano)\n`  +
                `****************************************************`
            );
            console.log(`Awesome_api app listening on port (${ this.port })`);
        });
    }
}

module.exports = Server;
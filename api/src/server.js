const express = require('express');
const path = require('node:path');
const cors = require('cors');

class Server {

    app = null;
    port = null;
    apiPaths = {};

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        // inciialización de servicios
        this.middlewares();
    }

    /**
     * Inicialización de middlewares configurados
     */
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    /**
     * Inicialización de rutas de aplicación
     */
    routes() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Awesome_api app listening on port ${ this.port }`);
        });
    }
}

module.exports = Server;
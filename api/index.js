"strict mode";

// obtención e inicialización de variables de entorno
require('dotenv').config();

// creación e inicialización de instancia de servidor
const Server = require('./src/server');
const server = new Server();
server.listen();
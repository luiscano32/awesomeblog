const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

// desestructuración de propiedades de configuraciones
const {
    username,
    password,
    database,
    host,
    dialect,
} = dbConfig;


class db {

    static instance = null;

    /**
     * crea la base de datos si no existe
     */
    static async ensureDatabaseExists() {
        try {
            // crea conexión a base de datos mysql y crea base de datos si no existe
            const connection = await mysql.createConnection({ host, user: username, password });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${ database }\`;`);
    
            console.log('Database successfully synchronized');
            await connection.end();
    
        } catch (error) {
            console.error('Error attempting to create database:', error);
            throw error;
        }
    }

    static getInstance() {
        return this.instance;
    }
    
    /**
     * Inicialización de Sequelize
     * @returns object
     */
    static async initializeSequelize() {

        // valida existencia de base de datos
        await this.ensureDatabaseExists();

        // inicializa instancia de sequelize
        this.instance = new Sequelize(database, username, password, {
            host,
            dialect,
            logging: false,
        });

        // se llama a indexador de modelos para definir modelos previos a sincronización
        require('./models');
        
        // sincronización de tablas de base de datos con modelos
        await this.instance.sync()
            .then(() => {
                console.log('Database tables properly synchronized');
            })
            .catch((err) => {
                console.error('Error when attempting to synchronize database tables: ', err);
            });

        try {
            // realiza intento de conexión con base de datos
            await this.instance.authenticate();
            console.log('Database online');
        } catch (err) {
            console.error('Error connection with database:', err);
            throw new Error(err.message);
        }
    }
}



module.exports = db;
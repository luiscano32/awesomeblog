const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../connection');
const sequelize = db.getInstance();

/**
 * Modelo que almacena usuarios de blog
 */
const Users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

/**
 * Método ejecutado para cifrar contraseña previo a guardarse en la bdd
 */
Users.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
});


module.exports = Users;
const { DataTypes } = require('sequelize');
const db = require('../connection');
const sequelize = db.getInstance();

/**
 * Modelo que almacena entradas de blog
 */
const BlogEntries = db.instance.define('blog_entries', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = BlogEntries;
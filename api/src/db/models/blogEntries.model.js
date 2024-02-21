const { DataTypes } = require('sequelize');
const db = require('../connection');

/**
 * Modelo que almacena entradas de blog
 */
const BlogEntries = db.define('blog_entries', {
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
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const { database, username, password, host } = config.development;
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    },
});

module.exports = sequelize;
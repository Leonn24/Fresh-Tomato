const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
      username: 'root',
      database: 'freshtomatoe_db',
      password: 'password',
    }
  );
}

module.exports = sequelize;

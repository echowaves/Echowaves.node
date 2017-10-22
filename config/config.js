const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  development: {
    username: process.env.EW_DB_USER,
    password: process.env.EW_DB_PASS,
    database: process.env.EW_DB_NAME,
    host: process.env.EW_DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.EW_DB_USER,
    password: process.env.EW_DB_PASS,
    database: process.env.EW_DB_NAME,
    host: process.env.EW_DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.EW_DB_USER,
    password: process.env.EW_DB_PASS,
    database: process.env.EW_DB_NAME,
    host: process.env.EW_DB_HOST,
    dialect: 'postgres'
  }
}

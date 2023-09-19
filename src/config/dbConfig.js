const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const dbConfig = require("./index");

dotenv.config();

const {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT
} = dbConfig;

const db = new Sequelize(
    DB_NAME,       // name of database
    DB_USERNAME,   // name of username
    DB_PASSWORD,   // db password
    {
      host: DB_HOST,
      port: DB_PORT,
      dialect: "mssql",  // Correct the dialect to "mssql"
      logging: false,
      dialectOptions: {
        encrypt: true,
      },
    }
);

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    db
};

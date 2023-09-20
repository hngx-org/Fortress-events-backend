const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(
  DB_NAME, // name of database
  DB_USERNAME, // name of username
  DB_PASSWORD, // db password
  {
    host: DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database because:", err);
  });

module.exports = {
  sequelize: sequelize,
};

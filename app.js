const express = require("express");
const app = express();
require("dotenv").config();
const { readdirSync } = require("fs");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");

const sequelize = require("./src/config/dbConfig");
require("./src/model/index");

app.use(logger("dev"));

const notFound = require("./src/middlewares/not-found");
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/utils/constants/swagger')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

readdirSync("./src/routes").map((path) =>
  app.use("/api", require(`./src/routes/${path}`))
);

app.use(errorHandlerMiddleware);
app.use(notFound);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Event App running on http://localhost:${PORT}/`);
  
});

module.exports = app;

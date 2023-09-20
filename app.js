const express = require("express");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const config = require("./src/config");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const routes = require("./src/routes");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(errorHandlerMiddleware);
app.use(notFound);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("i am homer");
});
app.use("/api", routes);

app.listen(PORT || 3000, () => {
  console.log(`Event App running on http://localhost:${PORT}/`);
});

module.exports = app;

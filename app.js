const express = require("express");
const app = express();
require("dotenv").config();
const { readdirSync } = require("fs");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const notFound = require("./src/middlewares/not-found");
const { route } = require("./src/routes/events");

readdirSync("./src/routes").map((path) =>
  app.use("/api", require(`./src/routes/${path}`))
);
app.use('/api', route)
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

app.listen(PORT || 3000, () => {
  console.log(`Event App running on http://localhost:${PORT}/`);
});

module.exports = app;

const express = require("express");
const app = express();
require("dotenv").config();
const { readdirSync } = require("fs");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const passport = require("./src/utils/passport");
const session = require("express-session");
const sequelize = require("./src/config/dbConfig");
require("./src/model/index");
app.use(logger("dev"));
const swaggerUi = require("swagger-ui-express");
const specs = require("./swaggerConfig");
const notFound = require("./src/middlewares/not-found");

app.use(
  session({
    secret: "UuxNsLKDI693ggHJskjLtE6DE/LLnSdI6Pm3IT3Lvdc=",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
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

readdirSync("./src/routes").map((path) => {
  if (path !== "auth.js") {
    app.use("/api", require(`./src/routes/${path}`));
  }
  app.use("/auth", require(`./src/routes/${path}`));
});

app.get("/", (req, res) => {
  return req.user
    ? res.send(req.user)
    : res.send("I AM WORKING, but you are not logged in");
});

app.use(errorHandlerMiddleware);
app.use(notFound);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Event App running on http://localhost:${PORT}/`);
});

module.exports = app;

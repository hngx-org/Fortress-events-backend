const express = require("express");
const app = express();
require("dotenv").config();
const { readdirSync } = require("fs");
var passport = require('./src/utils/passport');
const session = require('express-session');

const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const notFound = require("./src/middlewares/not-found");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Configure express-session middleware
app.use(session({
  secret: 'FZdK4nKC5cutNDlCrvs/slrMMEfpn0vkC66RoBU2fyc=',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and session support
app.use(passport.initialize());
app.use(passport.session());

readdirSync("./src/routes").map((path) =>
  app.use("/api", require(`./src/routes/${path}`))
);

app.get('/login/google', passport.authenticate('google', {
  scope: [ 'email', 'profile' ]
}));


app.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  
  function(req, res) {
    res.redirect('/');
  });

  app.get('/', (req, res) => {
    res.send('Welcome to Fortress')
  });
    

app.use(errorHandlerMiddleware);
app.use(notFound);

const PORT = process.env.PORT;


app.listen(PORT || 3000, () => {
  console.log(`Event App running on http://localhost:${PORT}/`);
});

module.exports = app;

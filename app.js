const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const config = require("./src/config");
const { HttpError } = require("http-errors");
// const errorHandler = require("./src/middlewares/errorHandler");
const sequelize = require("./src/config/dbConfig");
const passport = require('passport');
const session = require('express-session')
const { User } = require("./src/model/index")
const routes = require("./src/routes/index")
const PORT = process.env.PORT;


require('./src/model/index')

require('./src/controller/authController')

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())


// app.use(HttpError);
// app.use(errorHandler);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", routes)


// db.sync({ }).then(()=>{
//     console.log(`Database is connected successfully !`);
// }).catch((error)=>{
//     console.log(`Database error at ${error}`)
// })




app.listen(PORT , () => {
    console.log(`Event App running on http://localhost:${PORT}/`)
});


module.exports = app;
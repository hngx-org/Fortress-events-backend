const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const config = require("./src/config");
const { HttpError } = require("http-errors");
const errorHandler = require("./src/middlewares/errorHandler");
const { db } = require("./src/config/dbConfig");


const app = express();

const { PORT } = config;

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(HttpError);
app.use(errorHandler);

// db.sync({ }).then(()=>{
//     console.log(`Database is connected successfully !`);
// }).catch((error)=>{
//     console.log(`Database error at ${error}`)
// })

const BUILD_PORT = PORT;


app.listen(BUILD_PORT || 3000 , () => {
    console.log(`Event App running on http://localhost:${BUILD_PORT}/`)
});


module.exports = app;